import {} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { App_ReviewerMarketplace_Path } from '@intlayer/design-system/routes';
import { X } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

const STORAGE_KEY = 'isReviewerMarketplaceBannerClosed';

export const ReviewerMarketplaceBanner: FC = () => {
  const { reviewerMarketplace } = useIntlayer('dashboard-sidebar');
  const [isVisible, setIsVisible] = usePersistedStore(STORAGE_KEY, false);

  useEffect(() => {
    const isClosed = localStorage.getItem(STORAGE_KEY) === 'true';
    if (!isClosed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return <></>;

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
          onClick={() => setIsVisible(false)}
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
