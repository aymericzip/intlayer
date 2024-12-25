'use client';

import { SearchTrigger } from '@components/DocPage/Search/SearchTrigger';
import { Link } from '@components/Link/Link';
import {
  Container,
  Accordion,
  Button,
  MaxWidthSmoother,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ArrowLeftToLine } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type ComponentProps, type FC } from 'react';
import { Section } from './types';
import { PagesRoutes } from '@/Routes';

type OptionalLinkProps = ComponentProps<typeof Link>;

const OptionalLink: FC<OptionalLinkProps> = ({ href, isActive, ...props }) => {
  if (!href) return <span {...props} />;
  return (
    <Link
      href={href}
      variant="hoverable"
      color="text"
      isActive={isActive}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
};

type DocNavListProps = {
  docData: Section;
  activeSections: string[];
};

export const DocNavListContent: FC<DocNavListProps> = ({
  docData,
  activeSections,
}) => {
  const { blogButton } = useIntlayer('doc-nav-list');
  return (
    <nav className="m-auto flex min-w-40 max-w-xl flex-col gap-5 overflow-auto px-3 pb-20 pt-8 md:max-h-[calc(100vh-8.2rem)] md:pl-3">
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
              <ul className="border-neutral dark:border-neutral-dark mt-4 flex flex-col gap-4 border-l-[0.5px] p-1 text-base">
                {Object.keys(subSections).map((key2) => {
                  const section2Data = subSections[key2];
                  const sectionDefault = section2Data.default;
                  const subSections2 = section2Data.subSections;
                  const hasSubsections =
                    subSections2 && Object.keys(subSections2).length > 0;
                  const isActive =
                    key1 === activeSections[0] && key2 === activeSections[1];

                  return (
                    <li key={key2}>
                      {hasSubsections ? (
                        <Accordion
                          identifier={key2}
                          header={
                            <OptionalLink
                              label={key2}
                              href={sectionDefault?.url ?? ''}
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
                                  {Object.keys(subSections2).map((key3) => {
                                    const section3Data = subSections2[key3];

                                    const isActive =
                                      key1 === activeSections[0] &&
                                      key2 === activeSections[1] &&
                                      key3 === activeSections[2];

                                    return (
                                      <OptionalLink
                                        key={key3}
                                        label={key3}
                                        href={section3Data.default?.url ?? ''}
                                        className="text-neutral hover:text-text dark:hover:text-text-dark block w-full text-nowrap p-2 text-left text-xs transition-colors dark:text-neutral-200"
                                        isActive={isActive}
                                      >
                                        {section3Data.title}
                                      </OptionalLink>
                                    );
                                  })}
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
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      <div>
        <OptionalLink
          href={PagesRoutes.Blog}
          className={cn([
            'text-neutral hover:text-text dark:hover:text-text-dark h-full max-h-full text-nowrap pl-3 text-left font-semibold transition-colors dark:text-neutral-200',
          ])}
          label={blogButton.label.value}
        >
          {blogButton?.text}
        </OptionalLink>
      </div>
    </nav>
  );
};

export const DocNavList: FC<DocNavListProps> = ({
  docData,
  activeSections,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const { collapseButton } = useIntlayer('doc-nav-list');

  return (
    <Container className="h-full" roundedSize="none" transparency="sm">
      <div className="relative h-full md:max-w-80">
        <Container
          transparency="sm"
          className="z-10 m-auto md:sticky md:top-[3.6rem] md:pt-4"
        >
          <div
            className={cn([
              'relative m-auto flex w-full flex-row items-center justify-end gap-2 px-2',
              isHidden && 'flex-col-reverse',
              !isHidden && 'md:pl-6',
            ])}
          >
            <SearchTrigger isMini={isHidden} />
            <Button
              Icon={ArrowLeftToLine}
              size="icon-md"
              variant="hoverable"
              color="text"
              label={collapseButton.label.value}
              className={cn([
                'transition-transform max-md:hidden',
                isHidden && 'rotate-180',
              ])}
              onClick={() => setIsHidden((isHidden) => !isHidden)}
            />
            <div className="from-card/90 dark:from-card-dark/90 absolute bottom-0 left-0 h-8 w-full -translate-x-[9px] translate-y-full bg-gradient-to-b backdrop-blur" />
          </div>
        </Container>

        <div className="md:sticky md:top-28 md:pt-0">
          <MaxWidthSmoother isHidden={isHidden}>
            <div className="relative overflow-hidden">
              <DocNavListContent
                docData={docData}
                activeSections={activeSections}
              />
            </div>
          </MaxWidthSmoother>
        </div>
      </div>
    </Container>
  );
};

DocNavList.displayName = 'DocNavList';

export default DocNavList;
