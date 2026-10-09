import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { PushDictionariesProgress } from '@intlayer/design-system/dictionary-field-editor';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { Upload } from 'lucide-react';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import { usePushLocalDictionaries } from '../../../hooks/usePushLocalDictionaries';

export type PushDictionariesButtonProps = {
  /** Distinguishes the popovers when the button is rendered more than once. */
  identifier: string;
};

/**
 * Icon button pushing the application dictionaries to the CMS, as
 * `intlayer push` does, signing in first when signed out. Its popover follows
 * the push progress.
 */
export const PushDictionariesButton: FunctionComponent<
  PushDictionariesButtonProps
> = ({ identifier }) => {
  const content = useIntlayer('push-dictionaries-button');
  const {
    localDictionaries,
    missingDictionaries,
    push,
    isPushing,
    isAwaitingLogin,
    progress,
  } = usePushLocalDictionaries();

  if (localDictionaries.length === 0) return null;

  const hasFailedDictionaries = (progress?.failedKeys.length ?? 0) > 0;
  const isProgressVisible =
    !isAwaitingLogin && (isPushing || hasFailedDictionaries);

  return (
    <PopoverStatic identifier={identifier}>
      <Button
        label={content.label({ count: localDictionaries.length }).value}
        onClick={() => push(localDictionaries)}
        isLoading={isPushing}
        disabled={isPushing}
        variant="hoverable"
        color="text"
        size="icon-sm"
        Icon={Upload}
      />
      <PopoverStatic.Detail
        identifier={identifier}
        xAlign="end"
        // Stays open while pushing, to follow the progress
        isHidden={isPushing ? false : undefined}
      >
        <Container className="flex min-w-64 flex-col gap-2 p-3 text-sm">
          {isAwaitingLogin && <p>{content.awaitingLogin}</p>}
          {isProgressVisible && progress && (
            <PushDictionariesProgress progress={progress} />
          )}
          {!isAwaitingLogin && !isProgressVisible && (
            <>
              <p>{content.label({ count: localDictionaries.length })}</p>
              {missingDictionaries.length > 0 && (
                <p className="text-neutral">
                  {content.missingCount({
                    count: missingDictionaries.length,
                  })}
                </p>
              )}
            </>
          )}
        </Container>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
