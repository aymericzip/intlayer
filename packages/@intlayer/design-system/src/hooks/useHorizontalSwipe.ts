'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type PointerEventHandler,
  type RefObject,
} from 'react';

export type HorizontalSwipeConfig = {
  onSwipeLeft?: () => void; // move to next item
  onSwipeRight?: () => void; // move to previous item
  enable?: boolean;
  itemIndex: number;
  itemCount: number;
  thresholdPct?: number; // percentage of width required to trigger
  touchAction?: string; // CSS touch-action for the container, defaults to 'pan-y'
  disableWhenSelectingText?: boolean; // if true, do not swipe while text selection is active
};

export type HorizontalSwipeHook = {
  containerRef: RefObject<HTMLDivElement>;
  isDragging: boolean;
  dragDeltaPct: number;
  containerProps: {
    ref: RefObject<HTMLDivElement>;
    onPointerDown: PointerEventHandler<HTMLDivElement>;
    onPointerMove: PointerEventHandler<HTMLDivElement>;
    onPointerUp: PointerEventHandler<HTMLDivElement>;
    onPointerCancel: PointerEventHandler<HTMLDivElement>;
    style: CSSProperties;
  };
};

export const useHorizontalSwipe = (
  config: HorizontalSwipeConfig
): HorizontalSwipeHook => {
  const {
    enable = true,
    onSwipeLeft,
    onSwipeRight,
    itemIndex,
    itemCount,
    thresholdPct = 20,
    touchAction = 'pan-y',
    disableWhenSelectingText = true,
  } = config;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaPct, setDragDeltaPct] = useState(0);
  const pointerStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    lastX: number;
    axisLocked: boolean;
    isHorizontal: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    axisLocked: false,
    isHorizontal: false,
  });

  const isTextSelectingRef = useRef<boolean>(false);

  const getContainerWidth = () => {
    const node = containerRef.current;
    return node ? node.clientWidth : 0;
  };

  const applyEdgeResistance = (pct: number) => {
    const atFirst = itemIndex <= 0;
    const atLast = itemIndex >= itemCount - 1;

    if ((atFirst && pct > 0) || (atLast && pct < 0)) {
      const magnitude = Math.abs(pct);
      const resistance = 1 + magnitude / 30;
      return pct / resistance;
    }

    return pct;
  };

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!enable) return;
    if (pointerStateRef.current.pointerId !== null) return;
    pointerStateRef.current.pointerId = e.pointerId;
    pointerStateRef.current.startX = e.clientX;
    pointerStateRef.current.startY = e.clientY;
    pointerStateRef.current.lastX = e.clientX;
    pointerStateRef.current.axisLocked = false;
    pointerStateRef.current.isHorizontal = false;
    isTextSelectingRef.current = false;
    setIsDragging(false);
    setDragDeltaPct(0);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!enable) return;
    if (pointerStateRef.current.pointerId !== e.pointerId) return;

    const width = getContainerWidth();
    if (!width) return;

    const dx = e.clientX - pointerStateRef.current.startX;
    const dy = e.clientY - pointerStateRef.current.startY;

    // If user is selecting text, do not engage swipe
    if (disableWhenSelectingText) {
      const sel =
        typeof window !== 'undefined' ? window.getSelection?.() : null;
      const isSelecting = !!sel && sel.rangeCount > 0 && !sel.isCollapsed;
      if (isSelecting) {
        isTextSelectingRef.current = true;
        return;
      }
    }

    if (!pointerStateRef.current.axisLocked) {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (absDx > 6 || absDy > 6) {
        pointerStateRef.current.axisLocked = true;
        pointerStateRef.current.isHorizontal = absDx > absDy;
      }
    }

    if (!pointerStateRef.current.isHorizontal) {
      return;
    }

    // Defer pointer capture until a horizontal gesture is confirmed
    try {
      (
        e.currentTarget as Element & { setPointerCapture: (id: number) => void }
      ).setPointerCapture(e.pointerId);
    } catch {}

    e.preventDefault();

    if (!isDragging) setIsDragging(true);

    const pct = (dx / width) * 100;
    setDragDeltaPct(applyEdgeResistance(pct));
    pointerStateRef.current.lastX = e.clientX;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    try {
      (
        e.currentTarget as Element & {
          releasePointerCapture: (id: number) => void;
        }
      ).releasePointerCapture(e.pointerId);
    } catch {}

    const wasHorizontal = pointerStateRef.current.isHorizontal;
    const delta = dragDeltaPct;

    setIsDragging(false);
    setDragDeltaPct(0);
    pointerStateRef.current.pointerId = null;
    pointerStateRef.current.axisLocked = false;
    pointerStateRef.current.isHorizontal = false;

    if (isTextSelectingRef.current) {
      isTextSelectingRef.current = false;
      return;
    }

    if (!wasHorizontal) return;

    if (delta > thresholdPct) {
      onSwipeRight?.();
    } else if (delta < -thresholdPct) {
      onSwipeLeft?.();
    }
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!enable) return;
    if (pointerStateRef.current.pointerId !== e.pointerId) return;
    endDrag(e);
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!enable) return;
    if (pointerStateRef.current.pointerId !== e.pointerId) return;
    endDrag(e);
  };

  useEffect(() => {
    setDragDeltaPct(0);
    setIsDragging(false);
  }, [itemIndex]);

  const style: CSSProperties = { touchAction };

  return {
    containerRef: containerRef as RefObject<HTMLDivElement>,
    isDragging,
    dragDeltaPct,
    containerProps: {
      ref: containerRef as RefObject<HTMLDivElement>,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      style,
    },
  };
};
