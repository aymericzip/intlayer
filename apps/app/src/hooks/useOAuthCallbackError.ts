import { useToast } from '@intlayer/design-system/toaster';
import { useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { extractOAuthCallbackError } from '#utils/oAuthCallbackError.ts';

/** Error code better-auth sends when it refuses to link an existing user. */
const ACCOUNT_NOT_LINKED_CODE = 'account_not_linked';

/**
 * Displays the error a failed OAuth sign-in / account link left in the URL,
 * then removes it from the address bar. The error comes back through a
 * redirect, so no API response carries it.
 */
export const useOAuthCallbackError = (): void => {
  const { toast } = useToast();
  const content = useIntlayer('oauth-callback-error');

  useEffect(() => {
    const callbackError = extractOAuthCallbackError(window.location.href);

    if (!callbackError) return;

    window.history.replaceState(
      window.history.state,
      '',
      callbackError.cleanedUrl
    );

    toast({
      title: content.title,
      description:
        callbackError.code === ACCOUNT_NOT_LINKED_CODE
          ? content.accountNotLinked
          : content.generic({
              code: callbackError.description ?? callbackError.code,
            }),
      variant: 'error',
    });
  }, [toast, content]);
};
