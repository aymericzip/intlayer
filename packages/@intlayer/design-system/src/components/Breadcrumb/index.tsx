'use client';

import { ChevronRightIcon } from 'lucide-react';
import { Fragment, HTMLAttributes, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { cn } from '../../utils/cn';
import { Button, type ButtonProps } from '../Button';
import { Link, type LinkProps } from '../Link';
import { breadCrumbContent } from './breadcrumb.content';

type LinkLinkProps = {
  children: string;
} & Omit<LinkProps, 'children' | 'label'>;

const LinkLink: FC<LinkLinkProps> = ({
  href,
  children,
  onClick,
  color,
  ...props
}) => {
  const { linkLabel } = useDictionary(breadCrumbContent);

  return (
    <Link
      href={href}
      color={color}
      onClick={onClick}
      itemProp="itemListElement"
      {...props}
      label={`${linkLabel} ${children}`}
    >
      {children}
    </Link>
  );
};

type ButtonButtonProps = {
  children: string;
} & Omit<ButtonProps, 'children' | 'label'>;

const ButtonLink: FC<ButtonButtonProps> = ({
  children: text,
  onClick,
  color,
  ...props
}) => {
  const { linkLabel } = useDictionary(breadCrumbContent);
  return (
    <Button
      onClick={onClick}
      variant="link"
      aria-label={`${linkLabel} ${text}`}
      color={color}
      itemProp="itemListElement"
      {...props}
      label={`Go to ${text}`}
    >
      {text}
    </Button>
  );
};

type SpanProps = {
  children: string;
};

const Span: FC<SpanProps> = ({ children }) => {
  const { linkLabel } = useDictionary(breadCrumbContent);

  return (
    <span aria-label={`${linkLabel} ${children}`} itemProp="itemListElement">
      {children}
    </span>
  );
};

type DetailedBreadcrumbLink = {
  href?: string;
  text: string;
  onClick?: () => void;
};
export type BreadcrumbLink = string | DetailedBreadcrumbLink;

export type BreadcrumbProps = {
  links: BreadcrumbLink[];
  color?:
    | 'primary'
    | 'destructive'
    | 'neutral'
    | 'light'
    | 'dark'
    | 'text'
    | 'custom';
} & HTMLAttributes<HTMLDivElement>;

export const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  className,
  color = 'text',
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
        <Span aria-current={isLastLink ? 'location' : undefined} key={text}>
          {text}
        </Span>
      );

      if (isLink) {
        Section = (
          <LinkLink key={text} href={link.href!} color={color}>
            {text}
          </LinkLink>
        );
      } else if (isButton) {
        Section = (
          <ButtonLink key={text} onClick={link.onClick!} color={color}>
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
