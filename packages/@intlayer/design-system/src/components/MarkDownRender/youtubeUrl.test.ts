import { describe, expect, it } from 'vitest';
import {
  getYoutubeEmbedUrl,
  getYoutubeStartTime,
  getYoutubeVideoId,
  getYoutubeWatchUrl,
} from './youtubeUrl';

describe('getYoutubeVideoId', () => {
  it.each([
    'https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&origin=https://intlayer.org',
    'https://www.youtube-nocookie.com/embed/e_PPG7PTqGU',
    'https://www.youtube.com/watch?v=e_PPG7PTqGU',
    'https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw',
    'https://www.youtube.com/shorts/e_PPG7PTqGU',
  ])('reads the id out of %s', (src) => {
    expect(getYoutubeVideoId(src)).toBe('e_PPG7PTqGU');
  });

  it.each([
    undefined,
    '',
    'https://ide.intlayer.org/aymericzip/intlayer-next-16-template?embed=1',
    'https://example.com/watch?v=e_PPG7PTqGU',
  ])('returns null for %s', (src) => {
    expect(getYoutubeVideoId(src)).toBeNull();
  });
});

describe('getYoutubeStartTime', () => {
  it.each([
    ['https://www.youtube.com/embed/7VtLdbtV1us?start=264', 264],
    [
      'https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=264&amp;rel=1',
      264,
    ],
    ['https://youtu.be/7VtLdbtV1us?t=264', 264],
    ['https://www.youtube.com/watch?v=7VtLdbtV1us&t=4m24s', 264],
    ['https://www.youtube.com/watch?v=7VtLdbtV1us&t=1h2m3s', 3723],
  ])('reads the start time out of %s', (src, expected) => {
    expect(getYoutubeStartTime(src)).toBe(expected);
  });

  it.each([
    undefined,
    'https://www.youtube.com/embed/7VtLdbtV1us',
    'https://www.youtube.com/embed/7VtLdbtV1us?start=0',
    'https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&rel=1',
  ])('returns null for %s', (src) => {
    expect(getYoutubeStartTime(src)).toBeNull();
  });
});

describe('getYoutubeEmbedUrl', () => {
  it('builds the player address without query parameters', () => {
    expect(getYoutubeEmbedUrl('e_PPG7PTqGU')).toBe(
      'https://www.youtube.com/embed/e_PPG7PTqGU'
    );
  });

  it('keeps the start time', () => {
    expect(getYoutubeEmbedUrl('e_PPG7PTqGU', 264)).toBe(
      'https://www.youtube.com/embed/e_PPG7PTqGU?start=264'
    );
  });
});

describe('getYoutubeWatchUrl', () => {
  it('builds the address of the video on youtube.com', () => {
    expect(getYoutubeWatchUrl('e_PPG7PTqGU')).toBe(
      'https://www.youtube.com/watch?v=e_PPG7PTqGU'
    );
  });

  it('keeps the start time', () => {
    expect(getYoutubeWatchUrl('e_PPG7PTqGU', 264)).toBe(
      'https://www.youtube.com/watch?v=e_PPG7PTqGU&t=264s'
    );
  });
});
