import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Link } from '@/i18n';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="flex w-full items-start justify-between">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <LocaleSwitcher />
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            {t('welcome')}
          </h1>
          <p className="max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400">
            {t('greeting')}
          </p>
        </div>
        <div className="flex flex-col gap-4 font-medium text-base sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[#ccc]"
            href="/about"
          >
            {t('aboutPage')}
          </Link>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/[.08] border-solid px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('documentation')}
          </a>
        </div>
      </main>
    </div>
  );
}
