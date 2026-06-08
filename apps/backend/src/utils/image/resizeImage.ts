import sharp from 'sharp';

export type ResizeImageOptions = {
  /** Max width in pixels */
  width: number;
  /** Max height in pixels */
  height: number;
  /** JPEG quality 1–100 (default: 80) */
  quality?: number;
};

/**
 * Resize and re-encode any supported image (JPEG, PNG, WebP, GIF) to JPEG.
 * Maintains aspect ratio (never upscales). Returns the compressed buffer.
 */
export const resizeImage = async (
  input: Buffer,
  { width, height, quality = 80 }: ResizeImageOptions
): Promise<{ buffer: Buffer; contentType: 'image/jpeg' }> => {
  const buffer = await sharp(input)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  return { buffer, contentType: 'image/jpeg' };
};
