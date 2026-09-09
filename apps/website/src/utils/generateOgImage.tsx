import { ImageResponse } from '@vercel/og';
import {
  FONT_GEIST_BOLD_BASE64,
  FONT_GEIST_REGULAR_BASE64,
  THUMBNAIL_JPEG_BASE64,
} from './ogAssets';

export const DEFAULT_OG_TITLE =
  'Per-component i18n for React, Next.js, Vue, Svelte | Intlayer';

export const DEFAULT_OG_DESCRIPTION = '';

let cachedFonts:
  | [
      { name: string; data: ArrayBuffer; weight: 400; style: 'normal' },
      { name: string; data: ArrayBuffer; weight: 800; style: 'normal' },
    ]
  | null = null;

let cachedBackgroundSrc: string | null = null;

const toArrayBuffer = (base64: string): ArrayBuffer => {
  const buf = Buffer.from(base64, 'base64');
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
};

const getFonts = () => {
  if (!cachedFonts) {
    cachedFonts = [
      {
        name: 'Geist',
        data: toArrayBuffer(FONT_GEIST_REGULAR_BASE64),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Geist',
        data: toArrayBuffer(FONT_GEIST_BOLD_BASE64),
        weight: 800,
        style: 'normal',
      },
    ];
  }
  return cachedFonts;
};

const getBackgroundSrc = () => {
  if (!cachedBackgroundSrc) {
    cachedBackgroundSrc = `data:image/jpeg;base64,${THUMBNAIL_JPEG_BASE64}`;
  }
  return cachedBackgroundSrc;
};

export type GenerateOgImageOptions = {
  title?: string;
  description?: string;
};

export const generateOgImage = ({
  title = DEFAULT_OG_TITLE,
  description = DEFAULT_OG_DESCRIPTION,
}: GenerateOgImageOptions = {}): ImageResponse => {
  const fonts = getFonts();
  const bgSrc = getBackgroundSrc();

  // Strip trailing " | Intlayer" or " - Intlayer" since Intlayer logo & brand
  // are already part of the thumbnail.jpeg background
  const cleanTitle = title.replace(/\s*[|–-]\s*Intlayer\s*$/i, '').trim();

  // Dynamic font sizing based on clean title length. The text column is 560px
  // wide and has ~400px of height before the Intlayer logo baked into the
  // background, so longer titles step down to keep from colliding with it.
  let titleFontSize = 64;
  if (cleanTitle.length > 105) {
    titleFontSize = 40;
  } else if (cleanTitle.length > 65) {
    titleFontSize = 46;
  } else if (cleanTitle.length > 38) {
    titleFontSize = 56;
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative',
        fontFamily: 'Geist',
      }}
    >
      {/* Fixed background from apps/website/public/thumbnail.jpeg */}
      <img
        src={bgSrc}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Content area: Title and optional subtitle above the Intlayer logo */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '90px',
          width: '560px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: `${titleFontSize}px`,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            color: '#09090b',
          }}
        >
          {cleanTitle}
        </span>
        {description ? (
          <span
            style={{
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#71717a',
            }}
          >
            {description}
          </span>
        ) : null}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
};
