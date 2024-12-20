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
  position: number;
} & Omit<LinkProps, 'children' | 'label'>;

const LinkLink: FC<LinkLinkProps> = ({
  href,
  children,
  onClick,
  color,
  position,
  ...props
}) => {
  const { linkLabel } = useDictionary(breadCrumbContent);

  return (
    <>
      <Link
        href={href}
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
};

const Span: FC<SpanProps> = ({ children, position }) => (
  <>
    <span itemProp="name">{children}</span>
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
} & HTMLAttributes<HTMLOListElement>;

export const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  className,
  color = 'text',
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

      const text = (link as DetailedBreadcrumbLink).text ?? link;

      let section = (
        <Span
          aria-current={isLastLink ? 'location' : undefined}
          key={text}
          position={index + 1}
        >
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
