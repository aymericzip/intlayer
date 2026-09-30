import { Container } from '@intlayer/design-system/container';
import { H4 } from '@intlayer/design-system/headers';
import type { ComponentProps, FC } from 'react';

export type SponsorProps = ComponentProps<'div'> & {
  /** First day the placement is shown, as `YYYY-MM-DD` (UTC). */
  startDate?: string;
  /** Day the placement stops being shown, as `YYYY-MM-DD` (UTC, exclusive). */
  endDate?: string;
};

/**
 * Whether a sponsored placement is live at `now`.
 *
 * A missing or unparsable bound leaves that side of the window open.
 */
export const isSponsorActive = (
  { startDate, endDate }: Pick<SponsorProps, 'startDate' | 'endDate'>,
  now: Date = new Date()
): boolean => {
  const currentTime = now.getTime();
  const startTime = startDate ? Date.parse(startDate) : Number.NaN;
  const endTime = endDate ? Date.parse(endDate) : Number.NaN;

  if (!Number.isNaN(startTime) && currentTime < startTime) return false;
  if (!Number.isNaN(endTime) && currentTime >= endTime) return false;

  return true;
};

/**
 * Sponsored block embedded in docs and blog posts (`<Sponsor>` markdown tag).
 * Renders nothing outside its `startDate` → `endDate` contract window.
 */
export const Sponsor: FC<SponsorProps> = ({
  startDate,
  endDate,
  children,
  ...props
}) => {
  if (!isSponsorActive({ startDate, endDate })) return null;

  return (
    <Container
      background="none"
      transparency="xs"
      border
      borderColor="neutral"
      padding="lg"
      roundedSize="2xl"
      {...props}
    >
      <H4 className="mb-4 text-text/80">Sponsor</H4>
      <div className="text-sm text-text/80">{children}</div>
    </Container>
  );
};
