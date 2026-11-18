import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import { ANIMATION_SETTINGS } from '../data/storeConfig';

/**
 * Generates deterministic non-synchronized float timing for each element
 * so floating bags, cards, and icons never bob in unison.
 */
export function getFloatStyle(index: number, speedMultiplier = 1): CSSProperties {
  const durations = [5.4, 6.2, 7.1, 8.0, 5.8, 6.7, 7.6, 8.5, 5.9, 7.3];
  const delays = [-0.6, -2.1, -3.8, -1.4, -4.9, -2.7, -5.5, -0.9, -3.2, -4.4];

  const baseScale = ANIMATION_SETTINGS.floatSpeedSec / 6.8;
  const duration = Number(
    (durations[index % durations.length] * baseScale * speedMultiplier).toFixed(2)
  );
  const delay = delays[index % delays.length];

  return {
    '--ag-duration': `${duration}s`,
    '--ag-delay': `${delay}s`,
    '--ag-float-y': `${ANIMATION_SETTINGS.floatDistancePx}px`,
  } as CSSProperties;
}

/**
 * Global runtime for Anti-Gravity performance & scroll parallax:
 * - Syncs ANIMATION_SETTINGS CSS vars
 * - Pauses animations when browser tab is hidden
 * - Pauses off-screen [data-ag-observe] animations via IntersectionObserver
 * - Runs subtle scroll parallax on [data-parallax-depth] elements via rAF
 * - Disables everything cleanly under prefers-reduced-motion: reduce
 */
export function useGlobalAntiGravityRuntime(): void {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--ag-float-distance', `${ANIMATION_SETTINGS.floatDistancePx}px`);
    root.style.setProperty('--ag-tilt-max', `${ANIMATION_SETTINGS.tiltMaxDeg}deg`);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleVisibility = () => {
      root.dataset.agPaused = document.hidden ? 'true' : 'false';
    };
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);

    // IntersectionObserver to pause float animations when elements leave viewport
    const observedElements = Array.from(document.querySelectorAll<HTMLElement>('[data-ag-observe]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          target.dataset.agOffscreen = entry.isIntersecting ? 'false' : 'true';
        }
      },
      { rootMargin: '80px 0px' }
    );
    observedElements.forEach((el) => observer.observe(el));

    // Scroll parallax via rAF (transform only, disabled under reduced motion)
    let rafId = 0;
    let ticking = false;

    const updateParallax = () => {
      ticking = false;
      if (motionQuery.matches || document.hidden) return;

      const viewportH = window.innerHeight || 900;
      const parallaxNodes = document.querySelectorAll<HTMLElement>('[data-parallax-depth]');
      parallaxNodes.forEach((node) => {
        if (node.dataset.agOffscreen === 'true') return;
        const depth = Number(node.dataset.parallaxDepth || 0);
        if (!depth) return;
        const rect = node.getBoundingClientRect();
        const centerOffset = rect.top + rect.height * 0.5 - viewportH * 0.5;
        const translateY = Math.max(-28, Math.min(28, -centerOffset * depth));
        node.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (motionQuery.matches) return;
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    if (!motionQuery.matches) {
      updateParallax();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const onMotionChange = () => {
      if (motionQuery.matches) {
        document.querySelectorAll<HTMLElement>('[data-parallax-depth]').forEach((node) => {
          node.style.transform = '';
        });
      }
    };
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('scroll', onScroll);
      motionQuery.removeEventListener('change', onMotionChange);
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);
}

/**
 * Desktop-only (fine pointer + hover) 3D perspective tilt + inner image parallax + hover sheen.
 * Mutates CSS custom properties directly inside rAF to keep React renders at zero.
 */
export function useCardTilt(maxDeg: number = ANIMATION_SETTINGS.tiltMaxDeg) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const el = surfaceRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(() => {
        const tiltY = nx * maxDeg * 2;
        const tiltX = -ny * maxDeg * 2;
        const innerX = -nx * 10;
        const innerY = -ny * 10;
        const sheenX = nx * 90;

        el.dataset.tilting = 'true';
        el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        el.style.setProperty('--tilt-lift', '-6px');
        el.style.setProperty('--inner-x', `${innerX.toFixed(2)}px`);
        el.style.setProperty('--inner-y', `${innerY.toFixed(2)}px`);
        el.style.setProperty('--sheen-x', `${sheenX.toFixed(1)}%`);
        el.style.setProperty('--sheen-opacity', '1');
      });
    },
    [maxDeg]
  );

  const onPointerLeave = useCallback(() => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    const el = surfaceRef.current;
    if (!el) return;

    el.dataset.tilting = 'false';
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--tilt-lift', '0px');
    el.style.setProperty('--inner-x', '0px');
    el.style.setProperty('--inner-y', '0px');
    el.style.setProperty('--sheen-x', '-120%');
    el.style.setProperty('--sheen-opacity', '0');
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { surfaceRef, onPointerMove, onPointerLeave };
}
