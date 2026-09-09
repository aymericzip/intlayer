import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ImageResponse } from '@vercel/og';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const getFontPaths = () => {
  const possibleRoots = [
    resolve(__dirname, '../../node_modules/@fontsource/geist-sans'),
    resolve(__dirname, '../../../../node_modules/@fontsource/geist-sans'),
    resolve(process.cwd(), 'node_modules/@fontsource/geist-sans'),
    resolve(process.cwd(), '../../node_modules/@fontsource/geist-sans'),
  ];

  for (const root of possibleRoots) {
    if (existsSync(resolve(root, 'files/geist-sans-latin-400-normal.woff'))) {
      return {
        regular: resolve(root, 'files/geist-sans-latin-400-normal.woff'),
        bold: resolve(root, 'files/geist-sans-latin-800-normal.woff'),
      };
    }
  }

  throw new Error('Could not locate @fontsource/geist-sans font files');
};

const getBackgroundPath = () => {
  const possiblePaths = [
    resolve(__dirname, '../../public/thumbnail.jpeg'),
    resolve(process.cwd(), 'public/thumbnail.jpeg'),
    resolve(process.cwd(), 'apps/website/public/thumbnail.jpeg'),
  ];

  for (const path of possiblePaths) {
    if (existsSync(path)) {
      return path;
    }
  }

  throw new Error('Could not locate public/thumbnail.jpeg background asset');
};

const getFonts = () => {
  if (!cachedFonts) {
    const { regular, bold } = getFontPaths();
    cachedFonts = [
      {
        name: 'Geist',
        data: readFileSync(regular).buffer,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Geist',
        data: readFileSync(bold).buffer,
        weight: 800,
        style: 'normal',
      },
    ];
  }
  return cachedFonts;
};

const getBackgroundSrc = () => {
  if (!cachedBackgroundSrc) {
    const bgPath = getBackgroundPath();
    const bgBase64 = readFileSync(bgPath).toString('base64');
    cachedBackgroundSrc = `data:image/jpeg;base64,${bgBase64}`;
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
