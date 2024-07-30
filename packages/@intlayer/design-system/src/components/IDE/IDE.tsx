'use client';

import { type HTMLAttributes, useState, type FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { Container } from '../Container';
import { WithResizer } from '../WithResizer';
import { FileTree } from './FileTree';
import { MarkdownRenderer } from './MarkDownRender';

export type IDEProps = {
  pages: {
    path: string;
    content: string;
    isOpen?: boolean;
  }[];
  isDarkMode?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const StyledContainer = tw(
  Container
)`flex flex-col h-full w-full shadow-lg overflow-scroll justify-start`;

const StyledWindow = tw.div`flex flex-row h-full w-full shadow-lg justify-start flex-1 relative`;
const StyledWindowButtonContainer = tw.div`flex items-center justify-start gap-2 p-1 mx-2`;

const StyledAbsolute = tw.div`absolute top-0 left-0 w-full h-full`;

const StyledWindowButton = tw.div`w-3 h-3 rounded-full`;
const StyledCloseButton = tw(StyledWindowButton)`bg-red-500`;
const StyledMinimizeButton = tw(StyledWindowButton)`bg-yellow-500`;
const StyledMaximizeButton = tw(StyledWindowButton)`bg-green-500`;

const StyledTabScroller = tw.div`flex w-full h-full overflow-y-auto`;
const StyledTabBar = tw.div`flex flex-row w-auto items-center gap-1 justify-start bg-neutral-200 dark:bg-neutral-950 rounded-t-3xl text-xs text-neutral dark:text-neutral-dark`;
const StyledTab = styled.div<{ $isActive: boolean }>(({ $isActive }) => [
  tw`flex items-center justify-start min-w-20 h-8 py-1 px-3 transition`,
  $isActive
    ? tw`bg-card dark:bg-card-dark`
    : tw`bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-950 dark:hover:bg-card-dark cursor-pointer`,
]);

const StyledContent = tw.div`w-full h-full text-xs md:text-sm pt-2 flex-1 overflow-auto`;

const StyledDivColTemplate = tw.div`w-full h-full flex`;

export const IDE: FC<IDEProps> = ({
  pages: initialPages,
  isDarkMode,
  ...props
}) => {
  const [pages, setPages] = useState(initialPages);
  const tabs = pages.filter(({ isOpen }) => isOpen);

  const firstTabIndex = tabs.findIndex(({ isOpen }) => isOpen);
  const [activeTab, setActiveTab] = useState(firstTabIndex);

  const { content, path } = pages[activeTab];
  const filePaths = initialPages.map(({ path: title }) => title);

  const handleClickFile = (title: string) => {
    const page = pages.find(({ path: tabTitle }) => tabTitle === title);
    if (!page) return;

    const newPages = pages.map((page) => {
      if (page.path === title) {
        return { ...page, isOpen: true };
      }
      return page;
    });

    setPages(newPages);

    const newPageIndex = newPages.findIndex(
      ({ path: tabTitle }) => tabTitle === title
    );

    setActiveTab(newPageIndex);
  };

  return (
    <StyledContainer roundedSize="3xl" transparency="none" {...props}>
      <StyledTabBar>
        <StyledWindowButtonContainer>
          <StyledCloseButton />
          <StyledMinimizeButton />
          <StyledMaximizeButton />
        </StyledWindowButtonContainer>
        <StyledTabScroller>
          {tabs.map(({ path }, index) => {
            const fullPath = path.split('/');
            const title = fullPath[fullPath.length - 1];

            return (
              <StyledTab
                key={title}
                onClick={() => setActiveTab(index)}
                $isActive={activeTab === index}
              >
                {title}
              </StyledTab>
            );
          })}
        </StyledTabScroller>
      </StyledTabBar>
      <StyledWindow>
        <StyledAbsolute>
          <StyledDivColTemplate>
            <WithResizer initialWidth={20}>
              <FileTree
                filesPaths={filePaths}
                activeFile={path}
                onClickFile={handleClickFile}
              />
            </WithResizer>

            <StyledContent>
              <MarkdownRenderer isDarkMode={isDarkMode}>
                {content}
              </MarkdownRenderer>
            </StyledContent>
          </StyledDivColTemplate>
        </StyledAbsolute>
      </StyledWindow>
    </StyledContainer>
  );
};
