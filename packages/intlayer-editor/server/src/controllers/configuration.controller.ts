import { IS_ENABLED } from '@intlayer/config/defaultValues';
import { getConfigurationAndFilePath } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type EditorServerConfiguration = IntlayerConfig & {
  /**
   * `editor.enabled` as set in the application configuration. The editor
   * server forces `editor.enabled` on in its own process, so it cannot tell.
   */
  isApplicationEditorEnabled: boolean;
};

export type GetConfigurationResult = ResponseData<EditorServerConfiguration>;

/**
 * Get the Intlayer configuration
 */
export const getConfiguration = async (
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const { configuration: config, customConfiguration } =
      getConfigurationAndFilePath();

    // The client secret never leaves the server: the client authenticates
    // with the short-lived token served by the auth routes.
    const { clientSecret: _clientSecret, ...editor } = config.editor;

    const formattedResponse = formatResponse<EditorServerConfiguration>({
      data: {
        ...config,
        editor,
        isApplicationEditorEnabled:
          customConfiguration?.editor?.enabled ?? IS_ENABLED,
      },
    });

    return res.send(formattedResponse);
  } catch (err) {
    const errorMessage = (err as { message?: string; status?: number }) ?? {
      message: 'Internal Server Error',
      status: 500,
    };

    const formattedErrorResponse = formatResponse<EditorServerConfiguration>({
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
