import { ChevronRightIcon } from 'lucide-react';
import { Fragment, HTMLAttributes, type FC } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Link } from '../Link';

type LinkProps = {
  href: string;
  children: string;
  onClick?: () => void;
};

const LinkLink: FC<LinkProps> = ({ href, children, onClick }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    label={`Go to ${children}`}
    color="text"
    onClick={onClick}
    itemProp="itemListElement"
  >
    {children}
  </Link>
);

type ButtonProps = {
  children: string;
  onClick: () => void;
};

const ButtonLink: FC<ButtonProps> = ({ children: text, onClick }) => (
  <Button
    onClick={onClick}
    label={`Go to ${text}`}
    variant="link"
    aria-label={`Go to ${text}`}
    color="text"
    itemProp="itemListElement"
  >
    {text}
  </Button>
);

type SpanProps = {
  children: string;
};

const Span: FC<SpanProps> = ({ children }) => (
  <span aria-label={`Go to ${children}`} itemProp="itemListElement">
    {children}
  </span>
);

type DetailedBreadcrumbLink = {
  href?: string;
  text: string;
  onClick?: () => void;
};
export type BreadcrumbLink = string | DetailedBreadcrumbLink;

type BreadcrumbProps = {
  links: BreadcrumbLink[];
} & HTMLAttributes<HTMLDivElement>;

export const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-row flex-wrap items-center gap-2 text-sm',
      className
    )}
    itemScope
    itemType="http://schema.org/BreadcrumbList"
    {...props}
  >
    {links.map((link, index) => {
      const isLastLink = index === links.length - 1;
      const isLink = typeof link === 'object' && typeof link.href === 'string';
      const isButton =
        typeof link === 'object' && typeof link.onClick === 'function';

      const text = (link as DetailedBreadcrumbLink).text ?? link;

      let Section = (
        <Span aria-current={isLastLink ? 'location' : undefined}>{text}</Span>
      );

      if (isLink) {
        Section = (
          <LinkLink key={text} href={link.href!}>
            {text}
          </LinkLink>
        );
      } else if (isButton) {
        Section = (
          <ButtonLink key={text} onClick={link.onClick!}>
            {text}
          </ButtonLink>
        );
      }

      if (isLastLink) {
        return Section;
      }

      return (
        <Fragment key={text}>
          {Section}
          <ChevronRightIcon size={10} />
        </Fragment>
      );
    })}
  </div>
);
