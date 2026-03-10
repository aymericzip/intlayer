import { logger } from '@logger';
import * as showcaseProjectService from '@services/showcase/showcaseProject.service';
import { scanShowcaseProject as scanShowcaseProjectViaService } from '@services/showcase/showcaseScan.service';
import {
  deleteShowcaseScreenshot,
  uploadShowcaseScreenshot,
} from '@services/showcase/showcaseUploadScreenshot.service';
import { verifyGithubRepo } from '@services/showcase/showcaseVerifyGithub.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { getFaviconUrl } from '@utils/getFaviconUrl';
import {
  mapShowcaseProjectsToAPI,
  mapShowcaseProjectToAPI,
} from '@utils/mapper/showcaseProject';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import { z } from 'zod';
import type { ShowcaseProjectAPI } from '@/types/showcaseProject.types';

const getUserId = (request: FastifyRequest): string | undefined =>
  request.locals?.user
    ? String(
        (request.locals.user as any).id ?? (request.locals.user as any)._id
      )
    : undefined;

const urlSchema = z
  .url()
  .optional()
  .or(z.literal(''))
  .transform((value) => (value === '' ? undefined : value));

const submitProjectSchema = z.object({
  name: z.string().min(1),
  url: z
    .url()
    .refine((val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val), {
      message: 'Repository URLs should be placed in the GitHub URL field',
    }),
  githubUrl: urlSchema,
  useCases: z.array(z.string()).max(3).optional(),
});
export type SubmitShowcaseProjectBody = z.input<typeof submitProjectSchema>;
export type SubmitShowcaseProjectResult = ResponseData<ShowcaseProjectAPI>;

/**
 * POST /api/showcase-project/submit
 * Submits a new project to the showcase.
 */
