/**
 * Astro-compatible shims for Next.js types.
 * These are used only for type-checking; the actual metadata is handled by Astro.
 */

export type Metadata = Record<string, unknown>;

export type Viewport = {
  themeColor?: Array<{ color: string; media?: string }> | string;
  width?: string | number;
  height?: string | number;
  initialScale?: number;
  minimumScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
  viewportFit?: string;
  colorScheme?: string;
  [key: string]: unknown;
};

export namespace MetadataRoute {
  export type Manifest = {
    name?: string;
    short_name?: string;
    description?: string;
    start_url?: string;
    scope?: string;
    display?: string;
    orientation?: string;
    theme_color?: string;
    background_color?: string;
    icons?: Array<{
      src: string;
      sizes?: string;
      type?: string;
      purpose?: string;
    }>;
    [key: string]: unknown;
  };

  export type Robots = {
    rules?: Record<string, unknown>;
    sitemap?: string | string[];
    host?: string;
    [key: string]: unknown;
  };

  export type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: string;
    priority?: number;
    alternates?: { languages?: Record<string, string> };
  }>;
}
