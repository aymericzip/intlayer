import {
  Doc_Blog_Root_Path,
  Doc_Blog_Search_Path,
  Doc_Chat_Path,
  Doc_FrequentQuestions_Path,
  Doc_PrivacyPolicy_Path,
  Doc_Root_Path,
  Doc_Search_Path,
  Doc_TermsOfService_Path,
} from '@intlayer/design-system/routes';
import {
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
  getFrequentQuestionMetadataRecord,
} from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

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

        const staticEntries: SitemapUrlEntry[] = [
          { path: Doc_Root_Path, changefreq: 'daily', priority: 1.0 },
          { path: Doc_Search_Path, changefreq: 'monthly', priority: 0.5 },
          { path: Doc_Chat_Path, changefreq: 'monthly', priority: 0.5 },
          { path: Doc_Blog_Root_Path, changefreq: 'daily', priority: 0.9 },
          { path: Doc_Blog_Search_Path, changefreq: 'weekly', priority: 0.7 },
          {
            path: Doc_FrequentQuestions_Path,
            changefreq: 'weekly',
            priority: 0.8,
          },
          { path: Doc_PrivacyPolicy_Path, changefreq: 'monthly', priority: 0.3 },
          { path: Doc_TermsOfService_Path, changefreq: 'monthly', priority: 0.3 },
        ];

        const docEntries: SitemapUrlEntry[] = docMetadata
          .filter((meta) => meta.relativeUrl)
          .map((meta) => ({
            path: meta.relativeUrl!,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: meta.updatedAt
              ? new Date(meta.updatedAt).toISOString().split('T')[0]
              : undefined,
          }));

        const blogEntries: SitemapUrlEntry[] = blogMetadata
          .filter((meta) => meta.relativeUrl)
          .map((meta) => ({
            path: meta.relativeUrl!,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: meta.updatedAt
              ? new Date(meta.updatedAt).toISOString().split('T')[0]
              : undefined,
          }));

        const faqEntries: SitemapUrlEntry[] = frequentQuestionMetadata
          .filter((meta) => meta.relativeUrl)
          .map((meta) => ({
            path: meta.relativeUrl!,
            changefreq: 'monthly',
            priority: 0.6,
          }));

        const sitemap = generateSitemap(
          [...staticEntries, ...docEntries, ...blogEntries, ...faqEntries],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});

