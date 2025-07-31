```ts
import configuration from "@intlayer/config/built";
import type { IntlayerConfig } from "@intlayer/config/client";
import type { createAuthClient } from "better-auth/client";

type AuthClient = ReturnType<typeof createAuthClient>;

export interface AuthAPI {
  signInEmail: AuthClient["signIn"]["email"];
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      "Backend URL is not defined in the Intlayer configuration."
    );
  }

  // Create a singleton auth client to avoid proxy issues
  let authClientInstance: AuthClient | null = null;

  const getAuthClient = async (): Promise<AuthClient> => {
    if (authClientInstance) {
      return authClientInstance;
    }

    try {
      const { createAuthClient } = await import("better-auth/client");

      authClientInstance = createAuthClient({
        baseURL: backendURL,
        withCredentials: true, // makes fetch forward cookies
      });

      return authClientInstance;
    } catch (error) {
      console.error("Failed to create auth client:", error);
      throw new Error(
        `Failed to create auth client: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const signInEmail: AuthClient["signIn"]["email"] = async (...args) => {
    const client = await getAuthClient();
    return client.signIn.email(...args);
  };

  return {
    signInEmail,
  };
};
```

here a version of the code that works well. it uses a static import of the auth client.

but i have to use a dynamic import to avoid CJS issues.

---

import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import type { createAuthClient } from 'better-auth/client';

type AuthClient = ReturnType<typeof createAuthClient>;

export interface AuthAPI {
signInEmail: AuthClient['signIn']['email'];
signUpEmail: AuthClient['signUp']['email'];
signOut: AuthClient['signOut'];
signInSocial: AuthClient['signIn']['social'];
linkSocial: AuthClient['linkSocial'];
changePasswordSession: AuthClient['changePassword'];
requestPasswordResetSession: AuthClient['requestPasswordReset'];
resetPassword: AuthClient['resetPassword'];
verifyEmailSession: AuthClient['verifyEmail'];
getSession: AuthClient['getSession'];
forgetPassword: AuthClient['forgetPassword'];
sendVerificationEmail: AuthClient['sendVerificationEmail'];
changeEmail: AuthClient['changeEmail'];
deleteUser: AuthClient['deleteUser'];
revokeSession: AuthClient['revokeSession'];
revokeSessions: AuthClient['revokeSessions'];
revokeOtherSessions: AuthClient['revokeOtherSessions'];
listAccounts: AuthClient['listAccounts'];
unlinkAccount: AuthClient['unlinkAccount'];
refreshToken: AuthClient['refreshToken'];
getAccessToken: AuthClient['getAccessToken'];
accountInfo: AuthClient['accountInfo'];
updateUser: AuthClient['updateUser'];
listSessions: AuthClient['listSessions'];
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
const backendURL =
intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

if (!backendURL) {
throw new Error(
'Backend URL is not defined in the Intlayer configuration.'
);
}

// Create a singleton auth client to avoid proxy issues
let authClientInstance: AuthClient | null = null;

const getAuthClient = async (): Promise<AuthClient> => {
if (authClientInstance) {
return authClientInstance;
}

    try {
      const { createAuthClient } = await import('better-auth/client');

      authClientInstance = createAuthClient({
        baseURL: backendURL,
        withCredentials: true, // makes fetch forward cookies
      });

      return authClientInstance;
    } catch (error) {
      console.error('Failed to create auth client:', error);
      throw new Error(
        `Failed to create auth client: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

};

const signInEmail: AuthClient['signIn']['email'] = async (...args) => {
const client = await getAuthClient();
return client.signIn.email(...args);
};

const signInSocial: AuthClient['signIn']['social'] = async (...args) => {
const client = await getAuthClient();
return client.signIn.social(...args);
};

const signUpEmail: AuthClient['signUp']['email'] = async (...args) => {
const client = await getAuthClient();
return client.signUp.email(...args);
};

