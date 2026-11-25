import { sampleJourneys } from './samplePageFlow';

type SampleRow = { key: string; users: number; views: number };

/** Fictional country distribution for the same sample audience as the flow. */
const countryCounts: [string, number][] = [
  ['FR', 64],
  ['DE', 51],
  ['GB', 43],
  ['IN', 39],
  ['BR', 32],
  ['JP', 28],
  ['CA', 25],
  ['AU', 22],
  ['ES', 20],
  ['IT', 18],
  ['MX', 17],
  ['KR', 16],
  ['ID', 15],
  ['NL', 14],
  ['PL', 13],
  ['TR', 12],
  ['VN', 11],
  ['AR', 10],
  ['ZA', 9],
  ['NG', 8],
  ['EG', 7],
  ['SA', 6],
  ['AE', 6],
  ['SE', 5],
  ['UA', 5],
  ['PT', 4],
  ['NZ', 4],
  ['SG', 3],
  ['KE', 3],
  ['CL', 2],
];
const totalVisitors = sampleJourneys.reduce(
  (total, journey) => total + journey.visitors,
  0
);
export const sampleCountries: SampleRow[] = [
  {
    key: 'US',
    users:
      totalVisitors -
      countryCounts.reduce((total, [, users]) => total + users, 0),
    views: 0,
  },
  ...countryCounts.map(([key, users]) => ({ key, users, views: 0 })),
].sort((first, second) => second.users - first.users);

const pages = new Map<string, SampleRow>();
const locales = new Map<string, SampleRow>();
for (const journey of sampleJourneys) {
  const visitedLocales = new Set<string>();
  let currentLocale = 'en';
  for (const page of journey.pages) {
    currentLocale = page.match(/^\/(en|fr|de)\//)?.[1] ?? currentLocale;
    const pageRow = pages.get(page) ?? { key: page, users: 0, views: 0 };
    pageRow.views += journey.visitors;
    pages.set(page, pageRow);
    const localeRow = locales.get(currentLocale) ?? {
      key: currentLocale,
      users: 0,
      views: 0,
    };
    localeRow.views += journey.visitors;
    if (!visitedLocales.has(currentLocale)) localeRow.users += journey.visitors;
    visitedLocales.add(currentLocale);
    locales.set(currentLocale, localeRow);
  }
}

export const samplePages = [...pages.values()].sort(
  (first, second) => second.views - first.views
);
export const sampleLocales = [...locales.values()].sort(
  (first, second) => second.views - first.views
);
