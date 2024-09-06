import { ChevronRightIcon } from 'lucide-react';
import type { FC } from 'react';
import { Button } from '../Button';

type LinkProps = {
  href: string;
  children: string;
  onClick?: () => void;
};

const Link: FC<LinkProps> = ({ href, children, onClick }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Go to ${children}`}
    onClick={onClick}
  >
    {children}
  </a>
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
  >
    {text}
  </Button>
);

type SpanProps = {
  children: string;
};

const Span: FC<SpanProps> = ({ children }) => (
  <span aria-label={`Go to ${children}`}>{children}</span>
);

type DetailedBreadcrumbLink = {
  href?: string;
  text: string;
  onClick?: () => void;
};
export type BreadcrumbLink = string | DetailedBreadcrumbLink;

type BreadcrumbProps = {
  links: BreadcrumbLink[];
};

export const Breadcrumb: FC<BreadcrumbProps> = ({ links }) => (
  <div className="flex flex-row flex-wrap items-center gap-2 text-sm">
    {links.map((link, index) => {
      const isLastLink = index === links.length - 1;
      const isLink = typeof link === 'object' && typeof link.href === 'string';
      const isButton =
        typeof link === 'object' && typeof link.onClick === 'function';

      const text = (link as DetailedBreadcrumbLink).text ?? link;

      let Section = <Span key={text}>{text}</Span>;

      if (isLink) {
        Section = (
          <Link key={text} href={link.href!}>
            {text}
          </Link>
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
        <>
          {Section}
          <ChevronRightIcon key={index} size={10} />
        </>
      );
    })}
  </div>
);
