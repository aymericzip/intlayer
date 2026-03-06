import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { submitProjectSchema } from './projectSchema';
import type { Project } from './types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
const SHOWCASE_API = `${BACKEND_URL}/api/showcase-project`;

/** Map backend ShowcaseProjectAPI (uses `id`) to showcase Project (uses `_id`) */
const mapProject = (p: Record<string, unknown>): Project =>
  ({ ...p, _id: p.id ?? p._id }) as Project;

type SubmitProjectInput = z.infer<typeof submitProjectSchema>;

const getProjectsSchema = z.object({
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
  search: z.string().optional().default(''),
  selectedUseCases: z.array(z.string()).optional().default([]),
  isOpenSource: z.boolean().optional().default(false),
});

type GetProjectsInput = z.infer<typeof getProjectsSchema>;

export const submitProject = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => submitProjectSchema.parse(data))
  .handler(async function* ({ data }: { data: SubmitProjectInput }) {
    try {
      yield { step: 'START' };
      yield { step: 'SCANNING_START' };

      const response = await fetch(`${SHOWCASE_API}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          url: data.url,
          githubUrl: data.githubUrl,
          tagline: data.tagline,
          description: data.description,
          useCases: data.useCases,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message =
          result?.error?.message ??
          result?.error?.title ??
          `Request failed: ${response.statusText}`;
        yield { step: 'ERROR', message };
        return;
      }

      yield { step: 'SCANNING_SUCCESS' };

      if (data.githubUrl) {
        yield { step: 'VERIFY_GITHUB_START' };
        yield { step: 'VERIFY_GITHUB_SUCCESS' };
      }

      yield { step: 'DB_SCREENSHOT_START' };
      yield { step: 'SUCCESS', project: mapProject(result.data) };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      yield { step: 'ERROR', message };
    }
  });

export const getProjects = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getProjectsSchema.parse(data))
  .handler(async ({ data }: { data: GetProjectsInput }) => {
    try {
      const { page, pageSize, search, selectedUseCases, isOpenSource } = data;

      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        search,
        isOpenSource: String(isOpenSource),
      });

      for (const uc of selectedUseCases) {
        params.append('selectedUseCases', uc);
      }

      const response = await fetch(`${SHOWCASE_API}?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        return { data: [], total_pages: 1, total_items: 0 };
      }

      return {
        data: (result.data ?? []).map(mapProject) as Project[],
        total_pages: result.total_pages ?? 1,
        total_items: result.total_items ?? 0,
      };
    } catch {
      return { data: [], total_pages: 1, total_items: 0 };
    }
  });

export const getProjectById = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) =>
    z.object({ projectId: z.string() }).parse(data)
  )
  .handler(async ({ data }: { data: { projectId: string } }) => {
    try {
      const response = await fetch(`${SHOWCASE_API}/${data.projectId}`);
      const result = await response.json();

      if (!response.ok || !result.data) return { data: null };

      return { data: mapProject(result.data) };
    } catch {
      return { data: null };
    }
  });

export const getOtherProjects = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) =>
    z
      .object({ excludeId: z.string(), limit: z.number().optional() })
      .parse(data)
  )
  .handler(
    async ({ data }: { data: { excludeId: string; limit?: number } }) => {
      try {
        const params = new URLSearchParams({ excludeId: data.excludeId });
        if (data.limit) params.set('limit', String(data.limit));

        const response = await fetch(`${SHOWCASE_API}/others?${params}`);
        const result = await response.json();

        if (!response.ok) return { data: [] };

        return {
          data: (result.data ?? []).map(mapProject) as Project[],
        };
      } catch {
        return { data: [] };
      }
    }
  );

export const toggleLike = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) =>
    z.object({ projectId: z.string(), userId: z.string() }).parse(data)
  )
  .handler(
    async ({ data }: { data: { projectId: string; userId: string } }) => {
      try {
        const response = await fetch(`${SHOWCASE_API}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          return { success: false, error: result?.error?.message };
        }

        return result.data ?? { success: false };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    }
  );
