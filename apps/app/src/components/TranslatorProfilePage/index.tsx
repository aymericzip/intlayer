import {
  useGetTranslatorById,
  useGetTranslatorReviews,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Clock, Globe, Star } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BookingModal } from './BookingModal';
import { TranslatorReviews } from './TranslatorReviews';

type TranslatorProfilePageProps = {
  translatorId: string;
};

export const TranslatorProfilePage: FC<TranslatorProfilePageProps> = ({
  translatorId,
}) => {
  const {
    translatorNotFound,
    fallbackName,
    reviewsCount,
    missionsCompleted,
    languagesTitle,
    perHourLabel,
    priceInfo,
    bookTranslatorButton,
  } = useIntlayer('translator-profile-page');
  const { data, isLoading } = useGetTranslatorById(translatorId);

  const { data: reviewsData } = useGetTranslatorReviews(translatorId);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const translator = data?.data ?? null;
  const reviews = reviewsData?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!translator) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        {translatorNotFound}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      {/* Cover picture */}
      {translator.coverPicture && (
        <div className="mb-6 h-48 w-full overflow-hidden rounded-2xl">
          <img
            src={translator.coverPicture}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Left column */}
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted font-bold text-2xl uppercase">
              {(translator as any).name?.[0] ?? '?'}
            </div>
            <div>
              <h1 className="font-bold text-2xl">
                {(translator as any).name ?? fallbackName}
              </h1>
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= Math.round(translator.averageRating)
                        ? 'fill-yellow-400'
                        : 'text-muted-foreground/30'
                    }
                  />
                ))}
                <span className="text-muted-foreground text-sm">
                  {translator.averageRating.toFixed(1)} ·{' '}
                  {translator.reviewCount} {reviewsCount}
                </span>
              </div>
            </div>
          </div>

          {translator.bio && (
            <p className="mt-4 text-muted-foreground">{translator.bio}</p>
          )}

          <div className="mt-4 flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {translator.totalMissions} {missionsCompleted}
            </span>
          </div>

          <div className="mt-4">
            <h2 className="mb-2 font-semibold">{languagesTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {translator.languagePairs.map((pair) => (
                <span
                  key={`${pair.from}-${pair.to}`}
                  className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm"
                >
                  <Globe size={12} />
                  {pair.from} → {pair.to}
                </span>
              ))}
            </div>
          </div>

          <TranslatorReviews reviews={reviews} />
        </div>

        {/* Booking card */}
        <aside className="w-full shrink-0 rounded-xl border border-border bg-card p-5 md:w-72">
          <div className="mb-4 text-center">
            <p className="font-bold text-3xl">
              ${(translator.pricePerHour / 100).toFixed(0)}
            </p>
            <p className="text-muted-foreground text-sm">{perHourLabel}</p>
            <p className="mt-1 text-muted-foreground text-xs">{priceInfo}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {bookTranslatorButton}
          </button>
        </aside>
      </div>

      {isBookingOpen && (
        <BookingModal
          translator={translator}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
};
