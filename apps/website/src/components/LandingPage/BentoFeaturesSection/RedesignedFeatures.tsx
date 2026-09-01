import { LanguageSection } from '@intlayer/design-system/language-background';
import { Link } from '@intlayer/design-system/link';
import { Website_Playground_Path } from '@intlayer/design-system/routes';
import { StatsRecording } from 'framer-motion';
import { getLocalizedUrl } from 'intlayer';
import { CircleArrowRight, PlaySquare } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { CompilerSection } from './CompilerSection';
import { FrameworkProvider, Mode } from './FrameworkContext';
import { FrameworkSelector } from './FrameworkSelector';
import { IDESection } from './IDESection';
import { ModeSelector } from './ModeSelector';
import { TestSection } from './TestSection';
import { VisualEditorSection } from './VisualEditorSection';
export const FeaturesSection: FC = () => {
  const { locale } = useLocale();
  const { gotToPlaygroundButton } = useIntlayer('visual-editor-section');
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
          <LanguageSection />
          <h1 className="text-3xl">{sectionsData[3].title}</h1>
          <p className="text-muted-foreground leading-6">
            {sectionsData[3].description}
          </p>
        </div>

        <div className="col-span-2 flex flex-col gap-4 bg-background p-6">
          <VisualEditorSection />
          <h1 className="text-3xl">{sectionsData[2].title}</h1>
          <p className="text-muted-foreground leading-6">
            {sectionsData[2].description}
          </p>
          <Link
            href={getLocalizedUrl(Website_Playground_Path, locale)}
            target="_blank"
            variant="button"
            color="text"
            roundedSize="sm"
            label={gotToPlaygroundButton.label.value}
          >
            <span className="flex items-center justify-center gap-2">
              {gotToPlaygroundButton.text}
              <PlaySquare />
            </span>
          </Link>
        </div>
        <div className="col-span-2 flex flex-col gap-4 bg-background p-6">
          <TestSection />
          <h1 className="text-3xl">{sectionsData[4].title}</h1>
          <p className="text-muted-foreground leading-6">
            {sectionsData[4].description}
          </p>
        </div>
      </section>
    </FrameworkProvider>
  );
};
