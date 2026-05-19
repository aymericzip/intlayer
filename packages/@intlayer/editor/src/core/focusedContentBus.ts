import type { FileContent } from './EditorStateManager';

const BUS_KEY = '__intlayer_focused_content_bus__';
const BUS_EVENTS_KEY = '__intlayer_focused_content_bus_events__';

type WindowWithBus = typeof window & {
  [BUS_KEY]?: FileContent | null;
  [BUS_EVENTS_KEY]?: EventTarget;
  __intlayer_focused_content_bus_set__?: boolean;
};

type BusEvent = { content: FileContent | null; sourceId?: string };

const getBusTarget = (): EventTarget => {
  if (typeof window === 'undefined') return new EventTarget();
  const w = window as WindowWithBus;
  if (!w[BUS_EVENTS_KEY]) w[BUS_EVENTS_KEY] = new EventTarget();
  return w[BUS_EVENTS_KEY]!;
};

export const getGlobalFocusedContent = (): FileContent | null | undefined => {
  if (typeof window === 'undefined') return undefined;
  const w = window as WindowWithBus;
  if (!w.__intlayer_focused_content_bus_set__) return undefined;
  return w[BUS_KEY] ?? null;
};

export const setGlobalFocusedContent = (
  content: FileContent | null,
  sourceId?: string
): void => {
  if (typeof window !== 'undefined') {
    const w = window as WindowWithBus;
    w[BUS_KEY] = content;
    w.__intlayer_focused_content_bus_set__ = true;
  }
  getBusTarget().dispatchEvent(
    new CustomEvent<BusEvent>('change', { detail: { content, sourceId } })
  );
};

export const subscribeToGlobalFocusedContent = (
  cb: (content: FileContent | null, sourceId?: string) => void
): (() => void) => {
  const handler = (e: Event) => {
    const { content, sourceId } = (e as CustomEvent<BusEvent>).detail;
    cb(content, sourceId);
  };
  const target = getBusTarget();
  target.addEventListener('change', handler);
  return () => target.removeEventListener('change', handler);
};
