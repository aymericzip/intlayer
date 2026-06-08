import type { DictionaryContent } from './EditorStateManager';

const BUS_KEY = '__intlayer_edited_content_bus__';
const BUS_EVENTS_KEY = '__intlayer_edited_content_bus_events__';

type WindowWithBus = typeof window & {
  [BUS_KEY]?: DictionaryContent;
  [BUS_EVENTS_KEY]?: EventTarget;
};

type BusEvent = { content: DictionaryContent; sourceId?: string };

const getBusTarget = (): EventTarget => {
  if (typeof window === 'undefined') return new EventTarget();
  const w = window as WindowWithBus;
  if (!w[BUS_EVENTS_KEY]) w[BUS_EVENTS_KEY] = new EventTarget();
  return w[BUS_EVENTS_KEY]!;
};

export const getGlobalEditedContent = (): DictionaryContent => {
  if (typeof window === 'undefined') return {};
  return (window as WindowWithBus)[BUS_KEY] ?? {};
};

export const setGlobalEditedContent = (
  content: DictionaryContent,
  sourceId?: string
): void => {
  if (typeof window !== 'undefined') {
    (window as WindowWithBus)[BUS_KEY] = content;
  }
  getBusTarget().dispatchEvent(
    new CustomEvent<BusEvent>('change', { detail: { content, sourceId } })
  );
};

export const subscribeToGlobalEditedContent = (
  cb: (content: DictionaryContent, sourceId?: string) => void
): (() => void) => {
  const handler = (e: Event) => {
    const { content, sourceId } = (e as CustomEvent<BusEvent>).detail;
    cb(content, sourceId);
  };
  const target = getBusTarget();
  target.addEventListener('change', handler);
  return () => target.removeEventListener('change', handler);
};
