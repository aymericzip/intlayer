import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from 'react';
import { DiscordLogo } from './DiscordLogo';
import { FacebookLogo } from './FacebookLogo';
import { InstagramLogo } from './InstagramLogo';
import { LinkedInLogo } from './LinkedInLogo';
import { ProductHuntLogo } from './ProductHuntLogo';
import { TiktokLogo } from './TiktokLogo';
import { XLogo } from './XLogo';
import { YoutubeLogo } from './YoutubeLogo';

const socialNetworks = [
  {
    href: 'https://discord.gg/7uxamYVeCk',
    component: <DiscordLogo className="h-auto max-h-full max-w-full" />,
    label: 'Discord',
  },
  {
    href: 'https://www.producthunt.com/posts/intlayer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-intlayer',
    component: <ProductHuntLogo className="h-auto max-h-full max-w-full" />,
    label: 'Product Hunt',
  },
  {
    href: 'https://x.com/Intlayer183096',
    component: <XLogo className="h-auto max-h-full max-w-full" />,
    label: 'X',
  },
  {
    href: 'https://www.youtube.com/@intlayer',
    component: <YoutubeLogo className="h-auto max-h-full max-w-full" />,
    label: 'YouTube',
  },
  {
    href: 'https://www.linkedin.com/company/intlayerorg',
    component: <LinkedInLogo className="h-auto max-h-full max-w-full" />,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.tiktok.com/@intlayer',
    component: <TiktokLogo className="h-auto max-h-full max-w-full" />,
    label: 'TikTok',
  },
  {
    href: 'https://www.instagram.com/intlayer/',
    component: <InstagramLogo className="h-auto max-h-full max-w-full" />,
    label: 'Instagram',
  },
  // {
  //   href: 'https://www.facebook.com/intlayer',
  //   component: <FacebookLogo className="h-auto max-h-full max-w-full" />,
  //   label: 'Facebook',
  // },
];

type SocialNetworksProps = {
  renderItem?: (item: (typeof socialNetworks)[number]) => ReactNode;
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type DefaultRenderItemProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  component: ReactNode;
  label: string;
};

const DefaultRenderItem: FC<DefaultRenderItemProps> = ({
  href,
  component,
  label,
  ...iconProps
}) => (
  <a
    key={href}
    href={href}
    aria-label={label}
    className="max-h-4 max-w-4 shrink-0"
    {...iconProps}
  >
    {component}
  </a>
);

export const SocialNetworks = ({
  renderItem,
  ...iconProps
}: SocialNetworksProps) =>
  socialNetworks.map(
    renderItem ??
      ((props) => (
        <DefaultRenderItem {...props} {...iconProps} key={props.label} />
      ))
  );

export * from './DiscordLogo';
export * from './FacebookLogo';
export * from './InstagramLogo';
export * from './LinkedInLogo';
export * from './ProductHuntLogo';
export * from './TiktokLogo';
export * from './XLogo';
export * from './YoutubeLogo';
