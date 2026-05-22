import type { TranslatorReviewAPI } from '@intlayer/backend';
import { Star } from 'lucide-react';
import type { FC } from 'react';

type TranslatorReviewsProps = {
  reviews: TranslatorReviewAPI[];
};

export const TranslatorReviews: FC<TranslatorReviewsProps> = ({ reviews }) => {
  if (reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 font-semibold">Reviews ({reviews.length})</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-border border-b pb-4 last:border-0"
          >
            <div className="mb-1 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }
                />
              ))}
            </div>
            {review.comment && (
              <p className="text-muted-foreground text-sm">{review.comment}</p>
            )}
            <p className="mt-1 text-muted-foreground text-xs">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
