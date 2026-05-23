import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useGetReviewerById } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ReviewerProfileCard } from '#components/ReviewerDashboardPage/ReviewerProfileCard';
import { BookingModal } from './BookingModal';
import { ContactChat } from './ContactChat';

type ReviewerProfilePageProps = {
  reviewerId: string;
};

export const ReviewerProfilePage: FC<ReviewerProfilePageProps> = ({
  reviewerId,
}) => {
  const content = useIntlayer('reviewer-profile-page');
  const { data, isLoading } = useGetReviewerById(reviewerId);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const reviewer = data?.data ?? null;

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!reviewer) {
    return (
      <div className="py-24 text-center text-neutral">
        {content.reviewerNotFound}
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-1 flex-col-reverse md:flex-col lg:flex-row">
        {/* Chat — centered inside max-w-4xl */}
        <div className="mx-auto flex size-full max-w-4xl flex-1 flex-col px-4 py-12">
          <ContactChat reviewer={reviewer} />
        </div>

        {/* Profile + pricing — top on mobile, right col on desktop (outside max-w-4xl) */}
        <aside className="sticky top-20 flex flex-col gap-6 self-start px-4 pt-12 pb-6 md:w-1/3 md:max-w-xl lg:order-last">
          <ReviewerProfileCard profile={reviewer} size="lg" />
          <Container
            border
            borderColor="neutral"
            padding="md"
            roundedSize="2xl"
          >
            <div className="mb-4 text-center">
              <p className="font-bold text-3xl">
                ~${(reviewer.pricePerHour / 100).toFixed(0)}
              </p>
              <p className="text-neutral text-sm" aria-hidden="true">
                {content.perHourLabel}
              </p>
              <p className="mt-1 text-neutral text-xs">{content.priceInfo}</p>
            </div>

            <Button
              type="button"
              color="text"
              onClick={() => setIsBookingOpen(true)}
              isFullWidth
              label={`${content.bookButtonPrefix.value} ${reviewer.name ?? content.fallbackName.value}`}
            >
              {content.bookReviewerButton}
            </Button>
          </Container>
        </aside>
      </div>

      <BookingModal
        reviewer={reviewer}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};
