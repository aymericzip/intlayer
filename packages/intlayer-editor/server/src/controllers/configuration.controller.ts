import { getConfiguration as getApplicationConfiguration } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type GetConfigurationResult = ResponseData<IntlayerConfig>;

/**
 * Get the Intlayer configuration
 */
export const getConfiguration = async (
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const config = getApplicationConfiguration();

    const formattedResponse = formatResponse<IntlayerConfig>({
      data: config,
    });

    return res.send(formattedResponse);
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

    return res.send(formattedErrorResponse);
  }
};
