import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { App_TranslatorMarketplace_Path } from '@intlayer/design-system/routes';
import { X } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

const STORAGE_KEY = 'isTranslatorMarketplaceBannerClosed';

export const TranslatorMarketplaceBanner: FC = () => {
  const { translatorMarketplace } = useIntlayer('dashboard-sidebar');
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
      className="relative mb-10 flex flex-col gap-6"
    >
      <div className="absolute top-2 right-2">
        <Button
          label={translatorMarketplace.label.value}
          color="neutral"
          variant="hoverable"
          size="icon-sm"
          Icon={X}
          onClick={() => setIsVisible(false)}
        />
      </div>
      <span className="text-neutral text-sm">
        {translatorMarketplace.description}
      </span>
      <Link
        to={App_TranslatorMarketplace_Path}
        target="_blank"
        variant="button"
        color="text"
        size="sm"
        rel="noopener noreferrer"
        label={translatorMarketplace.label.value}
        isExternalLink
      >
        {translatorMarketplace.text}
      </Link>
    </Container>
  );
};
