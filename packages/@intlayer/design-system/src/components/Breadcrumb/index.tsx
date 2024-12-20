'use client';

import { Locales } from '@intlayer/config/client';
import { ChevronRightIcon } from 'lucide-react';
import { Fragment, HTMLAttributes, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { cn } from '../../utils/cn';
import { Button, type ButtonProps } from '../Button';
import { Link, type LinkProps } from '../Link';
import { breadCrumbContent } from './breadcrumb.content';

type LinkLinkProps = {
  children: string;
  position: number;
  locale?: Locales;
} & Omit<LinkProps, 'children' | 'label'>;

const LinkLink: FC<LinkLinkProps> = ({
  href,
  lang,
  children,
  onClick,
  color,
  position,
  locale,
  ...props
}) => {
  const { linkLabel } = useDictionary(breadCrumbContent);

  return (
    <>
      <Link
        href={href}
        locale={locale}
        color={color}
        onClick={onClick}
        itemProp="item"
        {...props}
        label={`${linkLabel} ${children}`}
      >
        <span itemProp="name">{children}</span>
      </Link>
      <meta itemProp="position" content={position.toString()} />
    </>
  );
};

type ButtonButtonProps = {
  children: string;
  position: number;
} & Omit<ButtonProps, 'children' | 'label'>;

const ButtonLink: FC<ButtonButtonProps> = ({
  children: text,
  onClick,
  color,
  position,
  ...props
}) => {
  const { linkLabel } = useDictionary(breadCrumbContent);

  return (
    <>
      <Button
        onClick={onClick}
        variant="link"
        label={`${linkLabel} ${text}`}
        color={color}
        itemProp="item"
        {...props}
      >
        <span itemProp="name">{text}</span>
      </Button>
      <meta itemProp="position" content={position.toString()} />
    </>
  );
};

type SpanProps = {
  children: string;
  position: number;
} & HTMLAttributes<HTMLSpanElement>;

const Span: FC<SpanProps> = ({ children, position, ...props }) => (
  <>
    <span itemProp="name" {...props}>
      {children}
    </span>
    <meta itemProp="position" content={position.toString()} />
  </>
);

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
  locale?: Locales;
  elementType?: 'page' | 'location';
} & HTMLAttributes<HTMLOListElement>;

export const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  className,
  color = 'text',
  locale,
  elementType = 'page',
  ...props
}) => (
  <ol
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
      const isActive = index === links.length - 1;
      const ariaCurrent = isActive ? elementType : undefined;

      const text = (link as DetailedBreadcrumbLink).text ?? link;

      let section = (
        <Span key={text} position={index + 1} aria-current={ariaCurrent}>
          {text}
        </Span>
      );

      if (isLink) {
        section = (
          <LinkLink
            key={text}
            href={link.href!}
            color={color}
            position={index + 1}
            locale={locale}
            aria-current={ariaCurrent}
          >
            {text}
          </LinkLink>
        );
      } else if (isButton) {
        section = (
          <ButtonLink
            key={text}
            onClick={link.onClick!}
            color={color}
            position={index + 1}
            aria-current={ariaCurrent}
          >
            {text}
          </ButtonLink>
        );
      }

      const listElement = (
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          key={text}
        >
          {section}
        </li>
      );

      if (isLastLink) {
        return listElement;
      }

      return (
        <Fragment key={text}>
          {listElement}
          <ChevronRightIcon size={10} />
        </Fragment>
      );
    })}
  </ol>
);
