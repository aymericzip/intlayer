'use client';

import { Link } from '@components/Link/Link';
import {
  Button,
  Container,
  MaxWidthSmoother,
  ProductHuntLogo,
} from '@intlayer/design-system';
import {
  useAsync,
  useDevice,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { X } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { FC, useEffect, useState } from 'react';

const VISIBLE_START_TIME = 3000;
const MINIATURIZING_END_TIME = 6000;
const MIN_COUNT_TO_SHOW_ONE = 5;
const PRODUCT_HUNT_SLUG = 'intlayer-i18n-cms-for-react-now-vue';

const fetchUpvotes = async () => {
  try {
    const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRODUCTHUNT_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query {
            post(slug: "${PRODUCT_HUNT_SLUG}") {
              votesCount
            }
          }
        `,
      }),
    });
    const data = await response.json();
    if (data.data?.post?.votesCount) {
      return data.data.post.votesCount;
    }
    return null;
  } catch (error) {
    console.error('Error fetching ProductHunt upvotes:', error);
    return null;
  }
};

export const ProductHunt: FC = () => {
  const { isMobile } = useDevice('sm');
  const [isVisible, setIsVisible] = usePersistedStore<boolean | null>(
    `product-hunt-visible+${PRODUCT_HUNT_SLUG}`,
    null
  );
  const [isMiniaturized, setIsMiniaturized] = useState(false);
  const { data: upvotes, isLoading } = useAsync(
    'product-hunt-upvotes',
    fetchUpvotes,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
    }
  );
  const { title, content, details, linkLabel, closeLabel } =
    useIntlayer('product-hunt');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMiniaturized(true);
    }, MINIATURIZING_END_TIME);

    return () => clearTimeout(timer);
  }, [isMobile, isVisible]);

  useEffect(() => {
    if (isVisible !== null) return;

    const timer = setTimeout(() => {
      if (isVisible !== null) return;

      setIsVisible(true);
    }, VISIBLE_START_TIME);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const isMiniaturizable = !isMobile && isMiniaturized;

  return (
    <Container
      className={cn([
        'border-text group fixed bottom-5 left-5 z-[100] mr-5 border-[2px] p-2 transition-all duration-500',
        'hover:translate-x-0 hover:translate-y-0 hover:scale-100',
        isMiniaturizable && '-translate-x-1/4 translate-y-1/4 scale-50',
        !isVisible && '!-translate-x-[120%]',
      ])}
      roundedSize="2xl"
    >
      <Link
        href="https://www.producthunt.com/posts/intlayer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-intlayer"
        label={linkLabel.value}
        color="custom"
        className="!no-underline"
      >
        <div className="flex flex-row gap-6 rounded-lg p-3">
          <div className="flex flex-col items-center gap-2 rounded-lg">
            <ProductHuntLogo className="size-[80px]" />
            <div className="flex flex-col items-center rounded-lg transition group-hover:scale-110">
              <span className="text-2xl tracking-widest">
                ▲{' '}
                {isLoading
                  ? '-'
                  : upvotes > MIN_COUNT_TO_SHOW_ONE
                    ? upvotes
                    : null}
              </span>
              <span className="text-sm">Upvote</span>
            </div>
          </div>
          <MaxWidthSmoother
            isHidden={isMiniaturizable}
            className="max-md:grid-cols-[1fr]! group-hover:grid-cols-[1fr]"
          >
            <div className="flex w-72 flex-col gap-2 overflow-hidden rounded-lg">
              <strong className="text-xl uppercase">{title}</strong>
              <span>{content}</span>
              <span className="text-neutral text-sm">{details}</span>
            </div>
          </MaxWidthSmoother>
        </div>
      </Link>
      <Button
        Icon={X}
        label={closeLabel.value}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsVisible(false);
        }}
        color="text"
        variant="hoverable"
        className="!absolute right-2 top-2 cursor-pointer"
        size="icon-md"
      />
    </Container>
  );
};
