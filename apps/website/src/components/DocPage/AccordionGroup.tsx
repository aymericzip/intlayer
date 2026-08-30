import {
  Accordion as AccordionBase,
  type AccordionProps,
} from '@intlayer/design-system/accordion';
import { Container } from '@intlayer/design-system/container';
import { buildItemListJsonLd } from '@intlayer/design-system/structured-data';
import {
  Children,
  type FC,
  type HTMLAttributes,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { extractPlainText, JsonLd } from './jsonLd';

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
 * Describes its sections in a schema.org `ItemList` JSON-LD script, so a
 * crawler reads the collapsed content as a list of named entries. The sections
 * are statements rather than questions, so they are an `ItemList` and not a
 * `FAQPage` — that one is reserved for the {@link FAQ} block.
 */
export const AccordionGroup: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => {
  // Markdown authoring inserts whitespace text nodes between the `<Accordion>`
  // blocks; only the elements describe a section.
  const sections = Children.toArray(children).filter(
    (child): child is ReactElement<AccordionProps> => isValidElement(child)
  );

  // An entry without a name or a description would be invalid structured data.
  const items = sections
    .map((section) => ({
      name: extractPlainText(section.props.header),
      description: extractPlainText(section.props.children),
    }))
    .filter(({ name, description }) => Boolean(name) && Boolean(description));

  return (
    <Container
      padding="sm"
      roundedSize="2xl"
      background="none"
      border
      borderColor="neutral"
      className="flex flex-col gap-1 overflow-hidden"
      {...props}
    >
      {items.length > 0 && <JsonLd jsonLd={buildItemListJsonLd({ items })} />}
      {children}
    </Container>
  );
};
