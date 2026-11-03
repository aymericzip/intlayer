import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { type ComponentProps, type FC, useMemo } from 'react';
import {
  type HTMLRenderer as HTMLRendererIntlayer,
  type RenderHTMLProps,
  renderHTML,
} from 'react-intlayer/html';
import { H1, H2, H3, H4, H5, H6 } from '../Headers';
import { Link } from '../Link';

type HTMLRendererProps = {
  children: string;
  locale?: LocalesValues;
  components?: ComponentProps<typeof HTMLRendererIntlayer>['components'];
};

/** Heading renderers, hoisted so their identity is stable across renders. */
const H1Renderer = (props: ComponentProps<typeof H1>) => (
  <H1 isClickable={true} {...props} />
);
const H2Renderer = (props: ComponentProps<typeof H2>) => (
  <H2 isClickable={true} className="mt-16" {...props} />
);
const H3Renderer = (props: ComponentProps<typeof H3>) => (
  <H3 isClickable={true} className="mt-5" {...props} />
);
const H4Renderer = (props: ComponentProps<typeof H4>) => (
  <H4 isClickable={true} className="mt-3" {...props} />
);
const H5Renderer = (props: ComponentProps<typeof H5>) => (
  <H5 isClickable={true} className="mt-3" {...props} />
);
const H6Renderer = (props: ComponentProps<typeof H6>) => (
  <H6 isClickable={true} className="mt-3" {...props} />
);

/**
 * Builds the link renderer for a locale.
 *
 * @param locale - Locale forwarded to `Link`; omitted for the default options.
 */
const createLinkRenderer =
  (locale?: LocalesValues) => (props: ComponentProps<'a'>) => (
    <Link
      isExternalLink={props.href?.startsWith('http')}
      underlined={true}
      locale={locale}
      label=""
      {...props}
      color="neutral"
    />
  );

const intlayerHTMLOptions: RenderHTMLProps = {
  components: {
    h1: H1Renderer,
    h2: H2Renderer,
    h3: H3Renderer,
    h4: H4Renderer,
    h5: H5Renderer,
    h6: H6Renderer,
    a: createLinkRenderer(),
  },
};

/** Returns the shared (stable) HTML render options. */
export const getIntlayerHTMLOptions: () => RenderHTMLProps = () =>
  intlayerHTMLOptions;

/**
 * HTMLRenderer Component
 *
 * A comprehensive HTML renderer that transforms HTML text into rich,
 * interactive content with custom styling and Intlayer integration.
 */
export const HTMLRenderer: FC<HTMLRendererProps> = ({
  children,
  locale,
  components: componentsProp,
}) => {
  /**
   * Overrides are element types: rebuilding them each render remounts every
   * node, and the design-system dist is not run through the React Compiler.
   */
  const components = useMemo(
    () => ({
      ...intlayerHTMLOptions.components,
      a: createLinkRenderer(locale),
      ...componentsProp,
    }),
    [locale, componentsProp]
  );

  const htmlContent = renderHTML(children, { components });

  return <>{htmlContent}</>;
};
