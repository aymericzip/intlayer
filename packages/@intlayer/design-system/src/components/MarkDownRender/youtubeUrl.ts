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
 * The address the YouTube player is loaded from for a given video.
 */
export const getYoutubeEmbedUrl = (videoId: string): string =>
  `https://www.youtube.com/embed/${videoId}`;

/**
 * The address of the video on youtube.com itself.
 */
export const getYoutubeWatchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;
