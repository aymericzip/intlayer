import { describe, expect, it } from 'vitest';
import {
  getYoutubeEmbedUrl,
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

describe('getYoutubeEmbedUrl', () => {
  it('builds the player address without query parameters', () => {
    expect(getYoutubeEmbedUrl('e_PPG7PTqGU')).toBe(
      'https://www.youtube.com/embed/e_PPG7PTqGU'
    );
  });
});

describe('getYoutubeWatchUrl', () => {
  it('builds the address of the video on youtube.com', () => {
    expect(getYoutubeWatchUrl('e_PPG7PTqGU')).toBe(
      'https://www.youtube.com/watch?v=e_PPG7PTqGU'
    );
  });
});
