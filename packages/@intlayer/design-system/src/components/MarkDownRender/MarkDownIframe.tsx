'use client';

import { Button, ButtonSize, ButtonVariant } from '@components/Button';
import { Container } from '@components/Container';
import { Link } from '@components/Link';
import { Modal, ModalSize } from '@components/Modal';
import { cn } from '@utils/cn';
import { MoveDiagonal } from 'lucide-react';
import { type ComponentProps, type FC, useState } from 'react';

function embedLinkMeta(src: string | undefined): {
  href: string;
  label: string;
} {
  if (!src) return { href: '', label: '' };
  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src);
      return { href: url.href, label: url.host };
    } catch {
      return { href: src, label: src };
    }
  }
  return { href: src, label: src };
}

export const MarkDownIframe: FC<ComponentProps<'iframe'>> = (props) => {
  const { src, className, title, ...rest } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { href, label } = embedLinkMeta(src);

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="overflow-hidden p-0"
      gap="none"
    >
      <iframe
        {...rest}
        src={src}
        title={title}
        className={cn(
          'block max-h-[80vh] min-h-[12rem] w-full border-0',
          className
        )}
      />
      <div className="flex items-center justify-between gap-3 border-neutral/30 border-t bg-card/40 px-3 py-1">
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            label=""
            color="neutral"
            className="inline-flex min-w-0 max-w-[calc(100%-3rem)] items-center gap-2 text-neutral text-xs underline-offset-2 hover:text-text hover:underline"
          >
            {label}
          </Link>
        ) : (
          <span className="text-neutral text-sm">Embedded frame</span>
        )}
        <Button
          variant={ButtonVariant.HOVERABLE}
          size={ButtonSize.ICON_MD}
          onClick={() => setIsModalOpen(true)}
          label="Open embedded page in fullscreen"
          Icon={MoveDiagonal}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={ModalSize.UNSET}
        hasCloseButton
        isScrollable
        padding="sm"
      >
        {isModalOpen && src ? (
          <Container
            roundedSize="2xl"
            border
            borderColor="neutral"
            className="overflow-hidden p-0"
            gap="none"
          >
            <iframe
              {...rest}
              src={src}
              title={title ?? 'Embedded content'}
              allowFullScreen
              className="block min-h-[82vh] w-full border-0"
            />
          </Container>
        ) : null}
      </Modal>
    </Container>
  );
};
