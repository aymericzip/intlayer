import { AnchorHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import { FacebookLogo } from './FacebookLogo';
import { InstagramLogo } from './InstagramLogo';
import { LinkedInLogo } from './LinkedInLogo';
import { ProductHuntLogo } from './ProductHuntLogo';
import { TiktokLogo } from './TiktokLogo';
import { XLogo } from './XLogo';
import { YoutubeLogo } from './YoutubeLogo';

const socialNetworks = [
  {
    href: 'https://www.producthunt.com/posts/intlayer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-intlayer',
    component: <ProductHuntLogo className="max-w-full max-h-full" />,
    label: 'Product Hunt',
  },
  {
    href: 'https://x.com/Intlayer183096',
    component: <XLogo className="max-w-full max-h-full" />,
    label: 'X',
  },
  {
    href: 'https://www.youtube.com/@intlayer',
    component: <YoutubeLogo className="max-w-full max-h-full" />,
    label: 'YouTube',
  },
  {
    href: 'https://www.linkedin.com/company/intlayer',
    component: <LinkedInLogo className="max-w-full max-h-full" />,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.tiktok.com/@intlayer',
    component: <TiktokLogo className="max-w-full max-h-full" />,
    label: 'TikTok',
  },
  {
    href: 'https://www.instagram.com/intlayer_org/',
    component: <InstagramLogo className="max-w-full max-h-full" />,
    label: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/intlayer',
    component: <FacebookLogo className="max-w-full max-h-full" />,
    label: 'Facebook',
  },
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
    className="max-w-4 max-h-4"
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

export * from './FacebookLogo';
export * from './InstagramLogo';
export * from './LinkedInLogo';
export * from './ProductHuntLogo';
export * from './TiktokLogo';
export * from './XLogo';
export * from './YoutubeLogo';
