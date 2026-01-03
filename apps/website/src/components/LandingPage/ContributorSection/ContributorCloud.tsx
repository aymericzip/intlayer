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
  containerSize: { width: number; height: number } | null; // Changed: Pass size instead of ref
};

// ... [Keep sizeVariants, getFloatDistance, getZIndex as they were] ...
const sizeVariants = [
  'size-10 md:size-12',
  'size-12 md:size-14',
  'size-8 md:size-10',
  'size-9 md:size-11',
];

const getFloatDistance = (sizeIndex: number): string => {
  if (sizeIndex === 1) return '20px';
  if (sizeIndex === 2) return '8px';
  return '12px';
};

const getZIndex = (sizeIndex: number): number => {
  switch (sizeIndex) {
    case 1:
      return 30;
    case 0:
      return 20;
    case 3:
      return 15;
    case 2:
      return 10;
    default:
      return 10;
  }
};

const ContributorAvatar: FC<ContributorAvatarProps> = ({
  contributor,
  index,
  position,
  containerSize,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const sizeIndex = (index + contributor.login.length) % sizeVariants.length;
  const sizeClass = sizeVariants[sizeIndex];
  const floatDistance = getFloatDistance(sizeIndex);
  const zIndex = getZIndex(sizeIndex);

  const floatDelay = (
    (index * 0.7 + contributor.login.length * 0.3) %
    5
  ).toFixed(2);
  const floatDuration = (6 + (index % 4) * 1.5).toFixed(1);

  // Calculate constraints relative to the container size
  // This runs whenever the container resizes, fixing the "pop" issue
  useEffect(() => {
    if (!containerSize || !elementRef.current) return;

    const { width: containerW, height: containerH } = containerSize;

    // We need the element's actual size in pixels to calculate boundaries
    const elementW = elementRef.current.offsetWidth;
    const elementH = elementRef.current.offsetHeight;

    // Convert the percentage position (from props) to pixels
    const initialLeftPx = (position.x / 100) * containerW;
    const initialTopPx = (position.y / 100) * containerH;

    setConstraints({
      // How far can I go left? (Negative value to reach 0)
      left: -initialLeftPx,
      // How far can I go right? (Remaining space minus my width)
      right: containerW - initialLeftPx - elementW,
      // How far can I go up?
      top: -initialTopPx,
      // How far can I go down?
      bottom: containerH - initialTopPx - elementH,
    });
  }, [containerSize, position]);

  return (
    <motion.div
      ref={elementRef} // Attach local ref to measure self
      drag
      dragConstraints={constraints} // Use calculated pixel object instead of Ref
      dragMomentum
      dragElastic={0.1}
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

// ... [Keep generateCloudPositions] ...
const generateCloudPositions = (count: number) => {
  const positions = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const maxRadiusX = 20;
  const maxRadiusY = 30;
  const cX = count > 1 ? maxRadiusX / Math.sqrt(count - 1) : 0;
  const cY = count > 1 ? maxRadiusY / Math.sqrt(count - 1) : 0;
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

export const ContributorCloud: FC<ContributorCloudProps> = ({
  contributors,
}) => {
  const { discordLinkLabel, seeAllLink, title, subtitle } = useIntlayer(
    'contributor-section'
  );
  const positions = generateCloudPositions(contributors.length);
  const sectionRef = useRef<HTMLElement>(null);

  // State to track the exact pixel size of the container
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // ResizeObserver to detect layout shifts (including "pops" from other sections)
  useEffect(() => {
    if (!sectionRef.current) return;

    const updateSize = () => {
      if (sectionRef.current) {
        setContainerSize({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight,
        });
      }
    };

    // Initial measurement
    updateSize();

    // Watch for size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(sectionRef.current);

    // Also watch body for global shifts that might affect layout flow
    // (Optional, but helps if the section size depends on viewport)
    const bodyObserver = new ResizeObserver(updateSize);
    bodyObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      bodyObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 max-md:hidden md:py-32"
    >
      <div className="pointer-events-none mx-auto max-w-7xl p-5 px-4 md:px-8 lg:px-16">
        <div className="flex min-h-40 flex-col gap-12 md:flex-row md:items-center">
          <div className="pointer-events-none relative flex-1"></div>
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

      {contributors.map((contributor, index) => {
        const position = positions[index];
        if (!position) return null;

        return (
          <ContributorAvatar
            key={contributor.login}
            contributor={contributor}
            index={index}
            position={position}
            containerSize={containerSize} // Pass the dynamic size
          />
        );
      })}
    </section>
  );
};
