import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { MoveVertical } from 'lucide-react';
import { type FC, lazy, Suspense, useState } from 'react';
import { LandingPage } from './LandingPage';

const DROPDOWN_IDENTIFIER = 'landing-switcher';

const CMSLandingPage = lazy(() =>
  import('./CMSLandingPage').then((module) => ({
    default: module.CMSLandingPage,
  }))
);
const TMSLandingPage = lazy(() =>
  import('./TMSLandingPage').then((module) => ({
    default: module.TMSLandingPage,
  }))
);

export const LandingPageWithSwitcher: FC = () => {
  const Landings = {
    int: { Component: LandingPage, content: 'Internationalization Packages' },
    cms: { Component: CMSLandingPage, content: 'Content Management System' },
    tms: {
      Component: TMSLandingPage,
      content: 'Translations Management System',
    },
  } as const;

  const [landing, set_landing] = useState<keyof typeof Landings>('int');
  const Landing = Landings[landing];

  return (
    <>
      <div className="absolute right-0 p-4">
        <DropDown identifier={DROPDOWN_IDENTIFIER}>
          <DropDown.Trigger
            identifier={DROPDOWN_IDENTIFIER}
            aria-label="Select landing page"
            size="lg"
            className="z-50 p-0!"
            variant="outline"
            color="foreground"
            roundedSize="sm"
          >
            <div className="flex w-full items-center justify-between">
              <div className="text-nowrap px-2 text-sm">{Landing.content}</div>
              <MoveVertical className="w-5 self-center" />
            </div>
          </DropDown.Trigger>

          <DropDown.Panel
            identifier={DROPDOWN_IDENTIFIER}
            isOverable
            isFocusable
            align="end"
          >
            <Container
              className="max-h-[80vh] min-w-28 border border-text/5"
              separator="y"
              roundedSize="xl"
              transparency="xs"
            >
              <ul
                className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1"
                aria-label="Landing pages"
              >
                {Object.entries(Landings)
                  .filter((x) => landing !== x[0])
                  .map(([key, Landing]) => (
                    <li className="py-1 pr-3" key={key}>
                      <Button
                        variant="invisible-link"
                        className="w-full"
                        label={Landing.content}
                        onClick={() =>
                          set_landing(key as keyof typeof Landings)
                        }
                      >
                        <div className="flex flex-row items-center justify-between gap-3 px-2 py-1">
                          <span>{Landing.content}</span>
                        </div>
                      </Button>
                    </li>
                  ))}
              </ul>
            </Container>
          </DropDown.Panel>
        </DropDown>
      </div>

      <Suspense fallback="Loading">
        <Landing.Component />
      </Suspense>
    </>
  );
};
