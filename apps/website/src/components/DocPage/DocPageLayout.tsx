import { Container, MaxHeightSmoother } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import type { Locales } from 'intlayer';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { type ReactNode, type FC, type ComponentProps } from 'react';
import { getDocData } from './docData';

type DocPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale?: Locales;
};

type OptionalLinkProps = ComponentProps<typeof Link>;

const OptionalLink: FC<OptionalLinkProps> = ({ href, ...props }) => {
  if (!href) return <span {...props} />;
  return <Link {...props} href={href} />;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({
  children,
  locale,
  activeSections = ['get_started'],
}) => {
  const docData = getDocData(locale);

  return (
    <div className="flex-1 border-b-[0.5px] md:grid md:size-full md:grid-cols-[1fr_auto]">
      <Container className="h-full" roundedSize="none" transparency="sm">
        <div className="sticky px-20 md:top-16 md:px-0">
          <nav className="flex min-w-40 flex-col gap-5 px-6 py-10 md:max-w-80">
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
                      'text-neutral hover:text-text dark:hover:text-text-dark text-nowrap text-left font-semibold transition-colors dark:text-neutral-200',
                      isActive && 'text-primary dark:text-primary-dark',
                    ])}
                  >
                    {section1Data.title}
                  </OptionalLink>

                  {subSections && Object.keys(subSections).length > 0 && (
                    <div className="border-neutral dark:border-neutral-dark mt-4 flex flex-col gap-4 border-l-[0.5px] p-1">
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
                            <OptionalLink
                              href={sectionDefault?.url ?? ''}
                              className={cn([
                                'text-neutral hover:text-text dark:hover:text-text-dark flex flex-row items-center text-nowrap p-2 text-left text-sm transition-colors dark:text-neutral-200',
                                isActive &&
                                  'text-primary dark:text-primary-dark',
                              ])}
                            >
                              {section2Data?.title}
                              {hasSubsections && !isActive && (
                                <ChevronDown className="ml-1 size-4" />
                              )}
                            </OptionalLink>

                            {subSections2 &&
                              Object.keys(subSections2).length > 0 && (
                                <MaxHeightSmoother isHidden={!isActive}>
                                  <div className="text-neutral hover:text-text dark:hover:text-text-dark flex flex-col items-start gap-2 p-1 transition-colors">
                                    {Object.keys(subSections2).map((key3) => {
                                      const section3Data = subSections2[key3];
                                      const sectionDefault =
                                        section3Data.default;

                                      const isActive =
                                        key1 === activeSections[0] &&
                                        key2 === activeSections[1] &&
                                        key3 === activeSections[2];

                                      return (
                                        <OptionalLink
                                          key={key3}
                                          href={sectionDefault?.url ?? ''}
                                          className={cn([
                                            'text-neutral hover:text-text dark:hover:text-text-dark text-nowrap p-2 text-left text-xs transition-colors dark:text-neutral-200',
                                            isActive &&
                                              'text-primary dark:text-primary-dark',
                                          ])}
                                        >
                                          {section3Data.title}
                                        </OptionalLink>
                                      );
                                    })}
                                  </div>
                                </MaxHeightSmoother>
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
      </Container>

      <div className="w-full grow">{children}</div>
    </div>
  );
};
