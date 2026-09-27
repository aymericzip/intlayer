import { getLocalizedUrl, Locales } from 'intlayer';

/** Reads every `<loc>` of a sitemap, following the children of an index. */
const fetchSitemapUrls = async (sitemapUrl: string): Promise<string[]> => {
  const sitemapResponse = await fetch(sitemapUrl);

  if (!sitemapResponse.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapResponse.statusText}`);
  }

  const sitemapText = await sitemapResponse.text();
  const locations = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1]
  );

  if (!sitemapText.includes('<sitemapindex')) return locations;

  const childUrls = await Promise.all(locations.map(fetchSitemapUrls));

  return childUrls.flat();
};

const pushToBaidu = async () => {
  const token = import.meta.env.VITE_BAIDU_PUSH_TOKEN;
  const site = import.meta.env.VITE_URL;

  if (!token || !site) {
    console.warn('Baidu push not configured');
    return;
  }

  const rawUrls = await fetchSitemapUrls(`${site}/sitemap.xml`);

  // Maps to Chinese and uses a Set to remove any duplicates if the sitemap
  // already contained both default and localized variants.
  const urlsToPush = Array.from(
    new Set(rawUrls.map((url) => getLocalizedUrl(url, Locales.CHINESE)))
  );

  const dailyQuotaLimit = 10;

  // Randomize the array so different pages get pushed on different builds
  const shuffledUrls = urlsToPush.sort(() => 0.5 - Math.random());

  const plainTextUrls = shuffledUrls.slice(0, dailyQuotaLimit).join('\n');

  const baiduApiUrl = `http://data.zz.baidu.com/urls?site=${site}&token=${token}`;

  try {
    const response = await fetch(baiduApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: plainTextUrls,
    });

    const data = await response.json();
    console.log('Baidu API Push Result:', data);
  } catch (error) {
    console.error('Failed to push to Baidu:', error);
  }
};

pushToBaidu();
