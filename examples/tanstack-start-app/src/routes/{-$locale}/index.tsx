import { createFileRoute } from '@tanstack/react-router';
import {
  getRequestHeader,
  getRequestHeaders,
} from '@tanstack/react-start/server';
import { getCookie, getLocale } from 'intlayer';
import { useIntlayer } from 'react-intlayer';

export const Route = createFileRoute('/{-$locale}/')({ component: App });

import { createServerFn } from '@tanstack/react-start';

// GET request (default)
export const getData = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Get the cookie from the request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader('cookie');

      return getCookie(name, cookieString);
    },
    // Get the header from the request (default: 'x-intlayer-locale')
    getHeader: (name) => getRequestHeader(name),
    // Fallback using Accept-Language negotiation
    getAllHeaders: async () => {
      const headers = getRequestHeaders();
      const result: Record<string, string> = {};

      // Convert the TypedHeaders into a plain Record<string, string>
      for (const [key, value] of headers.entries()) {
        result[key] = value;
      }

      return result;
    },
  });

  return { message: 'Hello from server!' };
});

function App() {
  const {
    logoAlt,
    heroSubtitle,
    heroDescription,
    docButtonLabel,
    guideTextPrefix,
    features: featureTranslations,
  } = useIntlayer('app');

  const { data } = getData();

  const features = featureTranslations.map((featureTranslation, index) => ({
    icon: '',
    title: featureTranslation.title.value,
    description: featureTranslation.description.value,
  }));

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-center gap-6">
            <img
              src="/tanstack-circle-logo.png"
              alt={logoAlt.value}
              className="h-24 w-24 md:h-32 md:w-32"
            />
            <h1 className="font-black text-6xl text-white tracking-[-0.08em] md:text-7xl">
              <span className="text-gray-300">TANSTACK</span>{' '}
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                START
              </span>
            </h1>
          </div>
          <p className="mb-4 font-light text-2xl text-gray-300 md:text-3xl">
            {heroSubtitle.value}
          </p>
          <p className="mx-auto mb-8 max-w-3xl text-gray-400 text-lg">
            {heroDescription.value}
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white shadow-cyan-500/50 shadow-lg transition-colors hover:bg-cyan-600"
            >
              {docButtonLabel.value}
            </a>
            <p className="mt-2 text-gray-400 text-sm">
              {guideTextPrefix.value}
              <code className="rounded bg-slate-700 px-2 py-1 text-cyan-400">
                /src/routes/index.tsx
              </code>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-3 font-semibold text-white text-xl">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
