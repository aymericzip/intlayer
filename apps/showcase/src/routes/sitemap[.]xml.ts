import {
  Showcase_Root_Path,
  Showcase_Submit_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap } from 'intlayer';

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

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const projects = await fetchAllProjects();

        const sitemap = generateSitemap(
          [
            {
              path: Showcase_Root_Path,
              changefreq: 'daily',
              priority: 1.0,
            },
            {
              path: Showcase_Submit_Path,
              changefreq: 'monthly',
              priority: 0.5,
            },
            ...projects.map((project) => ({
              path: `/project/${project._id}`,
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: project.createdAt
                ? new Date(project.createdAt).toISOString().split('T')[0]
                : undefined,
            })),
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
