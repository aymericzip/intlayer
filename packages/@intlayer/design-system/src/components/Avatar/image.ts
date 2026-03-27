enum ImageProvider {
  Picsum = 'picsum',
  Dummy = 'dummy',
}

enum ImageType {
  Avatar = 'avatar',
  Random = 'random',
}

/**
 * Generates a random image URL based on the specified provider and type.
 *
 * @param provider - The image provider to use (e.g., Unsplash, Picsum, Dummy)
 * @param type - The type of image to generate (Avatar or Random)
 * @returns A URL string pointing to a random image
 *
 * @example
 * ```ts
 * getRandomImageUrl(ImageProvider.Picsum, ImageType.Random) // 'https://picsum.photos/800/600?random=123'
 * getRandomImageUrl(ImageProvider.Dummy, ImageType.Avatar) // 'https://dummyimage.com/200x200/000/fff&text=Avatar'
 * ```
 */
export function getRandomImageUrl(
  provider: ImageProvider,
  type: ImageType
): string {
  switch (provider) {
    case ImageProvider.Picsum:
      if (type === ImageType.Avatar) {
        return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
      } else {
        return `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`;
      }

    case ImageProvider.Dummy:
      if (type === ImageType.Avatar) {
        return `https://dummyimage.com/200x200/000/fff&text=Avatar`;
      } else {
        return `https://dummyimage.com/800x600/000/fff&text=Random`;
      }

    default:
      throw new Error(`Provider not supported: ${provider}`);
  }
}

/**
 * Generates a random image URL for avatar images based on the specified provider.
 *
 * @param provider - The image provider to use (e.g., Unsplash, Picsum, Dummy)
 * @returns A URL string pointing to a random avatar image
 *
 * @example
 * ```ts
 * getAvatarImageUrl(ImageProvider.Picsum) // 'https://picsum.photos/200/200?random=123'
 * getAvatarImageUrl(ImageProvider.Dummy) // 'https://dummyimage.com/200x200/000/fff&text=Avatar'
 * ```
 */
export function getAvatarImageUrl(
  provider: ImageProvider = ImageProvider.Picsum
): string {
  return getRandomImageUrl(provider, ImageType.Avatar);
}
