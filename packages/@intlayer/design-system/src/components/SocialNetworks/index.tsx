import { AnchorHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import { FacebookLogo } from './Facebook';
import { InstagramLogo } from './Instagram';
import { LinkedInLogo } from './LinkedIn';
import { TiktokLogo } from './Tiktok';
import { XLogo } from './X';
import { YoutubeLogo } from './Youtube';

const socialNetworks = [
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
    renderItem ?? ((props) => <DefaultRenderItem {...props} {...iconProps} />)
  );