const signOut: AuthClient['signOut'] = async (...args) => {
const client = await getAuthClient();
return client.signOut(...args);
};

const changePasswordSession: AuthClient['changePassword'] = async (
...args
) => {
const client = await getAuthClient();
return client.changePassword(...args);
};

const requestPasswordResetSession: AuthClient['requestPasswordReset'] =
async (...args) => {
const client = await getAuthClient();
return client.requestPasswordReset(...args);
};

// @ts-expect-error - resetPassword is not typed
const resetPassword: AuthClient['resetPassword'] = async (...args) => {
const client = await getAuthClient();
return client.resetPassword(...args);
};

const verifyEmailSession: AuthClient['verifyEmail'] = async (...args) => {
const client = await getAuthClient();
return client.verifyEmail(...args);
};

const getSession: AuthClient['getSession'] = async (...args) => {
const client = await getAuthClient();
return client.getSession(...args);
};

const forgetPassword: AuthClient['forgetPassword'] = async (...args) => {
const client = await getAuthClient();
return client.forgetPassword(...args);
};

const sendVerificationEmail: AuthClient['sendVerificationEmail'] = async (
...args
) => {
const client = await getAuthClient();
return client.sendVerificationEmail(...args);
};

const changeEmail: AuthClient['changeEmail'] = async (...args) => {
const client = await getAuthClient();
return client.changeEmail(...args);
};

// @ts-expect-error - deleteUser is not typed
const deleteUser: AuthClient['deleteUser'] = async (...args) => {
const client = await getAuthClient();
return client.deleteUser(...args);
};

const revokeSession: AuthClient['revokeSession'] = async (...args) => {
const client = await getAuthClient();
return client.revokeSession(...args);
};

const revokeSessions: AuthClient['revokeSessions'] = async (...args) => {
const client = await getAuthClient();
return client.revokeSessions(...args);
};

const revokeOtherSessions: AuthClient['revokeOtherSessions'] = async (
...args
) => {
const client = await getAuthClient();
return client.revokeOtherSessions(...args);
};

const linkSocial: AuthClient['linkSocial'] = async (...args) => {
const client = await getAuthClient();
return client.linkSocial(...args);
};

const listAccounts: AuthClient['listAccounts'] = async (...args) => {
const client = await getAuthClient();
return client.listAccounts(...args);
};

const unlinkAccount: AuthClient['unlinkAccount'] = async (...args) => {
const client = await getAuthClient();
return client.unlinkAccount(...args);
};

const refreshToken: AuthClient['refreshToken'] = async (...args) => {
const client = await getAuthClient();
return client.refreshToken(...args);
};

const getAccessToken: AuthClient['getAccessToken'] = async (...args) => {
const client = await getAuthClient();
return client.getAccessToken(...args);
};

const accountInfo: AuthClient['accountInfo'] = async (...args) => {
const client = await getAuthClient();
return client.accountInfo(...args);
};

const updateUser: AuthClient['updateUser'] = async (...args) => {
const client = await getAuthClient();
return client.updateUser(...args);
};

const listSessions: AuthClient['listSessions'] = async (...args) => {
const client = await getAuthClient();
return client.listSessions(...args);
};

return {
signInEmail,
signUpEmail,
signOut,
signInSocial,
linkSocial,
changePasswordSession,
requestPasswordResetSession,
resetPassword,
verifyEmailSession,
getSession,
forgetPassword,
sendVerificationEmail,
changeEmail,
deleteUser,
revokeSession,
revokeSessions,
revokeOtherSessions,
listAccounts,
unlinkAccount,
refreshToken,
getAccessToken,
accountInfo,
updateUser,
listSessions,
};
};

under the hood, better-auth uses a proxy that blocks the way to access the then method of the auth client when it got called in a promise.

here the code of better-auth.

i cannot modify the code of better-auth.

