import {
  getConfiguration as getApplicationConfiguration,
  IntlayerConfig,
} from '@intlayer/config';
import { formatResponse, ResponseData } from '@utils/responseData';
import type { NextFunction, Request, Response } from 'express';

export type GetConfigurationResult = ResponseData<IntlayerConfig>;

/**
 * Get the Intlayer configuration
 */
export const getConfiguration = async (
  req: Request,
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
    const errorMessage =
      (err as { message?: string; status?: number }) ?? 'Internal Server Error';

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
