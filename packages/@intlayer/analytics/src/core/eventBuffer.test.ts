import { describe, expect, it } from 'vitest';
import { createEventBuffer } from './eventBuffer';
import type { ContentExposureEvent, PageViewEvent } from './types';

const exposure = (
  overrides: Partial<ContentExposureEvent> = {}
): ContentExposureEvent => ({
  type: 'content_exposure',
  t: 1,
  url: '/home',
  locale: 'en',
  dictionaryKey: 'hero',
  keyPath: 'title',
  ...overrides,
});

const pageView = (): PageViewEvent => ({
  type: 'page_view',
  t: 1,
  url: '/home',
  locale: 'en',
});

describe('createEventBuffer', () => {
  it('coalesces identical content exposures into one event with a count', () => {
    const buffer = createEventBuffer({ max: 100 });
    buffer.push(exposure());
    buffer.push(exposure());
    buffer.push(exposure());

    const drained = buffer.drain();
    expect(drained).toHaveLength(1);
    expect((drained[0] as ContentExposureEvent).count).toBe(3);
  });

  it('keeps exposures with different locales/variants separate', () => {
    const buffer = createEventBuffer({ max: 100 });
    buffer.push(exposure({ locale: 'en' }));
    buffer.push(exposure({ locale: 'fr' }));
    buffer.push(exposure({ variant: 'b' }));

    expect(buffer.drain()).toHaveLength(3);
  });

  it('appends discrete events (page views) verbatim', () => {
    const buffer = createEventBuffer({ max: 100 });
    buffer.push(pageView());
    buffer.push(pageView());

    expect(buffer.drain()).toHaveLength(2);
  });

  it('empties on drain', () => {
    const buffer = createEventBuffer({ max: 100 });
    buffer.push(pageView());
    buffer.drain();
    expect(buffer.size()).toBe(0);
    expect(buffer.drain()).toHaveLength(0);
  });

  it('keeps exposures on different pages separate', () => {
    const buffer = createEventBuffer({ max: 100 });
    buffer.push(exposure({ url: '/home' }));
    buffer.push(exposure({ url: '/pricing' }));

    expect(buffer.drain()).toHaveLength(2);
  });

  it('drops oldest discrete events beyond the cap', () => {
    const buffer = createEventBuffer({ max: 3 });
    for (let index = 0; index < 10; index++) buffer.push(pageView());
    expect(buffer.size()).toBeLessThanOrEqual(3);
  });

  it('evicts oldest exposures before discrete events when over the cap', () => {
    const buffer = createEventBuffer({ max: 3 });
    buffer.push(exposure({ keyPath: 'first' }));
    buffer.push(exposure({ keyPath: 'second' }));
    buffer.push(pageView());
    buffer.push(pageView());

    expect(buffer.size()).toBe(3);
    const drained = buffer.drain();
    const exposures = drained.filter(
      (event) => event.type === 'content_exposure'
    ) as ContentExposureEvent[];
    const pageViews = drained.filter((event) => event.type === 'page_view');

    // The oldest exposure ('first') was evicted; both page views survived.
    expect(pageViews).toHaveLength(2);
    expect(exposures).toHaveLength(1);
    expect(exposures[0].keyPath).toBe('second');
  });
});
