import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useIsMounted, usePersistedStore } from '@intlayer/design-system/hooks';
import { App_ReviewerMarketplace_Path } from '@intlayer/design-system/routes';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

const STORAGE_KEY = 'isReviewerMarketplaceBannerClosed';

export const ReviewerMarketplaceBanner: FC = () => {
  const { reviewerMarketplace } = useIntlayer('dashboard-sidebar');
  // The key stores the dismissal, as its name says. It previously held
  // `isVisible`, so closing the banner persisted `false`, which the mount
  // effect then read as "not closed" and re-opened — the banner could never be
  // dismissed for good.
  const [isClosed, setIsClosed] = usePersistedStore(STORAGE_KEY, false);
  const isMounted = useIsMounted();

  // Stays hidden until mount: the server cannot know about a dismissal, and
  // rendering before `usePersistedStore` has read it back would flash a banner
  // the user already closed.
  if (!isMounted || isClosed) return <></>;

  return (
    <Container
      padding="md"
      background="none"
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="relative mb-8 flex flex-col gap-6"
    >
      <div className="absolute top-2 right-2">
        <Button
          label={reviewerMarketplace.label.value}
          color="neutral"
          variant="hoverable"
          size="icon-sm"
          Icon={X}
          onClick={() => setIsClosed(true)}
        />
      </div>
      <span className="text-neutral text-sm">
        {reviewerMarketplace.description}
      </span>
      <Link
        to={App_ReviewerMarketplace_Path}
        target="_blank"
        variant="button"
        color="text"
        size="sm"
        rel="noopener noreferrer"
        label={reviewerMarketplace.label.value}
        isExternalLink
      >
        {reviewerMarketplace.text}
      </Link>
    </Container>
  );
};
