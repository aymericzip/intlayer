'use client';

import { Link } from '@components/Link/Link';
import { TabSelector } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ArrowLeftToLine } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

const tabItems = [
  {
    label: 'Content',
    value: PagesRoutes.Dashboard_Editor_Content,
  },
  {
    label: 'Settings',
    value: PagesRoutes.Dashboard_Editor_Settings,
  },
];

const EditorContentLayout: FC<EditorContentLayoutProps> = ({ children }) => {
  const router = useRouter();

  const currentPath = usePathname();
  return (
    <div className="flex w-full flex-end flex-col gap-2">
      <TabSelector
        selectedChoice={currentTabValue}
        tabs={tabItems.map((child) => {
          const { label, value, disabled } = child.props;
          const isActive = currentTabValue === value;

          return (
            <button
              key={value}
              className={cn(
                'cursor-pointer rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none',
                !isActive && 'text-neutral/70'
              )}
              data-active={isActive}
              disabled={disabled}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${value}`}
              id={`tab-${value}`}
              onClick={() => router.push(value)}
              type="button"
            >
              {label}
            </button>
          );
        })}
        hoverable
        color="text"
      />
      <h1 className="font-bold text-2xl">Test</h1>
      {children}
    </div>
  );
};

export default EditorContentLayout;
