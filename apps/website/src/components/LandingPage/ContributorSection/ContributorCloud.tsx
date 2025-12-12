'use client';

import { Link } from '@components/Link/Link';
import { Avatar, H2 } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  type CSSProperties,
  type FC,
  memo,
  type RefObject,
  useRef,
} from 'react';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions?: number;
  type?: string;
};

type ContributorCloudProps = {
  contributors: Contributor[];
  title: string;
  subtitle: string;
  seeAllLink: string;
  seeAllHref: string;
};

type ContributorAvatarProps = {
  contributor: Contributor;
  index: number;
  position: { x: number; y: number };
  dragConstraintsRef: RefObject<HTMLElement | null>;
};

const sizeVariants = [
  'size-10 md:size-12', // Medium
  'size-12 md:size-14', // Large (Biggest)
  'size-8 md:size-10', // Small (Smallest)
  'size-9 md:size-11', // Medium-Small
];

const getFloatDistance = (sizeIndex: number): string => {
  if (sizeIndex === 1) return '20px'; // Biggest
  if (sizeIndex === 2) return '8px'; // Smallest
  return '12px'; // Medium
};

const ContributorAvatar: FC<ContributorAvatarProps> = memo(
  ({ contributor, index, position, dragConstraintsRef }) => {
    // 0: Med, 1: Big, 2: Small, 3: Med-Small
    const sizeIndex = (index + contributor.login.length) % sizeVariants.length;
    const sizeClass = sizeVariants[sizeIndex];
    const floatDistance = getFloatDistance(sizeIndex);

    // Desync float animation using index and login hash for variety
    // Slower duration: 6s to 10.5s (50% slower)
    const floatDelay = (
      (index * 0.7 + contributor.login.length * 0.3) %
      5
    ).toFixed(2);
    const floatDuration = (6 + (index % 4) * 1.5).toFixed(1);

    return (
      <motion.div
        drag
        dragConstraints={dragConstraintsRef}
        dragMomentum
        dragElastic={0.05}
        dragTransition={{
          power: 0.2,
          timeConstant: 100,
          bounceStiffness: 300,
          bounceDamping: 50,
        }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
        whileHover={{ scale: 1.05, zIndex: 40 }}
        initial={{
          left: '15%',
          top: '50%',
          opacity: 0,
          scale: 0,
        }}
        animate={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.015,
          type: 'spring',
          stiffness: 120,
          damping: 18,
        }}
        className="absolute cursor-grab select-none"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Wrapper for CSS animation to avoid conflict with framer-motion drag transform */}
        <div className="-translate-x-1/2 -translate-y-1/2 transform">
          <div
            className="animate-float"
            style={
              {
                animationDelay: `${floatDelay}s`,
                animationDuration: `${floatDuration}s`,
                '--float-distance': floatDistance,
              } as CSSProperties
            }
          >
            <Avatar
              src={contributor.avatar_url}
              alt={contributor.login}
              className={`${sizeClass} pointer-events-none select-none border-2 border-background object-cover shadow-md transition-shadow hover:shadow-xl dark:border-neutral-800`}
            />
          </div>
        </div>
      </motion.div>
    );
  }
);

ContributorAvatar.displayName = 'ContributorAvatar';

// Generate cloud positions using Phyllotaxis (Sunflower) pattern
// Positioned on the left side (center at ~30% horizontally)
const generateCloudPositions = (count: number) => {
  const positions = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.399 radians (137.5 degrees)

  // Max radius - separate X and Y for elliptical distribution
  const maxRadiusX = 20;
  const maxRadiusY = 30;
  const cX = count > 1 ? maxRadiusX / Math.sqrt(count - 1) : 0;
  const cY = count > 1 ? maxRadiusY / Math.sqrt(count - 1) : 0;

  // Center at 30% horizontally (left side), 50% vertically
  const centerX = 30;
  const centerY = 50;

  for (let i = 0; i < count; i++) {
    const r = Math.sqrt(i);
    const angle = i * goldenAngle;

    const x = centerX + cX * r * Math.cos(angle);
    const y = centerY + cY * r * Math.sin(angle);

    positions.push({ x, y });
  }

  return positions;
};

export const ContributorCloud: FC<ContributorCloudProps> = ({
  contributors,
  title,
  subtitle,
  seeAllLink,
  seeAllHref,
}) => {
  const { isMobile } = useDevice();
  const positions = generateCloudPositions(contributors.length);
  const sectionRef = useRef<HTMLElement>(null);

  if (isMobile) {
    return <></>;
  }

  return (
    <section ref={sectionRef} className="relative mx-10 w-full py-20 md:py-32">
      <div className="pointer-events-none mx-auto max-w-7xl p-5 px-4 md:px-8 lg:px-16">
        <div className="flex min-h-40 flex-col gap-12 md:flex-row md:items-center">
          <div className="pointer-events-none relative flex-1">
            {/* Invisible spacer to maintain layout */}
          </div>

          <div className="pointer-events-auto relative z-0 flex-1 space-y-6">
            <H2 className="mb-3 font-bold text-3xl sm:text-4xl">{title}</H2>
            <p className="text-base text-neutral">{subtitle}</p>

            {/* Link to contributors page */}
            <Link
              href={seeAllHref}
              label={seeAllLink}
              color="text"
              variant="button"
              roundedSize="full"
              className="flex w-fit"
            >
              <span className="flex items-center gap-2">
                {seeAllLink}
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Avatars layer - positioned absolutely to allow dragging across entire section */}
      {contributors.map((contributor, index) => {
        const position = positions[index];
        if (!position) return null;

        return (
          <ContributorAvatar
            key={contributor.login}
            contributor={contributor}
            index={index}
            position={position}
            dragConstraintsRef={sectionRef}
          />
        );
      })}
    </section>
  );
};
