import { Button } from '@intlayer/design-system/button';
import { Sparkles } from 'lucide-react';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type { PageDetectionResult } from '../../detector/types';
import { getShowcaseSubmitUrl } from '../../showcase/getShowcaseSubmitUrl';

/** Invites the user to submit a site built with Intlayer to the showcase. */
export const ShowcaseSuggestion: FunctionComponent<{
  detection: PageDetectionResult;
}> = ({ detection }) => {
  const { title, description, submitButton } = useIntlayer(
    'showcase-suggestion'
  );

  const openSubmitPage = (): void => {
    void chrome.tabs.create({
      url: getShowcaseSubmitUrl(detection.url, detection.siteName),
    });
  };

  return (
    <section className="rounded-xl border border-text/10 bg-card px-3 py-2.5">
      <h2 className="mt-0 mb-1 text-sm font-semibold">{title}</h2>
      <p className="mt-0 mb-2.5 text-xs text-neutral">{description}</p>
      <Button
        label={submitButton.value}
        Icon={Sparkles}
        isFullWidth
        onClick={openSubmitPage}
      >
        {submitButton}
      </Button>
    </section>
  );
};
