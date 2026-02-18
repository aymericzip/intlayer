import type { LocalesValues } from '@intlayer/types';
import type { ComponentProps, FC } from 'react';
import {
  type HTMLRenderer as HTMLRendererIntlayer,
  type RenderHTMLProps,
  renderHTML,
} from 'react-intlayer';
import { H1, H2, H3, H4, H5, H6 } from '../Headers';
import { Link } from '../Link';

type HTMLRendererProps = {
  children: string;
  isDarkMode?: boolean;
  locale?: LocalesValues;
  components?: ComponentProps<typeof HTMLRendererIntlayer>['components'];
};

export const getIntlayerHTMLOptions: (isDarkMode: boolean) => RenderHTMLProps =
  () => ({
    components: {
      h1: (props) => <H1 isClickable={true} {...props} />,
      h2: (props) => <H2 isClickable={true} className="mt-16" {...props} />,
      h3: (props) => <H3 isClickable={true} className="mt-5" {...props} />,
      h4: (props) => <H4 isClickable={true} className="mt-3" {...props} />,
      h5: (props) => <H5 isClickable={true} className="mt-3" {...props} />,
      h6: (props) => <H6 isClickable={true} className="mt-3" {...props} />,
      a: (props) => (
        <Link
          isExternalLink={props.href?.startsWith('http')}
          underlined={true}
          label=""
          {...props}
          color="neutral"
        />
      ),
    },
  });

/**
 * HTMLRenderer Component
 *
 * A comprehensive HTML renderer that transforms HTML text into rich,
 * interactive content with custom styling and Intlayer integration.
 */
export const HTMLRenderer: FC<HTMLRendererProps> = ({
  children,
  isDarkMode,
  locale,
  components: componentsProp,
}) => {
  const htmlOptions = getIntlayerHTMLOptions(isDarkMode ?? false);

  const htmlContent = renderHTML(children, {
    components: {
      ...htmlOptions.components,
      a: (props) => (
        <Link
          isExternalLink={props.href?.startsWith('http')}
          underlined={true}
          locale={locale}
          label=""
          {...props}
          color="neutral"
        />
      ),
      ...componentsProp,
    },
  });

  return <>{htmlContent}</>;
};
