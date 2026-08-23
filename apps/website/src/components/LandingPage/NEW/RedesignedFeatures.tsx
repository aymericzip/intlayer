import { StatsRecording } from 'framer-motion';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { CompilerSection } from './CompilerSection';
import { FrameworkProvider, Mode } from './FrameworkContext';
import { FrameworkSelector } from './FrameworkSelector';
import { IDESection } from './IDESection';
import { ModeSelector } from './ModeSelector';

export const FeaturesSection: FC = () => {
  const sectionsData = useIntlayer('features-section');
  return (
    <FrameworkProvider>
      <div className="flex items-center justify-between border-b p-6">
        <h1 className="text-2xl">Customize your experience</h1>
        <div className="flex flex-row flex-wrap items-center gap-3">
          <ModeSelector />
          <FrameworkSelector />
        </div>
      </div>
      <section className="grid grid-cols-4 gap-px border-b bg-border">
        <div className="col-span-2 flex flex-col gap-4 bg-background p-6">
          <IDESection />
          <h1 className="text-3xl">{sectionsData[0].title}</h1>
          <p className="text-muted-foreground leading-6">
            {sectionsData[0].description}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-4 bg-background p-6">
          <CompilerSection />
          <h1 className="text-3xl">{sectionsData[1].title}</h1>
          <p className="text-muted-foreground leading-6">
            {sectionsData[1].description}
          </p>
        </div>

        <div className="col-span-4 flex flex-col gap-4 bg-background p-6">
          <CompilerSection />
          <h1 className="text-3xl">{sectionsData[1].title}</h1>
          <p className="text-muted-foreground leading-6">
            {sectionsData[1].description}
          </p>
        </div>
      </section>
    </FrameworkProvider>
  );
};
