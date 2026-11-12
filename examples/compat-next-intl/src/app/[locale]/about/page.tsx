import { getLocale, getTranslations } from '@intlayer/next-intl/server';
import Link from 'next/link';
import ClientComponent from '@/components/ClientComponent';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import ServerComponent from '@/components/ServerComponent';

export default async function AboutPage() {
  const tAbout = await getTranslations('about');
  const locale = await getLocale();
  const initialFormattedCount = new Intl.NumberFormat(locale).format(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="flex w-full items-start justify-between">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Back to Home
          </Link>
          <LocaleSwitcher />
        </div>
        <div className="flex w-full flex-col items-center gap-8 text-center sm:items-start sm:text-start">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            {tAbout('title')}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {tAbout('description')}
          </p>

          <div className="mt-8 w-full border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
              Client Component Example
            </h2>
            <ClientComponent />
          </div>

          <div className="mt-8 w-full border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
              Server Component Example
            </h2>
            <ServerComponent
              formattedCount={initialFormattedCount}
              label={tAbout('counter.label')}
              increment={tAbout('counter.increment')}
            />
          </div>
        </div>
        <div className="w-full pt-8" />
      </main>
    </div>
  );
}
