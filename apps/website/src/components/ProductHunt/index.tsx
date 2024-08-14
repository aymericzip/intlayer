'use client';

import { Container, MaxWidthSmoother } from '@intlayer/design-system';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import ProductHuntLogo from './product-hunt-logo.svg';

const MINIATURIZING_TIME = 8000;

export const ProductHunt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMiniaturized, setIsMiniaturized] = useState(false);
  const { title, content, details } = useIntlayer('product-hunt');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMiniaturized(true);
    }, MINIATURIZING_TIME);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Container
      className="border-text group fixed bottom-5 left-5 z-[100] border-2 p-2"
      roundedSize="2xl"
    >
      <Link
        href="https://www.producthunt.com/posts/intlayer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-intlayer"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-row gap-6 rounded-lg p-3 ">
          <div className="flex flex-col items-center gap-2 rounded-lg">
            <ProductHuntLogo className="size-[80px]" />
            <div className="flex flex-col items-center rounded-lg transition group-hover:scale-110">
              <span className="text-2xl tracking-widest">▲ 1</span>
              <span className="text-sm">Upvote</span>
            </div>
          </div>
          <MaxWidthSmoother
            isHidden={isMiniaturized}
            className="group-hover:grid-cols-[1fr]"
          >
            <div className="flex w-72 flex-col gap-2 overflow-hidden rounded-lg">
              <strong className="text-xl uppercase">{title}</strong>
              <span>{content}</span>
              <span className="text-neutral dark:text-neutral text-sm">
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
