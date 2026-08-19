import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { MarkDownIframe } from '@intlayer/design-system/mark-down-render';
import { Eye } from 'lucide-react';
import { type ComponentProps, type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

export const ClickToOpenIframe: FC<ComponentProps<'iframe'>> = ({
  src,
  title,
  ...rest
}) => {
  const content = useIntlayer('click-to-open-iframe');

  const [isShown, setIsShown] = useState(false);

  if (isShown) return <MarkDownIframe src={src} title={title} {...rest} />;

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      gap="none"
      className="relative flex min-h-[12rem] items-center justify-center overflow-hidden bg-text/10"
    >
      {/*
       * The frame is mounted only once asked for. Rendering it behind the
       * overlay would defeat the point of the overlay: the embed — and every
       * request it makes — would still be paid for on load.
       */}
      <Button
        color="text-inverse"
        size="md"
        label={content.openIframe.value}
        Icon={Eye}
        onClick={() => setIsShown(true)}
      >
        {content.openIframe}
      </Button>
    </Container>
  );
};
