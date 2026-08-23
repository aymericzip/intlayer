import type { NextPageIntlayer } from 'next-intlayer';

const TestsPage: NextPageIntlayer = () => (
  <div className="flex min-h-screen flex-col items-center justify-center p-24">
    <h1 className="font-bold text-4xl">Tests Page (Next.js 15)</h1>
    <p className="mt-4 text-xl">
      This page is reached via canonical /[locale]/tests or localized aliases.
    </p>
    <div className="mt-8 rounded border p-4">
      <h2 className="font-semibold text-2xl">Localized Content:</h2>
    </div>
  </div>
);

export default TestsPage;
