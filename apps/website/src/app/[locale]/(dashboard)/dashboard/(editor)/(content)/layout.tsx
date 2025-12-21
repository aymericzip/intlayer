'use client';

import { Button, TabSelector } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { Book, type LucideIcon, PenTool } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { PagesRoutes } from '@/Routes';

type EditorContentLayoutProps = {
  children: ReactNode;
};

const EditorContentLayout: FC<EditorContentLayoutProps> = ({ children }) => {
  const { title, tabItems: tabLabels } = useIntlayer('content-dashboard-page');
  const router = useRouter();
  const currentPath = usePathname();

  const tabItems = [
    {
      label: tabLabels.editor,
      value: PagesRoutes.Dashboard_Editor,
      icon: PenTool,
    },
    {
      label: tabLabels.dictionaries,
      value: PagesRoutes.Dashboard_Dictionaries,
      icon: Book,
    },
  ];

  const currentTabValue =
    tabItems.find((tab) => currentPath.startsWith(tab.value))?.value ??
    tabItems[0].value;

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-6 pl-10 text-3xl">
        {title}
      </h1>
      <div className="mr-3 ml-auto flex justify-end gap-2 py-3">
        <TabSelector
          selectedChoice={currentTabValue}
          tabs={tabItems.map(({ label, value, icon }) => (
            <Button
              key={value}
              label={label.value}
              Icon={icon}
              variant="link"
              color="text"
              onClick={() => router.push(value)}
              type="button"
              className="text-text"
            >
              {label}
            </Button>
          ))}
          hoverable
          color="text"
          orientation="horizontal"
        />
      </div>
      {children}
    </>
  );
};

export default EditorContentLayout;
