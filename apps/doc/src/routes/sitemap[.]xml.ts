import {
  Website_Blog_Root,
  Website_Blog_Search,
  Website_Doc_Chat,
  Website_Doc_Root,
  Website_Doc_Search,
  Website_FrequentQuestions,
  Website_PrivacyPolicy,
  Website_TermsOfService,
} from '@intlayer/design-system/routes';
import {
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
  getFrequentQuestionMetadataRecord,
} from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

const buildEntry = (
  path: string,
  opts: { changefreq: string; priority: number; lastmod?: string }
): string => {
  const fullUrl = `${SITE_URL}${path}`;
  const alternates = getMultilingualUrls(path);

  const hreflangLinks = [
    ...Object.entries(alternates).map(
      ([lang, localePath]) =>
        `    <xhtml:link rel="alternate" hrefLang="${lang}" href="${SITE_URL}${localePath}"/>`
    ),
    `    <xhtml:link rel="alternate" hrefLang="x-default" href="${fullUrl}"/>`,
  ].join('\n');

  return [
    '  <url>',
    `    <loc>${fullUrl}</loc>`,
    opts.lastmod ? `    <lastmod>${opts.lastmod}</lastmod>` : null,
    `    <changefreq>${opts.changefreq}</changefreq>`,
    `    <priority>${opts.priority}</priority>`,
    hreflangLinks,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const [docMetadata, blogMetadata, frequentQuestionsRecord] =
          await Promise.all([
            getDocMetadataBySlug([]),
            getBlogMetadataBySlug([]),
            getFrequentQuestionMetadataRecord(),
          ]);

        const frequentQuestionMetadata = Object.values(frequentQuestionsRecord);

        const staticEntries = [
          buildEntry(Website_Doc_Root, {
            changefreq: 'daily',
            priority: 1.0,
          }),
          buildEntry(Website_Doc_Search, {
            changefreq: 'monthly',
            priority: 0.5,
          }),
          buildEntry(Website_Doc_Chat, {
            changefreq: 'monthly',
            priority: 0.5,
          }),
          buildEntry(Website_Blog_Root, {
            changefreq: 'daily',
            priority: 0.9,
          }),
          buildEntry(Website_Blog_Search, {
            changefreq: 'weekly',
            priority: 0.7,
          }),
          buildEntry(Website_FrequentQuestions, {
            changefreq: 'weekly',
            priority: 0.8,
          }),
          buildEntry(Website_PrivacyPolicy, {
            changefreq: 'monthly',
            priority: 0.3,
          }),
          buildEntry(Website_TermsOfService, {
            changefreq: 'monthly',
            priority: 0.3,
          }),
        ];

        const docEntries = docMetadata
          .filter((meta) => meta.relativeUrl)
          .map((meta) =>
            buildEntry(meta.relativeUrl, {
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: meta.updatedAt
                ? new Date(meta.updatedAt).toISOString().split('T')[0]
                : undefined,
            })
          );

        const blogEntries = blogMetadata
          .filter((meta) => meta.relativeUrl)
          .map((meta) =>
            buildEntry(meta.relativeUrl, {
              changefreq: 'monthly',
              priority: 0.7,
              lastmod: meta.updatedAt
                ? new Date(meta.updatedAt).toISOString().split('T')[0]
                : undefined,
            })
          );

        const faqEntries = frequentQuestionMetadata
          .filter((meta) => meta.relativeUrl)
          .map((meta) =>
            buildEntry(meta.relativeUrl, {
              changefreq: 'monthly',
              priority: 0.6,
            })
          );

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${[...staticEntries, ...docEntries, ...blogEntries, ...faqEntries].join('\n')}
</urlset>`;

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
