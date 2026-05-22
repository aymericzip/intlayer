import type { TranslatorProfileAPI } from '@intlayer/backend';
import { Container } from '@intlayer/design-system/container';
import { Clock, Globe, Star } from 'lucide-react';
import type { FC } from 'react';
import { Link } from '#components/Link/Link';

type TranslatorCardProps = {
  translator: TranslatorProfileAPI;
};

const StarRating: FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={14}
        className={
          star <= Math.round(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-neutral/30'
        }
      />
    ))}
    <span className="ml-1 text-neutral text-xs">({rating.toFixed(1)})</span>
  </div>
);

export const TranslatorCard: FC<TranslatorCardProps> = ({ translator }) => {
  const priceDisplay = `$${(translator.pricePerHour / 100).toFixed(0)}/hr`;

  return (
    <Link
      to={'/{-$locale}/translator-marketplace/$translatorId' as any}
      params={{ translatorId: translator.id } as any}
      color="text"
      label={(translator as any).name ?? 'Translator'}
      className="block"
    >
      <Container
        roundedSize="3xl"
        padding="xl"
        border
        borderColor="neutral"
        className="flex w-full flex-col gap-3 transition-colors hover:border-neutral/60"
      >
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral/20 font-semibold uppercase">
            {translator.mainPicture ? (
              <img
                src={translator.mainPicture}
                alt={(translator as any).name ?? 'Translator'}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{(translator as any).name?.[0] ?? '?'}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">
              {(translator as any).name ?? 'Translator'}
            </p>
            <StarRating rating={translator.averageRating} />
          </div>
          <span className="shrink-0 font-bold">{priceDisplay}</span>
        </div>

        {translator.bio && (
          <p className="line-clamp-2 text-neutral text-sm">{translator.bio}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {translator.languagePairs.slice(0, 4).map((pair) => (
            <span
              key={`${pair.from}-${pair.to}`}
              className="flex items-center gap-1 rounded-full border border-neutral/20 px-2 py-0.5 text-xs"
            >
              <Globe size={10} />
              {pair.from} → {pair.to}
            </span>
          ))}
          {translator.languagePairs.length > 4 && (
            <span className="rounded-full border border-neutral/20 px-2 py-0.5 text-xs">
              +{translator.languagePairs.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-neutral text-xs">
          <Clock size={12} />
          {translator.totalMissions} missions completed
        </div>
      </Container>
    </Link>
  );
};
