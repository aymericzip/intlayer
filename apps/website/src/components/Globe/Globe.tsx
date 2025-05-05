'use client';

import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import { type FC, memo, type RefObject, useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

export const Globe: FC = memo(() => {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting: RefObject<number | null> = useRef<number>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const [{ r }, api] = useSpring(() => ({
    r: 10,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const isDarkMode = resolvedTheme === 'dark';

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize, { passive: true });
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 3,
      height: width * 3,
      scale: 1.1,
      phi: 0,
      theta: 0.3,
      dark: isDarkMode ? 1 : 0,
      diffuse: 2,
      mapSamples: 4000,
      mapBrightness: 1.5,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: isDarkMode ? [1, 1, 1] : [0.3, 0.3, 0.3],
      markers: [],
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.003;
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => {
      if (canvasRef.current?.style.opacity) {
        canvasRef.current.style.opacity = '1';
      }
    });
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [isDarkMode, r]);

  return (
    <div className="aspect-1 relative m-auto w-full max-w-xl">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;

          if (!canvasRef.current) return;
          canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;

          if (!canvasRef.current) return;
          canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;

          if (!canvasRef.current) return;
          canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
        className="size-full transition-opacity duration-1000 ease-in-out"
        style={{
          contain: 'layout paint size',
          opacity: 0,
        }}
      />
    </div>
  );
});

Globe.displayName = 'Globe';
