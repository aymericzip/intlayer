import { Button } from '@intlayer/design-system/button';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import { FocusDictionaryProvider } from '@intlayer/editor-react';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { getPathWithoutLocale } from 'intlayer';
import { Book, Globe, PenTool } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { EditorConfigurationProvider } from '#components/Dashboard/ContentDashboard/ConfigurationProvider.tsx';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

// Fix: Updated the route ID to match the new file location
export const Route = createFileRoute('/{-$locale}/_dashboard/_editor/_content')(
  {
    component: EditorLayout,
  }
);

function EditorLayout() {
  const { title, tabItems: tabLabels } = useIntlayer('content-dashboard-page');
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const { locale } = Route.useParams();

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
    tabItems.find((tab) => getPathWithoutLocale(pathname).startsWith(tab.value))
      ?.value ?? tabItems[0].value;

  return (
    <AuthenticationBarrier
      accessRule={[
        'authenticated',
        'organization-required',
        'project-required',
      ]}
      redirectionRoute={App_Dashboard_Projects_Path}
      locale={locale}
    >
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
                onClick={() => navigate({ to: value })}
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
        <EditorConfigurationProvider>
          <FocusDictionaryProvider>
            <Outlet />
          </FocusDictionaryProvider>
        </EditorConfigurationProvider>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
