import {
  type IntlayerConfig,
  getConfiguration as getApplicationConfiguration,
} from '@intlayer/config';
import { type ResponseData, formatResponse } from '@utils/responseData';
import type { NextFunction, Request, Response } from 'express';

export type GetConfigurationResult = ResponseData<IntlayerConfig>;

/**
 * Get the Intlayer configuration
 */
export const getConfiguration = async (
  _req: Request,
  res: Response<GetConfigurationResult>,
  _next: NextFunction
): Promise<void> => {
  try {
    const config = getApplicationConfiguration();

    const formattedResponse = formatResponse<IntlayerConfig>({
      data: config,
    });

    res.json(formattedResponse);
    return;
  } catch (err) {
    const errorMessage = (err as { message?: string; status?: number }) ?? {
      message: 'Internal Server Error',
      status: 500,
    };

    const formattedErrorResponse = formatResponse<IntlayerConfig>({
      error: {
        message: errorMessage.message ?? 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR',
        title: 'Internal Server Error',
      },
      status: errorMessage.status ?? 500,
    });

    res.json(formattedErrorResponse);
    return;
  }
};
