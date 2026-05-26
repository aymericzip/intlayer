import { Button } from '@intlayer/design-system/button';
import { useIntlayerOAuth } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';

export const AffiliateOnboarding: FC = () => {
  const content = useIntlayer('affiliate-onboarding');
  const intlayerOAuth = useIntlayerOAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const returnUrl = (() => {
        if (typeof window === 'undefined') return undefined;
        const url = new URL(window.location.href);
        url.searchParams.set('stripe_return', '1');
        return url.toString();
      })();
      const result = await intlayerOAuth.stripe.getAffiliateOnboardingLink(
        returnUrl ? { returnUrl } : undefined
      );
      const url = result.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) {
    return (
      <p className="text-error text-sm">
        {content.failedToLoadOnboardingPlease}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-neutral/60 text-sm">
        {content.completeYourPayoutSetup}
      </p>
      <p className="text-neutral/60 text-sm">
        {content.onceCompletedReturnHereAnd}
      </p>
      <Button
        label={content.completeOnboardingOnStripe.value}
        onClick={handleClick}
        isLoading={isLoading}
        color="text"
      >
        {content.completeOnboardingOnStripe}
      </Button>
    </div>
  );
};
