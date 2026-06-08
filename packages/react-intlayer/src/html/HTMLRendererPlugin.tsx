import type { FC, ReactNode } from 'react';
import { useHTMLContext } from './HTMLProvider';
import { renderHTML } from './HTMLRenderer';

type HTMLRendererPluginProps = {
  html: string;
  userComponents?: Record<string, any>;
};

export const HTMLRendererPlugin: FC<HTMLRendererPluginProps> = (
  props
): ReactNode => {
  const { html, userComponents } = props;
  const context = useHTMLContext();

  return renderHTML(html, {
    components: {
      ...context?.components,
      ...userComponents,
    },
  });
};
