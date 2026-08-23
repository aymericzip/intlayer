import { describe, expect, it } from 'vitest';
import { wrapLayoutWithProvider } from './transforms';

describe('wrapLayoutWithProvider', () => {
  it('wraps the create-next-app default layout', () => {
    const input = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "App" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

    const { code, status } = wrapLayoutWithProvider(input);

    expect(status).toBe('wrapped');
    expect(code).toContain(
      'import { IntlayerProvider, getLocale } from "next-intlayer/server"'
    );
    expect(code).toContain(
      'export { generateStaticParams } from "next-intlayer"'
    );
    expect(code).toContain('const locale = await getLocale();');
    expect(code).toContain('<IntlayerProvider locale={locale}>');
    expect(code).toContain('lang={locale}');
    expect(code).toMatch(/export default async function RootLayout/);
  });

  it('handles an arrow-const default export layout', () => {
    const input = `import type { PropsWithChildren, FC } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html>
    <body>{children}</body>
  </html>
);

export default RootLayout;`;

    const { code, status } = wrapLayoutWithProvider(input);

    expect(status).toBe('wrapped');
    expect(code).toContain('<IntlayerProvider locale={locale}>');
    expect(code).toContain('const locale = await getLocale();');
  });

  it('does not add a duplicate locale variable when the function already destructures locale from params', () => {
    const input = `export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}`;

    const { code, status } = wrapLayoutWithProvider(input);

    expect(status).toBe('wrapped');
    // locale must appear exactly once as a variable declaration
    const localeDeclarationMatches =
      code.match(/\bconst\b[^=]*\blocale\b/g) ?? [];
    expect(localeDeclarationMatches).toHaveLength(1);
  });

  it('is idempotent', () => {
    const input = `import { IntlayerProvider } from "next-intlayer/server";

export default async function RootLayout({ children }: any) {
  return <IntlayerProvider>{children}</IntlayerProvider>;
}`;

    const { status } = wrapLayoutWithProvider(input);
    expect(status).toBe('already');
  });

  it('skips client components', () => {
    const input = `"use client";

export default function RootLayout({ children }: any) {
  return <body>{children}</body>;
}`;

    const { status } = wrapLayoutWithProvider(input);
    expect(status).toBe('skipped-client');
  });

  it('skips when no children placeholder is found', () => {
    const input = `export default function RootLayout() {
  return <html><body>Hello</body></html>;
}`;

    const { status } = wrapLayoutWithProvider(input);
    expect(status).toBe('skipped');
  });
});
