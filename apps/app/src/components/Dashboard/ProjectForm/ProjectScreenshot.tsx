import { useRegenerateProjectScreenshot } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { ImageOff, RefreshCw } from 'lucide-react';
import { type FC, type ReactNode, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

export interface ProjectScreenshotProps {
  /** Public URL of the stored screenshot. */
  imageUrl: string;
  /** Project name, used for the alt text. */
  projectName: string;
  /** Whether the viewer may regenerate the screenshot. */
  canRegenerate: boolean;
  /** Site URL the screenshot was captured from; makes the image a link to it. */
  applicationURL?: string;
}

/**
 * Opens the project site in a new tab when a URL is known, otherwise renders
 * the children as is.
 */
export const ScreenshotLink: FC<{ href?: string; children: ReactNode }> = ({
  href,
  children,
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-opacity hover:opacity-90"
    >
      {children}
    </a>
  ) : (
    children
  );

/**
 * Project screenshot. When the image fails to load (e.g. a 404 from storage),
 * shows a placeholder with a button to capture the application URL again.
 */
export const ProjectScreenshot: FC<ProjectScreenshotProps> = ({
  imageUrl,
  projectName,
  canRegenerate,
  applicationURL,
}) => {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const { mutate: regenerateScreenshot, isPending: isRegenerating } =
    useRegenerateProjectScreenshot();
  const { screenshotUnavailable, regenerateScreenshotButton } =
    useIntlayer('project-form');

  // A new URL (after regeneration) gets a fresh load attempt
  const hasLoadFailed = failedImageUrl === imageUrl;

  return (
    <Container
      className="aspect-video w-full max-w-70 shrink-0 overflow-hidden"
      roundedSize="xl"
      background="none"
      border
      borderColor="neutral"
    >
      {hasLoadFailed ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-text/5 p-3">
          <ImageOff className="size-6 text-neutral" aria-hidden />
          <span className="text-xs text-neutral">{screenshotUnavailable}</span>
          {canRegenerate && (
            <Button
              label={regenerateScreenshotButton.ariaLabel.value}
              variant="outline"
              color="text"
              size="sm"
              Icon={RefreshCw}
              isLoading={isRegenerating}
              disabled={isRegenerating}
              onClick={() => regenerateScreenshot()}
            >
              {regenerateScreenshotButton.text}
            </Button>
          )}
        </div>
      ) : (
        <ScreenshotLink href={applicationURL}>
          <img
            src={imageUrl}
            alt={`${projectName} screenshot`}
            width={1280}
            height={720}
            crossOrigin="anonymous"
            className="aspect-video w-full object-cover"
            onError={() => setFailedImageUrl(imageUrl)}
          />
        </ScreenshotLink>
      )}
    </Container>
  );
};
