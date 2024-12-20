import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import * as audit from '@utils/audit';
import { AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request } from 'express';

export type AuditFileParams = {
  openAiApiKey?: string;
  customPrompt?: string;
  locales: string[];
  defaultLocale: string;
  fileContent: string;
  filePath?: string;
  model?: string;
};
export type AuditFileResult = ResponseData<audit.AuditFileResultData>;

/**
 * Retrieves a list of dictionaries based on filters and pagination.
 */
export const auditFile = async (
  req: Request<AuditFileParams>,
  res: ResponseWithInformation<AuditFileResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const {
    fileContent,
    filePath,
    openAiApiKey,
    customPrompt,
    model,
    locales,
    defaultLocale,
  } = req.body;

  if (!openAiApiKey) {
    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
      return;
    }
    if (!project) {
      ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_DEFINED');
      return;
    }
  }

  try {
    const auditResponse = await audit.auditFile({
      fileContent,
      filePath,
      model,
      openAiApiKey: openAiApiKey ?? process.env.OPENAI_API_KEY,
      customPrompt,
      locales,
      defaultLocale,
    });

    if (!auditResponse) {
      ErrorHandler.handleGenericErrorResponse(res, 'AUDIT_FAILED');
      return;
    }

    const responseData = formatResponse<audit.AuditFileResultData>({
      data: auditResponse,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
