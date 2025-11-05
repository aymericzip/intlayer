import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import * as auditService from '@services/audit.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
import type { Types } from 'mongoose';
import type { AuditAPI, AuditData, AuditDocument } from '@/types/audit.types';

export type CreateAuditBody = AuditData;
export type CreateAuditResult = ResponseData<AuditAPI>;

/**
 * Creates a new audit in the database.
 */
export const createAudit = async (
  req: Request<any, any, CreateAuditBody>,
  res: ResponseWithSession<CreateAuditResult>,
  _next: NextFunction
): Promise<void> => {
  const auditData = req.body;
  const auditApiKey = req.headers['x-audit-api-key'];

  // Validate API key from environment variable
  if (!process.env.AUDIT_API_KEY) {
    ErrorHandler.handleCustomErrorResponse(
      res,
      'AUDIT_API_KEY_NOT_CONFIGURED',
      {
        en: 'Audit API Key Not Configured',
        fr: "Clé API d'audit non configurée",
        es: 'Clave API de auditoría no configurada',
      },
      {
        en: 'AUDIT_API_KEY environment variable is not set on the server',
        fr: "La variable d'environnement AUDIT_API_KEY n'est pas définie sur le serveur",
        es: 'La variable de entorno AUDIT_API_KEY no está configurada en el servidor',
      },
      undefined,
      HttpStatusCodes.INTERNAL_SERVER_ERROR_500
    );
    return;
  }

  if (auditApiKey !== process.env.AUDIT_API_KEY) {
    ErrorHandler.handleCustomErrorResponse(
      res,
      'INVALID_AUDIT_API_KEY',
      {
        en: 'Invalid Audit API Key',
        fr: "Clé API d'audit invalide",
        es: 'Clave API de auditoría inválida',
      },
      {
        en: 'The provided audit API key is invalid',
        fr: "La clé API d'audit fournie est invalide",
        es: 'La clave API de auditoría proporcionada es inválida',
      },
      undefined,
      HttpStatusCodes.UNAUTHORIZED_401
    );
    return;
  }

  if (!auditData) {
    ErrorHandler.handleGenericErrorResponse(res, 'INVALID_REQUEST_BODY');
    return;
  }

  try {
    // user and project are optional - may be provided if authenticated
    const { user, project } = res.locals;
    const audit: AuditData = {
      ...auditData,
      userId: user?.id,
      projectId: project?.id as Types.ObjectId | undefined,
    };

    const newAudit = await auditService.createAudit(audit);

    const responseData = formatResponse<AuditAPI>({
      message: t({
        en: 'Audit created successfully',
        fr: 'Audit créé avec succès',
        es: 'Auditoría creada con éxito',
      }),
      description: t({
        en: 'Your audit has been saved successfully',
        fr: 'Votre audit a été enregistré avec succès',
        es: 'Su auditoría ha sido guardada con éxito',
      }),
      data: newAudit.toJSON() as unknown as AuditAPI,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetAuditsParams = {
  page?: number;
  pageSize?: number;
};
export type GetAuditsResult = PaginatedResponse<AuditAPI>;

/**
 * Retrieves audits for the current user or project.
 */
export const getAudits = async (
  req: Request<any, any, any, GetAuditsParams>,
  res: ResponseWithSession<GetAuditsResult>,
  _next: NextFunction
): Promise<void> => {
  const auditApiKey = req.headers['x-audit-api-key'];

  // Validate API key from environment variable
  if (!process.env.AUDIT_API_KEY) {
    ErrorHandler.handleCustomErrorResponse(
      res,
      'AUDIT_API_KEY_NOT_CONFIGURED',
      {
        en: 'Audit API Key Not Configured',
        fr: "Clé API d'audit non configurée",
        es: 'Clave API de auditoría no configurada',
      },
      {
        en: 'AUDIT_API_KEY environment variable is not set on the server',
        fr: "La variable d'environnement AUDIT_API_KEY n'est pas définie sur le serveur",
        es: 'La variable de entorno AUDIT_API_KEY no está configurada en el servidor',
      },
      undefined,
      HttpStatusCodes.INTERNAL_SERVER_ERROR_500
    );
    return;
  }

  if (auditApiKey !== process.env.AUDIT_API_KEY) {
    ErrorHandler.handleCustomErrorResponse(
      res,
      'INVALID_AUDIT_API_KEY',
      {
        en: 'Invalid Audit API Key',
        fr: "Clé API d'audit invalide",
        es: 'Clave API de auditoría inválida',
      },
      {
        en: 'The provided audit API key is invalid',
        fr: "La clé API d'audit fournie est invalide",
        es: 'La clave API de auditoría proporcionada es inválida',
      },
      undefined,
      HttpStatusCodes.UNAUTHORIZED_401
    );
    return;
  }

  try {
    const { user, project } = res.locals;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    // If user/project are available, filter by them, otherwise return all audits
    let audits: AuditDocument[];
    if (project) {
      audits = await auditService.findAuditsByProjectId(
        project.id,
        pageSize,
        skip
      );
    } else if (user) {
      audits = await auditService.findAuditsByUserId(user.id, pageSize, skip);
    } else {
      // Return empty array if no user/project context
      audits = [];
    }

    const totalItems = audits.length;

    const responseData = formatPaginatedResponse<AuditAPI>({
      data: audits.map((audit) => audit.toJSON() as unknown as AuditAPI),
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GetAuditByIdParams = { auditId: string };
export type GetAuditByIdResult = ResponseData<AuditAPI>;

/**
 * Retrieves an audit by its ID.
 */
export const getAuditById = async (
  req: Request<GetAuditByIdParams>,
  res: ResponseWithSession<GetAuditByIdResult>,
  _next: NextFunction
): Promise<void> => {
  const { auditId } = req.params;
  const auditApiKey = req.headers['x-audit-api-key'];

  // Validate API key from environment variable
  if (!process.env.AUDIT_API_KEY) {
    ErrorHandler.handleCustomErrorResponse(
      res,
      'AUDIT_API_KEY_NOT_CONFIGURED',
      {
        en: 'Audit API Key Not Configured',
        fr: "Clé API d'audit non configurée",
        es: 'Clave API de auditoría no configurada',
      },
      {
        en: 'AUDIT_API_KEY environment variable is not set on the server',
        fr: "La variable d'environnement AUDIT_API_KEY n'est pas définie sur le serveur",
        es: 'La variable de entorno AUDIT_API_KEY no está configurada en el servidor',
      },
      undefined,
      HttpStatusCodes.INTERNAL_SERVER_ERROR_500
    );
    return;
  }

  if (auditApiKey !== process.env.AUDIT_API_KEY) {
    ErrorHandler.handleCustomErrorResponse(
      res,
      'INVALID_AUDIT_API_KEY',
      {
        en: 'Invalid Audit API Key',
        fr: "Clé API d'audit invalide",
        es: 'Clave API de auditoría inválida',
      },
      {
        en: 'The provided audit API key is invalid',
        fr: "La clé API d'audit fournie est invalide",
        es: 'La clave API de auditoría proporcionada es inválida',
      },
      undefined,
      HttpStatusCodes.UNAUTHORIZED_401
    );
    return;
  }

  if (!auditId) {
    ErrorHandler.handleGenericErrorResponse(res, 'INVALID_REQUEST_BODY');
    return;
  }

  try {
    const audit = await auditService.getAuditById(auditId);

    const responseData = formatResponse<AuditAPI>({
      message: t({
        en: 'Audit retrieved successfully',
        fr: 'Audit récupéré avec succès',
        es: 'Auditoría recuperada con éxito',
      }),
      description: t({
        en: 'The audit has been retrieved successfully',
        fr: "L'audit a été récupéré avec succès",
        es: 'La auditoría ha sido recuperada con éxito',
      }),
      data: audit.toJSON() as unknown as AuditAPI,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
