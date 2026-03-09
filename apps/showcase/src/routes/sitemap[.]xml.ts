import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';
import { PagesRoutes } from '@/Routes';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
const SHOWCASE_API = `${BACKEND_URL}/api/showcase-project`;
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

type ProjectEntry = { _id: string; createdAt?: string };

const fetchAllProjects = async (): Promise<ProjectEntry[]> => {
  const all: ProjectEntry[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    try {
      const res = await fetch(`${SHOWCASE_API}?${params}`);

      if (!res.ok) break;

      const result = await res.json();
      const data: ProjectEntry[] = (result.data ?? []).map(
        (project: Record<string, unknown>) => ({
          ...(project as object),
          _id: (project.id ?? project._id) as string,
        })
      );

      all.push(...data);

      if (page >= (result.total_pages ?? 1)) break;

      page++;
    } catch {
      break;
    }
  }
  return all;
};

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
        const projects = await fetchAllProjects();

        const staticEntries = [
          buildEntry(PagesRoutes.Showcase, {
            changefreq: 'daily',
            priority: 1.0,
          }),
          buildEntry(PagesRoutes.ShowcaseSubmit, {
            changefreq: 'monthly',
            priority: 0.5,
          }),
        ];

        const projectEntries = projects.map((project) =>
          buildEntry(`/project/${project._id}`, {
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: project.createdAt
              ? new Date(project.createdAt).toISOString().split('T')[0]
              : undefined,
          })
        );

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${[...staticEntries, ...projectEntries].join('\n')}
</urlset>`;

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
