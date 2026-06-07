'use client';

import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { DemoCodeSandbox } from './DemoCodeSandbox';

enum DemoType {
  Nextjs,
  Tanstack,
  Astro,
  Nuxt,
  Svelte,
}

export const DemoSection: FC = () => {
  const [demoType, setDemoType] = useState<DemoType>(DemoType.Nextjs);
  const { title, demoSwitchSelector } = useIntlayer('demo-section');

  const demoSection = [
    {
      content: demoSwitchSelector.nextjs,
      value: DemoType.Nextjs,
    },
    {
      content: demoSwitchSelector.tanstack,
      value: DemoType.Tanstack,
    },
    {
      content: demoSwitchSelector.astro,
      value: DemoType.Astro,
    },
    {
      content: demoSwitchSelector.nuxt,
      value: DemoType.Nuxt,
    },
    {
      content: demoSwitchSelector.svelte,
      value: DemoType.Svelte,
    },
  ] as SwitchSelectorChoices<DemoType>;

  return (
    <section className="z-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral">{title}</h2>

      <div className="my-6 flex w-full max-w-250 flex-col items-center gap-5 px-10 md:px-20">
        <SwitchSelector
          choices={demoSection}
          defaultValue={demoType}
          onChange={setDemoType}
          itemClassName="text-nowrap"
          color="text"
          size="sm"
        />
        {demoType === DemoType.Nextjs && (
          <DemoCodeSandbox
            repoPath="/aymericzip/intlayer-next-16-template"
            framework="Next.js"
          />
        )}
        {demoType === DemoType.Tanstack && (
          <DemoCodeSandbox
            repoPath="/aymericzip/intlayer-tanstack-start-template"
            framework="Tanstack Start"
          />
        )}
        {demoType === DemoType.Astro && (
          <DemoCodeSandbox
            repoPath="/aymericzip/intlayer-astro-template"
            framework="Astro"
          />
        )}
        {demoType === DemoType.Nuxt && (
          <DemoCodeSandbox
            repoPath="/aymericzip/intlayer-nuxt-4-template"
            framework="Nuxt"
          />
        )}
        {demoType === DemoType.Svelte && (
          <DemoCodeSandbox
            repoPath="/aymericzip/intlayer-vite-svelte-template"
            framework="Svelte"
          />
        )}
      </div>
    </section>
  );
};
