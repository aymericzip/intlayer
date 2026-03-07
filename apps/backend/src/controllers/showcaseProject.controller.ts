import { logger } from '@logger';
import * as showcaseProjectService from '@services/showcase/showcaseProject.service';
import {
  scanShowcaseProject as scanShowcaseProjectViaService,
  takeShowcaseScreenshot as takeScreenshotViaService,
} from '@services/showcase/showcaseScan.service';
import { uploadShowcaseScreenshot } from '@services/showcase/showcaseUploadScreenshot.service';
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getUserId = (request: FastifyRequest): string | undefined =>
  request.locals?.user
    ? String(
        (request.locals.user as any).id ?? (request.locals.user as any)._id
      )
    : undefined;

// ─── Input Schemas ────────────────────────────────────────────────────────────

const urlSchema = z
  .string()
  .url()
  .optional()
  .or(z.literal(''))
  .transform((value) => (value === '' ? undefined : value));

const submitProjectSchema = z.object({
  name: z.string().min(1),
  url: z
    .string()
    .url()
    .refine((val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val), {
      message: 'Repository URLs should be placed in the GitHub URL field',
    }),
  githubUrl: urlSchema,
  tagline: z.string().min(1),
  description: z.string().optional(),
  useCases: z.array(z.string()).optional(),
});

// ─── Controllers ──────────────────────────────────────────────────────────────

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
    const logoUrl = getFaviconUrl(validatedData.url);
    const newProject = await showcaseProjectService.createShowcaseProject({
      title: validatedData.name,
      description: validatedData.tagline,
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

export type ToggleShowcaseLikeBody = { projectId: string };
export type ToggleShowcaseLikeResult = ResponseData<{
  upvotes: number;
  isLiked: boolean;
}>;

/**
 * POST /api/showcase-project/like
 * Requires authentication — userId is read from the session.
 */
export const toggleShowcaseLike = async (
  request: FastifyRequest<{ Body: ToggleShowcaseLikeBody }>,
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
    const result = await showcaseProjectService.toggleShowcaseLike(
      projectId,
      userId
    );

    return reply.send(
      formatResponse<{ upvotes: number; isLiked: boolean }>({ data: result })
    );
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

  try {
    // ── Step 1: Scan website ──────────────────────────────────────────────────
    send({ step: 'SCANNING_START' });
    logger.info(`[scanShowcaseProject] Scanning ${project.websiteUrl}...`);
    const scanResult = await scanShowcaseProjectViaService(project.websiteUrl);

    if (!scanResult.hasIntlayer && !scanResult.libsUsed.includes('intlayer')) {
      await showcaseProjectService.updateShowcaseProject(projectId, {
        status: 'scan_failed',
      });
      send({ step: 'ERROR', message: 'Intlayer not detected on this website' });
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

    // ── Step 3: Screenshot ────────────────────────────────────────────────────
    send({ step: 'SCREENSHOT_START' });
    logger.info(
      `[scanShowcaseProject] Taking screenshot of ${project.websiteUrl}...`
    );
    const screenshotBuffer = await takeScreenshotViaService(project.websiteUrl);
    const imageUrl = await uploadShowcaseScreenshot(screenshotBuffer);
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
        imageUrl: imageUrl ?? project.imageUrl,
        isOpenSource,
        status: 'active',
        lastScanDate: new Date(),
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
    try {
      await showcaseProjectService.updateShowcaseProject(projectId, {
        status: 'scan_failed',
      });
      send({ step: 'ERROR', message });
    } catch {
      // ignore secondary error
    }
  }

  raw.end();
};
