'use client';

import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { DemoCodeSandbox } from './DemoCodeSandbox';
import { DemoYoutube } from './DemoYoutube';

enum DemoType {
  Youtube,
  CodeSandbox,
}

export const DemoSection: FC = () => {
  const [demoType, setDemoType] = useState<DemoType>(DemoType.Youtube);
  const { title, demoSwitchSelector } = useIntlayer('demo-section');

  const demoSection = [
    {
      content: demoSwitchSelector.youtube,
      value: DemoType.Youtube,
    },
    {
      content: demoSwitchSelector.codeSandbox,
      value: DemoType.CodeSandbox,
    },
  ] as SwitchSelectorChoices<DemoType>;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="text-neutral dark:text-neutral-dark">{title}</span>

      <div className="my-6 flex w-full max-w-[1000px] flex-col items-center gap-3 px-10 md:px-20">
        <SwitchSelector
          choices={demoSection}
          selectedChoice={demoType}
          onChange={setDemoType}
          color="text"
        />
        {demoType === DemoType.Youtube && <DemoYoutube />}
        {demoType === DemoType.CodeSandbox && <DemoCodeSandbox />}
      </div>
    </div>
  );
};
