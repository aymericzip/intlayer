'use client';

import { Link } from '@components/Link/Link';
import { SearchTrigger } from '@components/Search/SearchTrigger';
import { Container, Accordion } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { forwardRef, type ComponentProps, type FC } from 'react';
import { Section } from './types';

type OptionalLinkProps = ComponentProps<typeof Link>;

const OptionalLink: FC<OptionalLinkProps> = ({ href, ...props }) => {
  if (!href) return <span {...props} />;
  return <Link href={href} variant="hoverable" color="text" {...props} />;
};

type DocNavListProps = {
  docData: Section;
  activeSections: string[];
};

export const DocNavList = forwardRef<HTMLDivElement, DocNavListProps>(
  ({ docData, activeSections }, ref) => (
    <Container
      className="sticky h-full pt-6 md:top-14 md:max-h-[calc(100vh-3.5rem)]"
      roundedSize="none"
      transparency="sm"
      ref={ref}
    >
      <div className="md:sticky md:top-16 md:max-h-[calc(100vh-4rem)]">
        <SearchTrigger />
        <div className="relative h-full">
          <div className="from-card dark:from-card-dark absolute left-0 top-0 h-8 w-full bg-gradient-to-b" />

          <nav className="flex min-w-40 flex-col gap-5 overflow-auto px-32 pb-20 pt-8 md:max-h-[calc(100vh-8.2rem)] md:max-w-80 md:px-6">
            {Object.keys(docData).map((key1) => {
              const section1Data = docData[key1];
              const sectionDefault = section1Data.default;
              const subSections = section1Data.subSections;
              const isActive = key1 === activeSections[0];

              return (
                <div key={key1}>
                  <OptionalLink
                    href={sectionDefault?.url ?? ''}
                    className={cn([
                      'text-neutral hover:text-text dark:hover:text-text-dark h-full max-h-full text-nowrap pl-3 text-left font-semibold transition-colors dark:text-neutral-200',
                    ])}
                    label={key1}
                    isActive={isActive}
                  >
                    {section1Data.title}
                  </OptionalLink>

                  {subSections && Object.keys(subSections).length > 0 && (
                    <div className="border-neutral dark:border-neutral-dark mt-4 flex flex-col gap-4 border-l-[0.5px] p-1 text-base">
                      {Object.keys(subSections).map((key2) => {
                        const section2Data = subSections[key2];
                        const sectionDefault = section2Data.default;
                        const subSections2 = section2Data.subSections;
                        const hasSubsections =
                          subSections2 && Object.keys(subSections2).length > 0;
                        const isActive =
                          key1 === activeSections[0] &&
                          key2 === activeSections[1];

                        return (
                          <div key={key2}>
                            {hasSubsections ? (
                              <Accordion
                                identifier={key2}
                                header={
                                  <OptionalLink
                                    label={key2}
                                    href={
                                      !isActive
                                        ? (sectionDefault?.url ?? '')
                                        : ''
                                    }
                                    className="text-neutral hover:text-text dark:hover:text-text-dark block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors dark:text-neutral-200"
                                    isActive={isActive}
                                  >
                                    {section2Data?.title}
                                  </OptionalLink>
                                }
                                label={key2}
                                isOpen={isActive}
                                className="pl-0"
                              >
                                <div className="pl-3">
                                  {subSections2 &&
                                    Object.keys(subSections2).length > 0 && (
                                      <div className="text-neutral hover:text-text dark:hover:text-text-dark flex flex-col items-start gap-2 p-1 transition-colors">
                                        {Object.keys(subSections2).map(
                                          (key3) => {
                                            const section3Data =
                                              subSections2[key3];

                                            const isActive =
                                              key1 === activeSections[0] &&
                                              key2 === activeSections[1] &&
                                              key3 === activeSections[2];

                                            return (
                                              <OptionalLink
                                                key={key3}
                                                label={key3}
                                                href={
                                                  section3Data.default?.url ??
                                                  ''
                                                }
                                                className="text-neutral hover:text-text dark:hover:text-text-dark block w-full text-nowrap p-2 text-left text-xs transition-colors dark:text-neutral-200"
                                                isActive={isActive}
                                              >
                                                {section3Data.title}
                                              </OptionalLink>
                                            );
                                          }
                                        )}
                                      </div>
                                    )}
                                </div>
                              </Accordion>
                            ) : (
                              <OptionalLink
                                href={sectionDefault?.url ?? ''}
                                className="text-neutral hover:text-text dark:hover:text-text-dark block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors dark:text-neutral-200"
                                label={key2}
                                isActive={isActive}
                              >
                                {section2Data?.title}
                              </OptionalLink>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </Container>
  )
);

DocNavList.displayName = 'DocNavList';

export default DocNavList;
