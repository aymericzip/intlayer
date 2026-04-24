import { getLocalizedUrl, Locales } from 'intlayer';

const pushToBaidu = async () => {
  const token = process.env.VITE_BAIDU_PUSH_TOKEN;
  const site = process.env.VITE_SITE_URL;

  if (!token || !site) {
    console.warn('Baidu push not configured');
    return;
  }

  const sitemapResponse = await fetch(`${site}/sitemap.xml`);

  if (!sitemapResponse.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapResponse.statusText}`);
  }

  const sitemapText = await sitemapResponse.text();

  const urlMatches = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)];
  const rawUrls = urlMatches.map((match) => match[1]);

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
