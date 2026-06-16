import { createImageUpload, type UploadFn } from './novel';

/**
 * Uploads an image file and resolves to the URL that should be embedded in the
 * document. Provided by the consumer (e.g. wired to the asset backend).
 */
export type UploadImageFn = (file: File) => Promise<string>;

/**
 * Reads a file as a base64 data URL. Used as the default, backend-less image
 * handler so the editor works out of the box.
 */
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('Read failed'));
    reader.readAsDataURL(file);
  });

/**
 * Preloads an image URL so the swap from placeholder to final image is seamless.
 */
const preloadImage = (url: string): Promise<string> =>
  new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(url);
    image.onerror = () => resolve(url);
  });

export type CreateEditorUploadFnOptions = {
  /**
   * Custom uploader. When omitted, images are embedded inline as base64 data
   * URLs (no backend required).
   */
  uploadImage?: UploadImageFn;
  /** Called when validation fails (wrong type / too large). */
  onError?: (error: Error) => void;
  /** Maximum allowed file size in megabytes. Defaults to `20`. */
  maxSizeMb?: number;
};

/**
 * Builds the Novel `UploadFn` used by the editor's paste / drop handlers and the
 * "Image" slash command. Falls back to inline base64 embedding when no custom
 * uploader is provided.
 */
export const createEditorUploadFn = ({
  uploadImage,
  onError,
  maxSizeMb = 20,
}: CreateEditorUploadFnOptions = {}): UploadFn =>
  createImageUpload({
    onUpload: async (file) => {
      const url = uploadImage
        ? await uploadImage(file)
        : await fileToBase64(file);

      return preloadImage(url);
    },
    validateFn: (file) => {
      if (!file.type.includes('image/')) {
        onError?.(new Error('File type not supported.'));
        return false;
      }

      if (file.size / 1024 / 1024 > maxSizeMb) {
        onError?.(new Error(`File size too big (max ${maxSizeMb}MB).`));
        return false;
      }

      return true;
    },
  });
