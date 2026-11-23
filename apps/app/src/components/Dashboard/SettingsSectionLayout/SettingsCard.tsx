import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { cn } from '@intlayer/design-system/utils';
import { Trash, TriangleAlert } from 'lucide-react';
import type { FC, PropsWithChildren, ReactNode } from 'react';

type SettingsCardProps = PropsWithChildren<{ className?: string }>;

/** Bordered card wrapping one settings form. */
export const SettingsCard: FC<SettingsCardProps> = ({
  children,
  className,
}) => (
  <Container
    roundedSize="3xl"
    padding="md"
    border
    borderColor="neutral"
    className={cn('flex w-full min-w-0 justify-center', className)}
  >
    {children}
  </Container>
);

type DangerZoneCardProps = PropsWithChildren<{
  title: ReactNode;
  description: ReactNode;
  buttonLabel: string;
  buttonText: ReactNode;
  onDelete: () => void;
}>;

/**
 * Destructive-action card (delete project / organization). `children` hosts
 * the confirmation modal.
 */
export const DangerZoneCard: FC<DangerZoneCardProps> = ({
  title,
  description,
  buttonLabel,
  buttonText,
  onDelete,
  children,
}) => (
  <Container
    roundedSize="3xl"
    padding="lg"
    border
    borderColor="error"
    transparency="lg"
    className="w-full"
  >
    {children}
    <div className="flex items-start gap-6 px-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error/10">
        <TriangleAlert className="size-5 text-error" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-medium text-error">{title}</h3>
        <p className="mt-1 text-sm text-neutral">{description}</p>
        <Button
          color="error"
          label={buttonLabel}
          variant="outline"
          onClick={onDelete}
          Icon={Trash}
          className="mt-4"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  </Container>
);
