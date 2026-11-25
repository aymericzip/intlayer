import {
  PAGE_FLOW_ENTRANCE,
  type PageFlow,
} from '@intlayer/backend-contract/analytics';

/** Weighted fictional sessions illustrate localization, exploration and signup. */
export const sampleJourneys = [
  {
    visitors: 124,
    pages: [
      '/',
      '/en/features',
      '/pricing',
      '/signup',
      '/onboarding',
      '/dashboard',
    ],
  },
  {
    visitors: 68,
    pages: [
      '/',
      '/fr/features',
      '/fr/pricing',
      '/signup',
      '/onboarding',
      '/dashboard',
    ],
  },
  {
    visitors: 46,
    pages: ['/', '/de/features', '/de/pricing', '/signup', '/onboarding'],
  },
  {
    visitors: 39,
    pages: ['/', '/en/features', '/doc', '/pricing', '/signup'],
  },
  { visitors: 32, pages: ['/', '/fr/features', '/doc', '/fr/pricing'] },
  {
    visitors: 28,
    pages: ['/', '/de/features', '/doc', '/de/pricing', '/signup'],
  },
  {
    visitors: 54,
    pages: ['/', '/pricing', '/doc', '/pricing', '/signup', '/onboarding'],
  },
  { visitors: 42, pages: ['/', '/pricing'] },
  { visitors: 31, pages: ['/', '/en/features'] },
  { visitors: 18, pages: ['/', '/fr/features'] },
  { visitors: 22, pages: ['/'] },
  {
    visitors: 62,
    pages: ['/doc', '/en/features', '/pricing', '/signup', '/onboarding'],
  },
  {
    visitors: 34,
    pages: [
      '/fr/features',
      '/fr/pricing',
      '/signup',
      '/onboarding',
      '/dashboard',
    ],
  },
  { visitors: 26, pages: ['/de/features', '/de/pricing', '/doc'] },
  {
    visitors: 19,
    pages: ['/pricing', '/signup', '/onboarding', '/dashboard'],
  },
  { visitors: 15, pages: ['/doc', '/pricing'] },
];

export const samplePageOptions = [
  ...new Set(sampleJourneys.flatMap(({ pages }) => pages)),
];

/** Aggregate the same sessions for each starting page; counts remain consistent. */
export const getSamplePageFlow = (startUrl: string): PageFlow => {
  const steps: PageFlow['steps'] = [];
  const links: PageFlow['links'] = [];

  for (const { visitors, pages } of sampleJourneys) {
    const startIndex = pages.indexOf(startUrl);
    if (startUrl !== PAGE_FLOW_ENTRANCE && startIndex === -1) continue;
    const journey =
      startUrl === PAGE_FLOW_ENTRANCE
        ? [PAGE_FLOW_ENTRANCE, ...pages]
        : pages.slice(startIndex);

    // Limit the visible horizon, without treating continuation as an exit.
    journey.slice(0, 5).forEach((url, step) => {
      const nodes = steps[step] ?? (steps[step] = []);
      let node = nodes.find((candidate) => candidate.url === url);
      if (!node) {
        node = { url, value: 0, exits: 0 };
        nodes.push(node);
      }
      node.value += visitors;
      node.exits =
        (node.exits ?? 0) + (step === journey.length - 1 ? visitors : 0);
      if (step === 0) return;
      const fromUrl = journey[step - 1];
      const existingLink = links.find(
        (link) =>
          link.fromStep === step - 1 &&
          link.fromUrl === fromUrl &&
          link.toUrl === url
      );
      if (existingLink) existingLink.value += visitors;
      else
        links.push({
          fromStep: step - 1,
          fromUrl,
          toUrl: url,
          value: visitors,
        });
    });
  }

  return { startUrl, range: '30d', steps, links };
};
