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

  let label = src ?? '';
  try {
    if (src) label = new URL(src).href;
  } catch {
    // keep src as label
  }

  return isShown ? (
    <MarkDownIframe src={src} title={title} {...rest} />
  ) : (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      gap="none"
      className="relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 z-10 flex size-full size-full cursor-pointer items-center justify-center bg-text/10 backdrop-blur"
        role="button"
        tabIndex={0}
        onClick={() => setIsShown(true)}
        onKeyDown={(e) => e.key === content.enter.value && setIsShown(true)}
      >
        <Button
          color="text-inverse"
          size="md"
          label={content.openIframe.value}
          Icon={Eye}
          onClick={(e) => {
            e.stopPropagation();
            setIsShown(true);
          }}
        >
          {content.openIframe}
        </Button>
      </div>
      <MarkDownIframe src={src} title={title} {...rest} />
    </Container>
  );
};
