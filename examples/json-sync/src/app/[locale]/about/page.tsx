import Link from 'next/link';
import { getFormatter, getTranslations } from 'next-intl/server';
import ClientComponent from '@/components/ClientComponent';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import ServerComponent from '@/components/ServerComponent';

export default async function AboutPage() {
  // Strictly server-side translations/formatting
  // These run on the server and can be passed as props to components
  const tAbout = await getTranslations('about');
  const tCounter = await getTranslations('about.counter');
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

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
        <div className="flex w-full flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <h1 className="font-bold text-4xl text-black dark:text-zinc-50">
            {tAbout('title')}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {tAbout('description')}
          </p>

          <div className="mt-8 w-full border-zinc-200 border-t pt-8 dark:border-zinc-800">
            <h2 className="mb-6 font-semibold text-2xl text-black dark:text-zinc-50">
              Client Component Example
            </h2>
            <ClientComponent />
          </div>

          <div className="mt-8 w-full border-zinc-200 border-t pt-8 dark:border-zinc-800">
            <h2 className="mb-6 font-semibold text-2xl text-black dark:text-zinc-50">
              Server Component Example
            </h2>
            <ServerComponent
              formattedCount={initialFormattedCount}
              label={tCounter('label')}
              increment={tCounter('increment')}
            />
          </div>
        </div>
        <div className="w-full pt-8" />
      </main>
    </div>
  );
}
