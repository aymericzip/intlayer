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
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import { z } from 'zod';
import type {
  ShowcaseProjectAPI,
  ShowcaseProjectDocument,
} from '@/types/showcaseProject.types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mapToAPI = (doc: ShowcaseProjectDocument): ShowcaseProjectAPI => ({
  id: String((doc as any)._id),
  title: doc.title,
  description: doc.description,
  imageUrl: doc.imageUrl,
  logoUrl: doc.logoUrl,
  websiteUrl: doc.websiteUrl,
  githubUrl: doc.githubUrl,
  tags: doc.tags,
  upvotes: doc.upvotes,
  upvoters: doc.upvoters,
  isOpenSource: doc.isOpenSource,
  createdAt:
    doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : String(doc.createdAt),
  lastScanDate:
    doc.lastScanDate instanceof Date
      ? doc.lastScanDate.toISOString()
      : doc.lastScanDate
        ? String(doc.lastScanDate)
        : undefined,
  intlayerVersion: doc.intlayerVersion,
  libsUsed: doc.libsUsed,
  scanDetails: doc.scanDetails,
});

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

    // Scan via i18n-seo-scanner service
    logger.info(`Scanning ${validatedData.url}...`);
    const scanResult = await scanShowcaseProjectViaService(validatedData.url);

    if (
      !scanResult.intlayerVersion &&
      !scanResult.libsUsed.includes('intlayer')
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'SHOWCASE_PROJECT_NOT_INTLAYER',
        { url: validatedData.url }
      );
    }

    // Verify GitHub repo if provided
    let isOpenSource = false;
    let githubUrl = validatedData.githubUrl;

    if (githubUrl) {
      logger.info(`Verifying GitHub ${githubUrl}...`);
      const isIntlayerRepo = await verifyGithubRepo(githubUrl);

      if (isIntlayerRepo) {
        isOpenSource = true;
      } else {
        githubUrl = undefined;
      }
    }

    // Take screenshot and upload to S3
    logger.info(`[Taking screenshot of ${validatedData.url}...`);
    const logoUrl = getFaviconUrl(validatedData.url);
    const screenshotBuffer = await takeScreenshotViaService(validatedData.url);
    const imageUrl = await uploadShowcaseScreenshot(screenshotBuffer);

    // Save to DB
    const newProject = await showcaseProjectService.createShowcaseProject({
      title: validatedData.name,
      description: validatedData.tagline,
      websiteUrl: validatedData.url,
      githubUrl,
      logoUrl: logoUrl ?? '',
      imageUrl: imageUrl ?? '',
      tags: validatedData.useCases || [],
      isOpenSource,
      intlayerVersion: scanResult.intlayerVersion,
      libsUsed: scanResult.libsUsed,
      scanDetails: scanResult.scanDetails,
    });

    const responseData = formatResponse<ShowcaseProjectAPI>({
      message: t({
        en: 'Project submitted successfully',
        fr: 'Projet soumis avec succès',
        es: 'Proyecto enviado con éxito',
      }),
      description: t({
        en: 'Your project has been added to the showcase',
        fr: 'Votre projet a été ajouté à la vitrine',
        es: 'Su proyecto ha sido añadido al showcase',
      }),
      data: mapToAPI(newProject),
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

    const responseData = formatPaginatedResponse<ShowcaseProjectAPI>({
      data: data.map(mapToAPI),
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

    return reply.send(
      formatResponse<ShowcaseProjectAPI>({ data: mapToAPI(project) })
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

    return reply.send(
      formatResponse<ShowcaseProjectAPI[]>({ data: projects.map(mapToAPI) })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export type ToggleShowcaseLikeBody = { projectId: string; userId: string };
export type ToggleShowcaseLikeResult = ResponseData<{
  upvotes: number;
  isLiked: boolean;
}>;

/**
 * POST /api/showcase-project/like
 */
export const toggleShowcaseLike = async (
  request: FastifyRequest<{ Body: ToggleShowcaseLikeBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { projectId, userId } = request.body;

  if (!projectId || !userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_REQUEST_BODY',
      { detail: 'projectId and userId are required' }
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
