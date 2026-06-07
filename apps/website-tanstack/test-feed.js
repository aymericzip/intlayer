import RSS from 'rss';
const siteUrl = process.env.VITE_URL ?? process.env.VITE_SITE_URL ?? '';
console.log(siteUrl);
try {
  const feed = new RSS({
    title: 'Intlayer',
    description: 'Intlayer is a suite of tools designed to help you manage your internationalization.',
    site_url: siteUrl,
    feed_url: new URL('/feed.xml', siteUrl).toString(),
    copyright: `${new Date().getFullYear()} Intlayer`,
    language: 'en',
    pubDate: new Date(),
  });
  console.log("Success");
} catch(e) {
  console.error(e);
}
