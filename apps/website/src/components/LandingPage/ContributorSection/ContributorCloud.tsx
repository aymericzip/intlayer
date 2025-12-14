'use client';

import { Link } from '@components/Link/Link';
import { Avatar, DiscordLogo, H2 } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import {
  type CSSProperties,
  type FC,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ExternalLinks, PagesRoutes } from '@/Routes';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions?: number;
  type?: string;
};

type ContributorCloudProps = {
  contributors: Contributor[];
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

// Z-index for 3D effect: bigger avatars (closer) in front, smaller avatars (further) behind
const getZIndex = (sizeIndex: number): number => {
  switch (sizeIndex) {
    case 1:
      return 30; // Biggest -> front
    case 0:
      return 20; // Medium
    case 3:
      return 15; // Medium-Small
    case 2:
      return 10; // Smallest -> back
    default:
      return 10;
  }
};

const ContributorAvatar: FC<ContributorAvatarProps> = ({
  contributor,
  index,
  position,
  dragConstraintsRef,
}) => {
  const sizeIndex = (index + contributor.login.length) % sizeVariants.length;
  const sizeClass = sizeVariants[sizeIndex];
  const floatDistance = getFloatDistance(sizeIndex);
  const zIndex = getZIndex(sizeIndex);

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
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity: 0,
        scale: 0,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.015,
        type: 'spring',
        stiffness: 120,
        damping: 18,
      }}
      className="absolute cursor-grab select-none"
      style={{ zIndex }}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <Avatar
        src={contributor.avatar_url}
        alt={contributor.login}
        style={
          {
            animationDelay: `${floatDelay}s`,
            animationDuration: `${floatDuration}s`,
            '--float-distance': floatDistance,
          } as CSSProperties
        }
        className={cn(
          sizeClass,
          `pointer-events-none animate-float select-none border-2 border-background object-cover shadow-md transition-shadow hover:shadow-xl dark:border-neutral-800`
        )}
      />
    </motion.div>
  );
};

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
  const centerX = 25;
  const centerY = 40;

  for (let i = 0; i < count; i++) {
    const r = Math.sqrt(i);
    const angle = i * goldenAngle;

    const x = centerX + cX * r * Math.cos(angle);
    const y = centerY + cY * r * Math.sin(angle);

    positions.push({ x, y });
  }

  return positions;
};

// Custom hook to trigger a re-render when layout stabilizes (during initial load only)
// This ensures Framer Motion has correct drag constraints after other sections load
const useLayoutStabilized = () => {
  const [, forceRender] = useState(0);

  useEffect(() => {
    // Only run checks during the initial load period (first 3 seconds)
    // to catch other sections appearing/loading
    const checkIntervals = [1500];
    const timeouts = checkIntervals.map((delay) =>
      setTimeout(() => forceRender((n) => n + 1), delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);
};

export const ContributorCloud: FC<ContributorCloudProps> = ({
  contributors,
}) => {
  const { discordLinkLabel, seeAllLink, title, subtitle } = useIntlayer(
    'contributor-section'
  );
  const positions = generateCloudPositions(contributors.length);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger re-renders during initial load to ensure Framer Motion
  // measures correct drag constraints after other sections load
  useLayoutStabilized();

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 max-md:hidden md:py-32"
    >
      <div className="pointer-events-none mx-auto max-w-7xl p-5 px-4 md:px-8 lg:px-16">
        <div className="flex min-h-40 flex-col gap-12 md:flex-row md:items-center">
          <div className="pointer-events-none relative flex-1">
            {/* Invisible spacer to maintain layout */}
          </div>
          <div className="pointer-events-auto relative z-0 flex-1 space-y-6">
            <H2 className="mb-3 font-bold text-3xl sm:text-4xl">{title}</H2>
            <p className="text-base text-neutral">{subtitle}</p>

            <div className="flex gap-2">
              <Link
                href={ExternalLinks.Discord}
                label={discordLinkLabel.value}
                color="text"
                variant="button-outlined"
                roundedSize="full"
                className="flex w-fit"
              >
                <span className="flex items-center gap-2">
                  <DiscordLogo className="size-4" />
                  {discordLinkLabel}
                </span>
              </Link>

              <Link
                href={PagesRoutes.Contributors}
                label={seeAllLink.value}
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
