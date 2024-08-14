'use client';

import { Container, MaxWidthSmoother } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import ProductHuntLogo from './product-hunt-logo.svg';

const VISIBLE_START_TIME = 3000;
const MINIATURIZING_END_TIME = 6000;

export const ProductHunt = () => {
  const { isMobile } = useDevice('sm');
  const [isVisible, setIsVisible] = useState(false);
  const [isMiniaturized, setIsMiniaturized] = useState(false);
  const { title, content, details } = useIntlayer('product-hunt');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMiniaturized(true);
    }, MINIATURIZING_END_TIME);

    return () => clearTimeout(timer);
  }, [isMobile, isVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, VISIBLE_START_TIME);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  const isMiniaturizable = !isMobile && isMiniaturized;

  return (
    <Container
      className={cn([
        'border-text dark:border-text-dark group fixed bottom-5 left-5 z-[100] mr-5 border-2 p-2 transition-all duration-500',
        'hover:translate-x-0 hover:translate-y-0 hover:scale-100',
        isMiniaturizable && '-translate-x-1/4 translate-y-1/4 scale-50',
      ])}
      roundedSize="2xl"
    >
      <Link
        href="https://www.producthunt.com/posts/intlayer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-intlayer"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-row gap-6 rounded-lg p-3">
          <div className="flex flex-col items-center gap-2 rounded-lg">
            <ProductHuntLogo className="size-[80px]" />
            <div className="flex flex-col items-center rounded-lg transition group-hover:scale-110">
              <span className="text-2xl tracking-widest">▲ 1</span>
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
              <span className="text-neutral dark:text-neutral-dark text-sm">
                {details}
              </span>
            </div>
          </MaxWidthSmoother>
        </div>
      </Link>
      <X
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        className="absolute right-2 top-2 cursor-pointer"
        size={25}
      />
    </Container>
  );
};
