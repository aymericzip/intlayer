/**
 * Reads the video id out of a YouTube address (embed, watch, youtu.be, shorts, etc.).
 *
 * @returns The video id, or `null` when the address is not a YouTube URL.
 */
export const getYoutubeVideoId = (src: string | undefined): string | null => {
  if (!src) return null;

  const match = src.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/i
  );

  return match?.[1] ?? null;
};

/**
 * Converts a YouTube time value (`90`, `90s`, `1m30s`, `1h2m3s`) to seconds.
 *
 * @returns The number of seconds, or `null` when the value is not a time.
 */
const parseYoutubeTime = (timeValue: string): number | null => {
  if (/^\d+$/.test(timeValue)) return Number(timeValue);

  const match = timeValue.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return null;

  const [, hours = '0', minutes = '0', seconds = '0'] = match;

  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
};

/**
 * Reads the start time out of a YouTube address (`start=` or `t=` parameter).
 *
 * It is the one query parameter kept when an address is normalized, so docs
 * can link a video at a given chapter.
 *
 * @returns The start time in seconds, or `null` when none is set.
 */
export const getYoutubeStartTime = (src: string | undefined): number | null => {
  if (!src) return null;

  const match = src.match(/[?&](?:amp;)?(?:start|t)=([\dhms]+)/i);
  if (!match) return null;

  const startTime = parseYoutubeTime(match[1]);

  return startTime && startTime > 0 ? startTime : null;
};

/**
 * The address the YouTube player is loaded from for a given video.
 */
export const getYoutubeEmbedUrl = (
  videoId: string,
  startTime?: number | null
): string =>
  `https://www.youtube.com/embed/${videoId}${startTime ? `?start=${startTime}` : ''}`;

/**
 * The address of the video on youtube.com itself.
 */
export const getYoutubeWatchUrl = (
  videoId: string,
  startTime?: number | null
): string =>
  `https://www.youtube.com/watch?v=${videoId}${startTime ? `&t=${startTime}s` : ''}`;
