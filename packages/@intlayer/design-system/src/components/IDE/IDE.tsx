'use client';

import { type HTMLAttributes, useState, type FC } from 'react';
import { cn } from '../../utils/cn';
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

export const IDE: FC<IDEProps> = ({
  pages: initialPages,
  isDarkMode,
  className,
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
    <Container
      className={cn(
        'flex size-full flex-col justify-start overflow-hidden shadow-lg',
        className
      )}
      roundedSize="3xl"
      transparency="none"
      {...props}
    >
      <div className="text-neutral dark:text-neutral-dark flex w-auto flex-row items-center justify-start gap-1 rounded-t-3xl bg-neutral-200 text-xs dark:bg-neutral-950">
        <div className="mx-2 flex items-center justify-start gap-2 p-1">
          <div className="size-3 rounded-full bg-red-500" />
          <div className="size-3 rounded-full bg-yellow-500" />
          <div className="size-3 rounded-full bg-green-500" />
        </div>
        <div className="flex size-full overflow-y-auto">
          {tabs.map(({ path }, index) => {
            const fullPath = path.split('/');
            const title = fullPath[fullPath.length - 1];
            const isActive = index === activeTab;

            return (
              <button
                className={cn(
                  'flex h-8 min-w-20 items-center justify-start px-3 py-1 transition',
                  isActive
                    ? 'bg-card dark:bg-card-dark'
                    : 'dark:hover:bg-card-dark cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-950'
                )}
                key={title}
                onClick={() => setActiveTab(index)}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="relative flex size-full flex-1 flex-row justify-start">
        <div className="absolute left-0 top-0 size-full">
          <div className="flex size-full">
            <WithResizer initialWidth={150}>
              <FileTree
                filesPaths={filePaths}
                activeFile={path}
                onClickFile={handleClickFile}
              />
            </WithResizer>

            <div className="size-full flex-1 overflow-auto pt-2 text-xs md:text-sm">
              <MarkdownRenderer isDarkMode={isDarkMode}>
                {content}
              </MarkdownRenderer>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
