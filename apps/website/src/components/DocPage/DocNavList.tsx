'use client';

import { SearchTrigger } from '@components/DocPage/Search/SearchTrigger';
import { Link } from '@components/Link/Link';
import {
  Accordion,
  Button,
  ClickOutsideDiv,
  Container,
  MaxWidthSmoother,
} from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { ArrowLeftToLine, Bot } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type ComponentProps, type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import type { Section } from './types';

type OptionalLinkProps = ComponentProps<typeof Link>;

export const OptionalLink: FC<OptionalLinkProps> = ({
  href,
  isActive,
  className,
  ...props
}) => {
  if (!href)
    return (
      <span
        className={cn(
          'flex w-full text-nowrap p-2 text-left font-bold text-neutral transition-color',
          className
        )}
        {...props}
      />
    );

  return (
    <Link
      href={href}
      variant="hoverable"
      color="text"
      isActive={isActive}
      className={cn(
        'flex w-full text-nowrap p-2 text-left font-bold transition-color',
        className
      )}
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
  const { blogButton, chatBotButton } = useIntlayer('doc-nav-list');

  return (
    <nav className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-5 overflow-auto px-3 pt-8 pb-20">
      {Object.keys(docData).map((key1) => {
        const section1Data = docData[key1];
        const sectionDefault = section1Data.default;
        const subSections = section1Data.subSections;
        const isActive = key1 === activeSections[0];

        return (
          <div key={key1}>
            <OptionalLink
              href={sectionDefault?.relativeUrl ?? ''}
              label={key1}
              isActive={isActive}
              className="p-0 pl-3"
            >
              {section1Data.title}
            </OptionalLink>

            {subSections && Object.keys(subSections).length > 0 && (
              <ul className="mt-4 flex flex-col gap-4 border-neutral border-l-[0.5px] p-1 text-base">
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
                          header={
                            <OptionalLink
                              label={key2}
                              href={sectionDefault?.relativeUrl ?? ''}
                              isActive={isActive}
                            >
                              {section2Data?.title}
                            </OptionalLink>
                          }
                          label={key2}
                          isOpen={isActive ? true : undefined}
                          className="!py-0 !pl-0"
                        >
                          <div className="pl-3 text-sm">
                            {subSections2 &&
                              Object.keys(subSections2).length > 0 && (
                                <div className="flex flex-col items-start gap-2 p-1 text-neutral transition-colors hover:text-text">
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
                                        href={
                                          section3Data.default?.relativeUrl ??
                                          ''
                                        }
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
                          href={sectionDefault?.relativeUrl ?? ''}
                          className="block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors hover:text-text"
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
        <OptionalLink href={PagesRoutes.Blog} label={blogButton.label.value}>
          {blogButton?.text}
        </OptionalLink>
      </div>
      <div>
        <OptionalLink
          href={PagesRoutes.Doc_Chat}
          label={chatBotButton.label.value}
          className="flex items-center"
        >
          <Bot />
          {chatBotButton?.text}
        </OptionalLink>
      </div>
    </nav>
  );
};

export const DocNavList: FC<DocNavListProps> = ({
  docData,
  activeSections,
}) => {
  const { isMobile } = useDevice();
  const [isHidden, setIsHidden] = useState(isMobile);
  const { collapseButton } = useIntlayer('doc-nav-list');

  return (
    <ClickOutsideDiv
      className="top-0 left-0 z-10 flex h-full justify-end max-md:fixed"
      onClickOutSide={() => {
        if (isMobile) {
          setIsHidden(true);
        }
      }}
    >
      <Container
        className={cn(
          isHidden ? 'h-[100px]' : 'h-full',
          'sticky top-[60px] rounded-br-2xl'
        )}
        roundedSize="none"
        transparency="sm"
      >
        <div className="relative h-full max-w-80">
          <Container
            transparency="sm"
            className="sticky top-[3.6rem] z-10 m-auto pt-4"
            roundedSize="none"
          >
            <div
              className={cn(
                'relative m-auto flex w-full flex-row items-center justify-end gap-2 px-2',
                isHidden && 'flex-col-reverse',
                !isHidden && 'pl-6'
              )}
            >
              <SearchTrigger isMini={isHidden} />
              <Button
                Icon={ArrowLeftToLine}
                size="icon-md"
                variant="hoverable"
                color="text"
                label={collapseButton.label.value}
                className={cn([
                  'transition-transform',
                  isHidden && 'rotate-180',
                ])}
                onClick={() => setIsHidden((isHidden) => !isHidden)}
              />
              <div
                className={cn(
                  'absolute bottom-0 left-0 h-8 w-full translate-y-full bg-linear-to-b from-card/90 backdrop-blur',
                  isHidden && 'hidden'
                )}
              />
            </div>
          </Container>

          <div className="sticky top-28 pt-0">
            <MaxWidthSmoother isHidden={Boolean(isHidden)}>
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
    </ClickOutsideDiv>
  );
};
