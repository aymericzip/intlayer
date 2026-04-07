import { Button } from '@intlayer/design-system/button';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { Book, Globe, PenTool } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';

export const Route = createFileRoute('/$locale/_dashboard/_editor/_content')({
  component: EditorContentLayout,
});

function EditorContentLayout() {
  const { title, tabItems: tabLabels } = useIntlayer('content-dashboard-page');
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    tabItems.find((tab) => pathname.startsWith(tab.value))?.value ??
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
              onClick={() => void navigate({ to: value })}
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
      <Outlet />
    </DashboardContentLayout>
  );
}
