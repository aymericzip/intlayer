import { describe, expect, it } from 'vitest';
import { wrapLayoutWithProvider, wrapPageWithProvider } from './transforms';

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
      'import { IntlayerClientProvider } from "next-intlayer"'
    );
    expect(code).toContain('import { getLocale } from "next-intlayer/server"');
    expect(code).toContain(
      'export { generateStaticParams } from "next-intlayer"'
    );
    expect(code).toContain('const locale = await getLocale();');
    expect(code).toContain('<IntlayerClientProvider locale={locale}>');
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
    expect(code).toContain('<IntlayerClientProvider locale={locale}>');
    expect(code).toContain('const locale = await getLocale();');
  });

  it('is idempotent', () => {
    const input = `import { IntlayerClientProvider } from "next-intlayer";

export default async function RootLayout({ children }: any) {
  return <IntlayerClientProvider>{children}</IntlayerClientProvider>;
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

describe('wrapPageWithProvider', () => {
  it('wraps a default page export and derives locale', () => {
    const input = `export default function Page() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}`;

    const { code, status } = wrapPageWithProvider(input);

    expect(status).toBe('wrapped');
    expect(code).toContain(
      'import { IntlayerServerProvider, getLocale } from "next-intlayer/server"'
    );
    expect(code).toContain('const locale = await getLocale();');
    expect(code).toContain('<IntlayerServerProvider locale={locale}>');
    expect(code).toMatch(/export default async function Page/);
  });

  it('wraps an arrow page with expression body', () => {
    const input = `const Page = () => <main>Hi</main>;
export default Page;`;

    const { code, status } = wrapPageWithProvider(input);

    expect(status).toBe('wrapped');
    expect(code).toContain('<IntlayerServerProvider locale={locale}>');
  });

  it('skips client pages', () => {
    const input = `"use client";
export default function Page() {
  return <main>Hi</main>;
}`;

    const { status } = wrapPageWithProvider(input);
    expect(status).toBe('skipped-client');
  });

  it('skips pages with multiple top-level JSX returns', () => {
    const input = `export default function Page({ ok }: { ok: boolean }) {
  if (ok) return <main>Yes</main>;
  return <main>No</main>;
}`;

    const { status } = wrapPageWithProvider(input);
    expect(status).toBe('skipped');
  });

  it('is idempotent', () => {
    const input = `import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
export default async function Page() {
  const locale = await getLocale();
  return <IntlayerServerProvider locale={locale}><main>Hi</main></IntlayerServerProvider>;
}`;

    const { status } = wrapPageWithProvider(input);
    expect(status).toBe('already');
  });
});
