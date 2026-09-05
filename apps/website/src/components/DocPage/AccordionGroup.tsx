import {
  Accordion as AccordionBase,
  type AccordionProps,
} from '@intlayer/design-system/accordion';
import { Container } from '@intlayer/design-system/container';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

/**
 * A collapsible section of a documentation page.
 *
 * The content stays mounted in the DOM — only its height is collapsed — so
 * search engines and AI crawlers index it whatever the open state.
 */
export const Accordion: FC<AccordionProps> = ({ children, ...props }) => (
  <AccordionBase
    {...props}
    headerClassName="text-lg!"
    contentClassName="divide-y divide-neutral"
  >
    <div className="mb-8 flex flex-col gap-6 px-4 pt-6 text-sm text-text/80">
      {children}
    </div>
  </AccordionBase>
);

/**
 * A set of {@link Accordion} sections of a documentation page.
 *
 * Carries no structured data: the sections are statements rather than
 * questions, so they are not a `FAQPage` — that one is reserved for the
 * {@link FAQ} block — and the only rich result an `ItemList` of them could
 * feed is a carousel, which Google restricts to `Course`, `Movie`, `Recipe`
 * and `Restaurant` entries. Describing them as one only earned a "Carousel:
 * item or url field is required" error in Search Console. The section content
 * stays mounted in the DOM whatever the open state, so crawlers read it
 * without any markup of ours.
 */
export const AccordionGroup: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => (
  <Container
    padding="sm"
    roundedSize="2xl"
    background="none"
    border
    borderColor="neutral"
    className="flex flex-col gap-1 overflow-hidden"
    {...props}
  >
    {children}
  </Container>
);