export const submitShowcaseProject = async (
  request: FastifyRequest<{ Body: SubmitShowcaseProjectBody }>,
  reply: FastifyReply
): Promise<void> => {
  const parsed = submitProjectSchema.safeParse(request.body);

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY',
      { message }
    );
  }

  const validatedData = parsed.data;

  const userId = getUserId(request);

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_NOT_AUTHENTICATED'
    );
  }

  try {
    // Check for existing project with the same URL
    const existing = await showcaseProjectService.findShowcaseProjectByUrl(
      validatedData.url
    );

    if (existing) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'SHOWCASE_PROJECT_URL_ALREADY_EXISTS',
        { url: validatedData.url }
      );
    }

    // Save project to DB immediately — scan is triggered separately by the owner
    // tagline and description will be populated automatically during the scan step
    const logoUrl = getFaviconUrl(validatedData.url);
    const newProject = await showcaseProjectService.createShowcaseProject({
      title: validatedData.name,
      description: '',
      websiteUrl: validatedData.url,
      githubUrl: validatedData.githubUrl,
      logoUrl: logoUrl ?? '',
      tags: validatedData.useCases || [],
      owner: userId,
      status: 'pending_scan',
    });

    const responseData = formatResponse<ShowcaseProjectAPI>({
      message: t({
        en: 'Project submitted successfully',
        fr: 'Projet soumis avec succès',
        es: 'Proyecto enviado con éxito',
      }),
      description: t({
        en: 'Your project has been added to the showcase. Use the Scan button to verify and enrich it.',
        fr: 'Votre projet a été ajouté à la vitrine. Utilisez le bouton Scan pour le vérifier.',
        es: 'Su proyecto ha sido añadido al showcase. Use el botón Scan para verificarlo.',
      }),
      data: mapShowcaseProjectToAPI(newProject, userId),
    });

    return reply.send(responseData);
  } catch (error) {
    logger.error('[submitShowcaseProject] Error:', error);
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type GetShowcaseProjectsQuery = {
  page?: string;
  pageSize?: string;
  search?: string;
  selectedUseCases?: string | string[];
  isOpenSource?: string;
};
export type GetShowcaseProjectsResult = PaginatedResponse<ShowcaseProjectAPI>;

/**
 * GET /api/showcase-project
 */
export const getShowcaseProjects = async (
  request: FastifyRequest<{ Querystring: GetShowcaseProjectsQuery }>,
  reply: FastifyReply
): Promise<void> => {
  const {
    page: pageStr = '1',
    pageSize: pageSizeStr = '20',
    search = '',
    selectedUseCases,
    isOpenSource: isOpenSourceStr = 'false',
  } = request.query;

  const page = parseInt(pageStr, 10) || 1;
  const pageSize = parseInt(pageSizeStr, 10) || 20;
  const isOpenSource = isOpenSourceStr === 'true';

  const useCasesArray = selectedUseCases
    ? Array.isArray(selectedUseCases)
      ? selectedUseCases
      : [selectedUseCases]
    : [];

  try {
    const { data, total_items, total_pages } =
      await showcaseProjectService.findShowcaseProjects({
        search,
        selectedUseCases: useCasesArray,
        isOpenSource,
        page,
        pageSize,
      });

    const userId = getUserId(request);

    const responseData = formatPaginatedResponse<ShowcaseProjectAPI>({
      data: mapShowcaseProjectsToAPI(data, userId),
      page,
      pageSize,
      totalPages: total_pages,
      totalItems: total_items,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type GetShowcaseProjectByIdParams = { projectId: string };
export type GetShowcaseProjectByIdResult = ResponseData<ShowcaseProjectAPI>;

/**
 * GET /api/showcase-project/:projectId
 */
export const getShowcaseProjectById = async (
  request: FastifyRequest<{ Params: GetShowcaseProjectByIdParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { projectId } = request.params;

  try {
    const project =
      await showcaseProjectService.findShowcaseProjectById(projectId);

    const userId = getUserId(request);

    return reply.send(
      formatResponse<ShowcaseProjectAPI>({
        data: mapShowcaseProjectToAPI(project, userId),
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type GetOtherShowcaseProjectsQuery = {
  excludeId: string;
  limit?: string;
};
export type GetOtherShowcaseProjectsResult = ResponseData<ShowcaseProjectAPI[]>;

/**
 * GET /api/showcase-project/others?excludeId=...&limit=...
 */
export const getOtherShowcaseProjects = async (
  request: FastifyRequest<{ Querystring: GetOtherShowcaseProjectsQuery }>,
  reply: FastifyReply
): Promise<void> => {
  const { excludeId, limit: limitStr } = request.query;
  const limit = limitStr ? parseInt(limitStr, 10) : 4;

  if (!excludeId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SHOWCASE_PROJECT_NOT_FOUND',
      { detail: 'excludeId is required' }
    );
  }

  try {
    const projects = await showcaseProjectService.findOtherShowcaseProjects(
      excludeId,
      limit
    );

    const userId = getUserId(request);

    return reply.send(
      formatResponse<ShowcaseProjectAPI[]>({
        data: mapShowcaseProjectsToAPI(projects, userId),
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type ToggleShowcaseUpvoteBody = { projectId: string };
export type ToggleShowcaseUpvoteResult = ResponseData<{
  upvotes: number;
  isUpVoted: boolean;
  downvotes: number;
  isDownVoted: boolean;
}>;

/**
 * POST /api/showcase-project/upvote
 * Requires authentication — userId is read from the session.
 */
export const toggleShowcaseUpvote = async (
  request: FastifyRequest<{ Body: ToggleShowcaseUpvoteBody }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = getUserId(request);

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_NOT_AUTHENTICATED'
    );
  }

  const { projectId } = request.body;

  if (!projectId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY',
      { detail: 'projectId is required' }
    );
  }

  try {
    const result = await showcaseProjectService.toggleShowcaseUpvote(
      projectId,
      userId
    );

    return reply.send(formatResponse({ data: result }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type ToggleShowcaseDownvoteBody = { projectId: string };
export type ToggleShowcaseDownvoteResult = ResponseData<{
  upvotes: number;
  isUpVoted: boolean;
  downvotes: number;
  isDownVoted: boolean;
}>;

/**
 * POST /api/showcase-project/downvote
 * Requires authentication — userId is read from the session.
 */
export const toggleShowcaseDownvote = async (
  request: FastifyRequest<{ Body: ToggleShowcaseDownvoteBody }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = getUserId(request);

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_NOT_AUTHENTICATED'
    );
  }

  const { projectId } = request.body;

  if (!projectId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY',
      { detail: 'projectId is required' }
    );
  }

  try {
    const result = await showcaseProjectService.toggleShowcaseDownvote(
      projectId,
      userId
    );

    return reply.send(formatResponse({ data: result }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

const updateProjectSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  url: z
    .url()
    .refine((val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val), {
      message: 'Repository URLs should be placed in the GitHub URL field',
    })
    .optional(),
  githubUrl: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return null;
      if (value.startsWith('http://') || value.startsWith('https://'))
        return value;
      return `https://${value}`;
    }),
  tagline: z.string().min(1).max(500).optional(),
  description: z.string().optional(),
  useCases: z.array(z.string()).max(3).optional(),
});

export type UpdateShowcaseProjectBody = z.input<typeof updateProjectSchema>;
export type UpdateShowcaseProjectParams = { projectId: string };
export type UpdateShowcaseProjectResult = ResponseData<ShowcaseProjectAPI>;

/**
 * PATCH /api/showcase-project/:projectId
 * Updates an existing project. Only the owner can update.
 */
export const updateShowcaseProjectHandler = async (
  request: FastifyRequest<{
    Params: UpdateShowcaseProjectParams;
    Body: UpdateShowcaseProjectBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = getUserId(request);

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_NOT_AUTHENTICATED'
    );
  }

  const parsed = updateProjectSchema.safeParse(request.body);

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY',
      { message }
    );
  }

  const { projectId } = request.params;

  try {
    const project =
      await showcaseProjectService.findShowcaseProjectById(projectId);

    if (String(project.owner) !== userId) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_ID_MISMATCH');
    }

    const { name, url, githubUrl, tagline, useCases } = parsed.data;
    const updates: Parameters<
      typeof showcaseProjectService.updateShowcaseProject
    >[1] = {};

    if (name !== undefined) updates.title = name;
    if (url !== undefined) updates.websiteUrl = url;
    if ('githubUrl' in parsed.data) updates.githubUrl = githubUrl;
    if (tagline !== undefined) updates.description = tagline;
    if (useCases !== undefined) updates.tags = useCases;

    const updated = await showcaseProjectService.updateShowcaseProject(
      projectId,
      updates
    );

    return reply.send(
      formatResponse<ShowcaseProjectAPI>({
        message: t({
          en: 'Project updated successfully',
          fr: 'Projet mis à jour avec succès',
          es: 'Proyecto actualizado con éxito',
        }),
        data: mapShowcaseProjectToAPI(updated, userId),
      })
    );
  } catch (error) {
    logger.error('[updateShowcaseProjectHandler] Error:', error);
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type DeleteShowcaseProjectParams = { projectId: string };

/**
 * DELETE /api/showcase-project/:projectId
 * Deletes a project (DB + R2 screenshot). Only the owner can delete.
 */
export const deleteShowcaseProjectHandler = async (
  request: FastifyRequest<{ Params: DeleteShowcaseProjectParams }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = getUserId(request);

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_NOT_AUTHENTICATED'
    );
  }

  const { projectId } = request.params;

  try {
    const project =
      await showcaseProjectService.findShowcaseProjectById(projectId);

    if (String(project.owner) !== userId) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_ID_MISMATCH');
    }

    await Promise.allSettled([
      showcaseProjectService.deleteShowcaseProject(projectId),
      project.imageUrl
        ? deleteShowcaseScreenshot(project.imageUrl)
        : Promise.resolve(),
    ]);

    return reply.send(formatResponse({ data: { success: true } }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type ScanShowcaseProjectParams = { projectId: string };

/**
 * GET /api/showcase-project/:projectId/scan
 * SSE endpoint — streams scan progress to the owner.
 * Requires authentication: only the project owner can trigger the scan.
 */
export const scanShowcaseProject = async (
  request: FastifyRequest<{ Params: ScanShowcaseProjectParams }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = getUserId(request);

  if (!userId) {
    reply.status(401).send({ error: { message: 'Authentication required' } });
    return;
  }

  const { projectId } = request.params;

  let project: Awaited<
    ReturnType<typeof showcaseProjectService.findShowcaseProjectById>
  >;
  try {
    project = await showcaseProjectService.findShowcaseProjectById(projectId);
  } catch {
    reply.status(404).send({ error: { message: 'Project not found' } });
    return;
  }

  if (project.owner !== userId) {
    reply.status(403).send({
      error: { message: 'Only the project owner can trigger a scan' },
    });
    return;
  }

  // Hijack the reply and write SSE manually
  reply.hijack();
  const raw = reply.raw;
  const origin = request.headers.origin ?? '*';
  raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
  });

  const send = (data: Record<string, unknown>) => {
    raw.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Track the uploaded screenshot URL so we can delete it on failure.
  let uploadedImageUrl: string | null = null;

  const cleanup = async (message: string) => {
    await Promise.allSettled([
      showcaseProjectService.deleteShowcaseProject(projectId),
      uploadedImageUrl
        ? deleteShowcaseScreenshot(uploadedImageUrl)
        : Promise.resolve(),
    ]);
    send({ step: 'ERROR', message });
  };

  try {
    // ── Step 1: Scan website + take screenshot (single browser session) ────────
    send({ step: 'SCANNING_START' });
    const scanResult = await scanShowcaseProjectViaService(project.websiteUrl);

    if (!scanResult.hasIntlayer && !scanResult.libsUsed.includes('intlayer')) {
      await cleanup('Intlayer not detected on this website');
      raw.end();
      return;
    }
    send({ step: 'SCANNING_SUCCESS' });

    // ── Step 2: Verify GitHub (if provided) ───────────────────────────────────
    let isOpenSource = false;
    let githubPackageDetails: Record<string, string> = {};

    if (project.githubUrl) {
      send({ step: 'VERIFY_GITHUB_START' });
      logger.info(
        `[scanShowcaseProject] Verifying GitHub ${project.githubUrl}...`
      );
      const githubResult = await verifyGithubRepo(project.githubUrl);
      if (githubResult?.isValid) {
        isOpenSource = true;
        githubPackageDetails = githubResult.packageDetails ?? {};
      }
      send({ step: 'VERIFY_GITHUB_SUCCESS' });
    }

    // ── Step 3: Upload the screenshot captured during scan ────────────────────
    send({ step: 'SCREENSHOT_START' });
    uploadedImageUrl = await uploadShowcaseScreenshot(
      scanResult.screenshotBuffer,
      project.websiteUrl
    );
    send({ step: 'SCREENSHOT_SUCCESS' });

    // ── Step 4: Merge & save ──────────────────────────────────────────────────
    const mergedPackageDetails: Record<string, string> = {
      ...(scanResult.packageDetails ?? {}),
      ...githubPackageDetails,
    };
    const mergedLibsUsed = Array.from(
      new Set([...scanResult.libsUsed, ...Object.keys(githubPackageDetails)])
    );
    const intlayerVersion =
      mergedPackageDetails.intlayer || scanResult.intlayerVersion;

    const updated = await showcaseProjectService.updateShowcaseProject(
      projectId,
      {
        intlayerVersion,
        libsUsed: mergedLibsUsed,
        packageDetails: mergedPackageDetails,
        scanDetails: scanResult.scanDetails,
        imageUrl: uploadedImageUrl ?? project.imageUrl,
        isOpenSource,
        status: 'active',
        lastScanDate: new Date(),
        // Populate tagline/description from page metadata if not already set
        ...((!project.description || project.description === '') &&
        scanResult.metaDescription
          ? { description: scanResult.metaDescription }
          : {}),
      }
    );

    send({
      step: 'SUCCESS',
      project: mapShowcaseProjectToAPI(updated, userId),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Scan failed unexpectedly';
    logger.error('[scanShowcaseProject] Error:', error);
    await cleanup(message);
  }

  raw.end();
};