```ts
import { getClientConfig } from "./config";
import { capitalizeFirstLetter } from "../utils/misc";
import type {
  BetterAuthClientPlugin,
  ClientOptions,
  InferActions,
  InferClientAPI,
  InferErrorCodes,
  IsSignal,
} from "./types";
import { createDynamicPathProxy } from "./proxy";
import type { PrettifyDeep, UnionToIntersection } from "../types/helper";
import type { Atom } from "nanostores";
import type {
  BetterFetchError,
  BetterFetchResponse,
} from "@better-fetch/fetch";
import type { BASE_ERROR_CODES } from "../error/codes";

type InferResolvedHooks<O extends ClientOptions> =
  O["plugins"] extends Array<infer Plugin>
    ? Plugin extends BetterAuthClientPlugin
      ? Plugin["getAtoms"] extends (fetch: any) => infer Atoms
        ? Atoms extends Record<string, any>
          ? {
              [key in keyof Atoms as IsSignal<key> extends true
                ? never
                : key extends string
                  ? `use${Capitalize<key>}`
                  : never]: Atoms[key];
            }
          : {}
        : {}
      : {}
    : {};

export function createAuthClient<Option extends ClientOptions>(
  options?: Option
) {
  const {
    pluginPathMethods,
    pluginsActions,
    pluginsAtoms,
    $fetch,
    atomListeners,
    $store,
  } = getClientConfig(options);
  let resolvedHooks: Record<string, any> = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[`use${capitalizeFirstLetter(key)}`] = value;
  }
  const routes = {
    ...pluginsActions,
    ...resolvedHooks,
    $fetch,
    $store,
  };
  const proxy = createDynamicPathProxy(
    routes,
    $fetch,
    pluginPathMethods,
    pluginsAtoms,
    atomListeners
  );
  type ClientAPI = InferClientAPI<Option>;
  type Session = ClientAPI extends {
    getSession: () => Promise<infer Res>;
  }
    ? Res extends BetterFetchResponse<infer S>
      ? S
      : Res extends Record<string, any>
        ? Res
        : never
    : never;
  return proxy as UnionToIntersection<InferResolvedHooks<Option>> &
    ClientAPI &
    InferActions<Option> & {
      useSession: Atom<{
        data: Session;
        error: BetterFetchError | null;
        isPending: boolean;
      }>;
      $fetch: typeof $fetch;
      $store: typeof $store;
      $Infer: {
        Session: NonNullable<Session>;
      };
      $ERROR_CODES: PrettifyDeep<
        InferErrorCodes<Option> & typeof BASE_ERROR_CODES
      >;
    };
}
```

the following code is the code i want to fix using the dynamic import.

```ts
import configuration from "@intlayer/config/built";
import type { IntlayerConfig } from "@intlayer/config/client";
import type { createAuthClient } from "better-auth/client";

type AuthClient = ReturnType<typeof createAuthClient>;

export interface AuthAPI {
  signInEmail: AuthClient["signIn"]["email"];
}

export const getAuthAPI = (intlayerConfig?: IntlayerConfig): AuthAPI => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      "Backend URL is not defined in the Intlayer configuration."
    );
  }

  // Create a singleton auth client to avoid proxy issues
  let authClientInstance: AuthClient | null = null;

  const getAuthClient = async (): Promise<AuthClient> => {
    if (authClientInstance) {
      return authClientInstance;
    }

    try {
      const { createAuthClient } = await import("better-auth/client");

      authClientInstance = createAuthClient({
        baseURL: backendURL,
        withCredentials: true, // makes fetch forward cookies
      });

      return authClientInstance;
    } catch (error) {
      console.error("Failed to create auth client:", error);
      throw new Error(
        `Failed to create auth client: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const signInEmail: AuthClient["signIn"]["email"] = async (...args) => {
    const client = await getAuthClient();

    return client.signIn.email(...args);
  };

  return {
    signInEmail,
  };
};
```

when it got called this way, it lead to an error http://localhost:3100/api/auth/then 404 (Not Found) on the console
the then path should not be here and is inserted because of the awat function.

add a fix to avoid this issue.
