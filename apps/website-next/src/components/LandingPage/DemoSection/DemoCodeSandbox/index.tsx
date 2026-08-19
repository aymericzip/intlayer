'use client';

import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { type FC, useEffect, useRef, useState } from 'react';

interface DemoCodeSandboxProps {
  repoPath?: string;
  framework?: string;
}

export const DemoCodeSandbox: FC<DemoCodeSandboxProps> = ({
  repoPath = '/aymericzip/intlayer-next-16-template',
  framework = repoPath.split('/').pop() ?? '',
}) => {
  const content = useIntlayer('demo-code-sandbox');
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container
      ref={ref}
      className="m-auto w-full overflow-hidden"
      roundedSize="3xl"
      background="with"
      border
      borderColor="card"
    >
      <iframe
        src={`https://ide.intlayer.org${repoPath}?embed=1&file=intlayer.config.ts&theme=${resolvedTheme}&framework=${framework}`}
        className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
        title={
          content.demoCodesandboxHowToInternationalize({
            framework,
          }).value
        }
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="lazy"
      />
    </Container>
  );
};
