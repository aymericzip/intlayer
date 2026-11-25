import {
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/** Zoom / pan state of the map, in viewBox units. */
export type MapTransform = {
  scale: number;
  translateX: number;
  translateY: number;
};

const IDENTITY_TRANSFORM: MapTransform = {
  scale: 1,
  translateX: 0,
  translateY: 0,
};

/** Deepest zoom — enough to tell neighbouring cities apart. */
export const MAX_MAP_SCALE = 16;

/** Zoom factor of one +/- button press. */
const BUTTON_ZOOM_FACTOR = 1.6;

/** Pointer travel (px) after which a press becomes a drag, not a click. */
const DRAG_THRESHOLD_PX = 4;

/**
 * Keeps the scaled map covering the viewport: no zooming out past 1, and no
 * panning an edge of the map inside the frame.
 */
export const clampMapTransform = (
  transform: MapTransform,
  width: number,
  height: number
): MapTransform => {
  const scale = Math.min(MAX_MAP_SCALE, Math.max(1, transform.scale));

  return {
    scale,
    translateX: Math.min(
      0,
      Math.max(width - width * scale, transform.translateX)
    ),
    translateY: Math.min(
      0,
      Math.max(height - height * scale, transform.translateY)
    ),
  };
};

/**
 * Zooms `transform` by `factor` while keeping the viewBox point
 * (`anchorX`, `anchorY`) fixed under the cursor.
 */
export const zoomMapTransform = (
  transform: MapTransform,
  factor: number,
  anchorX: number,
  anchorY: number,
  width: number,
  height: number
): MapTransform => {
  const scale = Math.min(MAX_MAP_SCALE, Math.max(1, transform.scale * factor));
  const appliedFactor = scale / transform.scale;

  return clampMapTransform(
    {
      scale,
      translateX: anchorX - (anchorX - transform.translateX) * appliedFactor,
      translateY: anchorY - (anchorY - transform.translateY) * appliedFactor,
    },
    width,
    height
  );
};

type DragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startTransform: MapTransform;
  isDragging: boolean;
};

/**
 * Wheel / drag / button zoom for an SVG map with a `width` × `height` viewBox.
 * Disabled hooks keep the identity transform and attach no listeners; the
 * live map is its own instance, so leaving the live view drops the zoom.
 *
 * @param svgRef - The map `<svg>`; wheel zoom needs a non-passive listener.
 * @param width - ViewBox width.
 * @param height - ViewBox height.
 * @param isEnabled - Whether zooming is allowed (the live view only).
 */
export const useMapZoom = (
  svgRef: RefObject<SVGSVGElement | null>,
  width: number,
  height: number,
  isEnabled: boolean
) => {
  const [transform, setTransform] = useState<MapTransform>(IDENTITY_TRANSFORM);
  const dragStateRef = useRef<DragState | null>(null);
  // Set once a press turned into a drag, so the following click is ignored.
  const hasDraggedRef = useRef(false);

  /** Converts client coordinates to viewBox coordinates. */
  const toViewBoxPoint = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      const rect = svgRef.current?.getBoundingClientRect();

      if (!rect || rect.width === 0 || rect.height === 0) {
        return [width / 2, height / 2];
      }

      return [
        ((clientX - rect.left) / rect.width) * width,
        ((clientY - rect.top) / rect.height) * height,
      ];
    },
    [svgRef, width, height]
  );

  // React registers `onWheel` as passive, so the page would scroll too.
  useEffect(() => {
    const svgElement = svgRef.current;

    if (!isEnabled || !svgElement) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const [anchorX, anchorY] = toViewBoxPoint(event.clientX, event.clientY);
      // Trackpad pinches arrive as small ctrl+wheel deltas; scale accordingly.
      const factor = Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.002));

      setTransform((current) =>
        zoomMapTransform(current, factor, anchorX, anchorY, width, height)
      );
    };

    svgElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => svgElement.removeEventListener('wheel', handleWheel);
  }, [isEnabled, svgRef, toViewBoxPoint, width, height]);

  const zoomBy = (factor: number) =>
    setTransform((current) =>
      zoomMapTransform(current, factor, width / 2, height / 2, width, height)
    );

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (!isEnabled || event.button !== 0) return;

    hasDraggedRef.current = false;
    dragStateRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startTransform: transform,
      isDragging: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const dragState = dragStateRef.current;
    const rect = svgRef.current?.getBoundingClientRect();

    if (!dragState || dragState.pointerId !== event.pointerId || !rect) return;

    const deltaX = event.clientX - dragState.startClientX;
    const deltaY = event.clientY - dragState.startClientY;

    if (!dragState.isDragging) {
      if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return;

      // Capture only once it is a drag: capturing on press would retarget the
      // click of a plain tap on a dot to the <svg>.
      dragState.isDragging = true;
      hasDraggedRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    setTransform(
      clampMapTransform(
        {
          scale: dragState.startTransform.scale,
          translateX:
            dragState.startTransform.translateX + deltaX * (width / rect.width),
          translateY:
            dragState.startTransform.translateY +
            deltaY * (height / rect.height),
        },
        width,
        height
      )
    );
  };

  const handlePointerUp = (event: PointerEvent<SVGSVGElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) return;

    dragStateRef.current = null;
  };

  return {
    transform,
    isZoomed: transform.scale > 1,
    /** True right after a drag, so a click handler can ignore that release. */
    wasDragged: () => hasDraggedRef.current,
    zoomIn: () => zoomBy(BUTTON_ZOOM_FACTOR),
    zoomOut: () => zoomBy(1 / BUTTON_ZOOM_FACTOR),
    resetZoom: () => setTransform(IDENTITY_TRANSFORM),
    pointerHandlers: isEnabled
      ? {
          onPointerDown: handlePointerDown,
          onPointerMove: handlePointerMove,
          onPointerUp: handlePointerUp,
          onPointerCancel: handlePointerUp,
        }
      : {},
  };
};
