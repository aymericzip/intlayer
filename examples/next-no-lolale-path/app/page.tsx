import Image from 'next/image';
import {
  getLocale,
  IntlayerServerProvider,
  useIntlayer,
} from 'next-intlayer/server';
import type { FC } from 'react';
import { ClientComponentExample } from '@/components/clientComponentExample/ClientComponentExample';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { ServerComponentExample } from '@/components/serverComponentExample/ServerComponentExample';

const PageContent: FC = () => {
  const content = useIntlayer('page');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Language Switcher - Fixed position in top right */}
      <div className="fixed top-4 right-4 z-50">
        <LocaleSwitcher />
      </div>

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt={content.nextjsLogo.value}
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            {content.title}
          </h1>
          <p className="max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400">
            {content.description}{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              {content.templates}
            </a>{' '}
            {content.or}{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              {content.learning}
            </a>{' '}
            {content.center}
          </p>
        </div>
        <div className="flex flex-col gap-4 font-medium text-base sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt={content.vercelLogo.value}
              width={16}
              height={16}
            />
            {content.deployNow}
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/8 border-solid px-5 transition-colors hover:border-transparent hover:bg-black/4 md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.documentation}
          </a>
        </div>
      </main>
    </div>
  );
};

const Page = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
