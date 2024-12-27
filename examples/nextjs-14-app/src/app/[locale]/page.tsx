import { LocaleSwitcher } from '@components/LangSwitcherDropDown';
import Image from 'next/image';
import { IntlayerClientProvider, type Next14PageIntlayer } from 'next-intlayer';
import { useIntlayer, IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';
import { IntlayerEditorProvider } from 'intlayer-editor';
export { generateMetadata };

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  // Because the page is not wrapped in the IntlayerServerProvider, we need to use add the locale to the useIntlayer hook
  const content = useIntlayer('page', locale);

  return (
    <>
      {/**
       *   IntlayerServerProvider is used to provide the locale to the server children
       *   IntlayerServerProvider don't work if set in the layout
       */}
      <IntlayerServerProvider locale={locale}>
        {/**
         *   IntlayerClientProvider is used to provide the locale to the client children
         *   IntlayerClientProvider can be set in any parent component, including the layout
         */}
        <IntlayerClientProvider locale={locale}>
          <IntlayerEditorProvider>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
                  {content.getStarted.main}&nbsp;
                  <code className="font-mono font-bold">
                    {content.getStarted.pageLink}
                  </code>
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:size-auto lg:bg-none dark:from-black dark:via-black">
                  <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.byVersel}{' '}
                    <Image
                      src="/vercel.svg"
                      alt="Vercel Logo"
                      className="dark:invert"
                      width={100}
                      height={24}
                      priority
                    />
                  </a>
                </div>
              </div>

              <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
                />
              </div>

              <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                <a
                  href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    {content.docs.title}{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    {content.docs.detail}
                  </p>
                </a>

                <a
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    {content.learn.title}{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    {content.learn.detail}
                  </p>
                </a>

                <a
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    {content.templates.title}{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    {content.templates.detail}
                  </p>
                </a>

                <a
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    {content.deploy.title}{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p
                    className={`m-0 max-w-[30ch] text-balance text-sm opacity-50`}
                  >
                    {content.deploy.detail}
                  </p>
                </a>
              </div>
            </main>
            <div className="absolute bottom-5 right-5 z-50">
              <LocaleSwitcher />
            </div>
          </IntlayerEditorProvider>
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
