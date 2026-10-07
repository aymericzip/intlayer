import { getConfiguration } from '@intlayer/config/node';
import {
  type EditorAuth,
  isEditorLoginPending,
  logoutEditor,
  resolveEditorAuth,
  startEditorLogin,
} from '@services/editorAuth.service';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type GetEditorAuthResultData = {
  /** `null` when neither a login session nor an access key is available. */
  auth: EditorAuth | null;
  isLoginPending: boolean;
};
export type GetEditorAuthResult = ResponseData<GetEditorAuthResultData>;

export type StartEditorLoginResult = ResponseData<{ isLoginPending: boolean }>;

export type LogoutEditorResult = ResponseData<GetEditorAuthResultData>;

const envFileOptions = {
  env: process.env.NODE_ENV,
  envFile: process.env.ENV_FILE,
};

/** Host of an `Origin` header, `null` for an opaque origin (`null`). */
const getOriginHost = (origin: string): string | null => {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
};

/**
 * Rejects cross-site requests. The editor answers CORS with `*`, so without
 * this guard any page open in the browser could read the bearer token from
 * the local editor or trigger a login.
 */
export const assertSameOrigin = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const fetchSite = request.headers['sec-fetch-site'];
  const { origin, host } = request.headers;

  const isCrossSiteFetch =
    typeof fetchSite === 'string' &&
    fetchSite !== 'same-origin' &&
    fetchSite !== 'none';

  const isForeignOrigin =
    typeof origin === 'string' && getOriginHost(origin) !== host;

  if (!isCrossSiteFetch && !isForeignOrigin) return;

  return reply.status(HttpStatusCodes.FORBIDDEN_403).send(
    formatResponse<null>({
      error: {
        code: 'FORBIDDEN_ORIGIN',
        title: 'Forbidden',
        message: 'The editor authentication is only available to the editor.',
      },
      status: HttpStatusCodes.FORBIDDEN_403,
    })
  );
};

/**
 * Returns the CMS identity the editor client should use as bearer token.
 */
export const getEditorAuth = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const auth = await resolveEditorAuth(getConfiguration(envFileOptions));

  return reply.send(
    formatResponse<GetEditorAuthResultData>({
      data: { auth, isLoginPending: isEditorLoginPending() },
    })
  );
};

/**
 * Opens the CMS login page in the browser, as `intlayer login` does. Answers
 * right away: the client polls {@link getEditorAuth} until the login lands.
 */
export const startLogin = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  startEditorLogin(getConfiguration(envFileOptions), envFileOptions).catch(
    (error) => console.error(error)
  );

  return reply.send(
    formatResponse<{ isLoginPending: boolean }>({
      data: { isLoginPending: true },
      status: HttpStatusCodes.ACCEPTED_202,
    })
  );
};

/**
 * Signs the editor out of its `intlayer login` session, then returns the
 * identity left: the configured access key, if any.
 */
export const logout = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const configuration = getConfiguration(envFileOptions);

  await logoutEditor(configuration);

  const auth = await resolveEditorAuth(configuration);

  return reply.send(
    formatResponse<GetEditorAuthResultData>({
      data: { auth, isLoginPending: isEditorLoginPending() },
    })
  );
};
