'use client';

import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { Button } from '@intlayer/design-system/button';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import { Book, Globe, PenTool } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

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
      value: App_Dashboard_Editor_Path,
      icon: PenTool,
    },
    {
      label: tabLabels.translate,
      value: App_Dashboard_Translate_Path,
      icon: Globe,
    },
    {
      label: tabLabels.dictionaries,
      value: App_Dashboard_Dictionaries_Path,
      icon: Book,
    },
  ];

  const currentTabValue =
    tabItems.find((tab) => currentPath.startsWith(tab.value))?.value ??
    tabItems[0].value;

  return (
    <DashboardContentLayout title={title}>
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
    </DashboardContentLayout>
  );
};

export default EditorContentLayout;
