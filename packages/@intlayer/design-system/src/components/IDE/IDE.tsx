'use client';

import { useState, type FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { Container } from '../Container';
import { MarkdownRenderer } from './MarkDownRender';

export type IDEProps = {
  tabs: {
    title: string;
    content: string;
  }[];
  isDarkMode?: boolean;
};

const StyledContainer = tw(
  Container
)`flex flex-col h-full w-full shadow-lg overflow-scroll`;

const StyledTabBar = tw.div`flex items-center justify-start w-full bg-neutral-200 dark:bg-neutral-700 rounded-t-3xl text-xs text-neutral dark:text-neutral-dark overflow-scroll`;
const StyledWindowButtonContainer = tw.div`flex items-center justify-start gap-2 p-1 mx-2`;

const StyledWindowButton = tw.div`w-3 h-3 rounded-full`;
const StyledCloseButton = tw(StyledWindowButton)`bg-red-500`;
const StyledMinimizeButton = tw(StyledWindowButton)`bg-yellow-500`;
const StyledMaximizeButton = tw(StyledWindowButton)`bg-green-500`;

const StyledTab = styled.div<{ $isActive: boolean }>(({ $isActive }) => [
  tw`flex items-center justify-center min-w-20 h-8 py-1 px-3`,
  $isActive
    ? tw`bg-card dark:bg-card-dark`
    : tw`bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 cursor-pointer`,
]);

const StyledContent = tw.div`text-xs md:text-sm pt-2 pl-2`;

export const IDE: FC<IDEProps> = ({ tabs, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { content } = tabs[activeTab];

  return (
    <StyledContainer roundedSize="3xl" transparency="none">
      <StyledTabBar>
        <StyledWindowButtonContainer>
          <StyledCloseButton />
          <StyledMinimizeButton />
          <StyledMaximizeButton />
        </StyledWindowButtonContainer>
        {tabs.map(({ title }, index) => (
          <StyledTab
            key={title}
            onClick={() => setActiveTab(index)}
            $isActive={activeTab === index}
          >
            {title}
          </StyledTab>
        ))}
      </StyledTabBar>

      <StyledContent>
        <MarkdownRenderer isDarkMode={isDarkMode}>{content}</MarkdownRenderer>
      </StyledContent>
    </StyledContainer>
  );
};
