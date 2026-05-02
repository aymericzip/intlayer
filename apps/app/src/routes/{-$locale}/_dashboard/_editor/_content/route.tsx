import { Button } from '@intlayer/design-system/button';
import {
  App_Dashboard,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor,
  App_Dashboard_Editor_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import { cn } from '@intlayer/design-system/utils';
import { FocusDictionaryProvider } from '@intlayer/editor-react';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { getLocalizedUrl, getPathWithoutLocale } from 'intlayer';
import { Book, Globe, PenTool } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { EditorConfigurationProvider } from '#components/Dashboard/ContentDashboard/ConfigurationProvider.tsx';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { Editor } from '#components/Dashboard/Editor';
import { DictionaryLoaderDashboard } from '#components/Dashboard/Editor/DictionaryLoaderDashboard';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { validateAuth } from '#utils/auth';

// Fix: Updated the route ID to match the new file location
export const Route = createFileRoute('/{-$locale}/_dashboard/_editor/_content')(
  {
    beforeLoad: async ({ context, location, params }) => {
      const { locale } = params;
      await validateAuth({
        queryClient: context.queryClient,
        pathname: location.pathname,
        search: location.search,
        locale,
        accessRule: [
          'authenticated',
          'organization-required',
          'project-required',
        ],
        redirectionRoute: App_Dashboard_Projects_Path,
      });
    },
    component: EditorLayout,
  }
);

function EditorLayout() {
  const { title, tabItems: tabLabels } = useIntlayer('content-dashboard-page');
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const { locale } = Route.useParams();

  const isEditorActive = getPathWithoutLocale(pathname).startsWith(
    App_Dashboard_Editor_Path
  );

  // We want to keep the editor alive once it has been mounted
  const [isEditorInitialized, setIsEditorInitialized] =
    useState(isEditorActive);

  useEffect(() => {
    if (isEditorActive) {
      setIsEditorInitialized(true);
    }
  }, [isEditorActive]);

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
            {isEditorInitialized && (
              <div
                className={cn(
                  'flex size-full flex-1 flex-col items-center justify-center p-2',
                  isEditorActive ? 'flex' : 'hidden'
                )}
              >
                <BreadcrumbsHeader
                  breadcrumbs={[
                    {
                      name: 'Dashboard',
                      url: getLocalizedUrl(App_Dashboard, locale),
                    },
                    {
                      name: 'Editor',
                      url: getLocalizedUrl(App_Dashboard_Editor, locale),
                    },
                  ]}
                />
                <Editor DictionariesLoader={DictionaryLoaderDashboard} />
              </div>
            )}
            <div
              className={cn(
                'flex size-full flex-1 flex-col',
                !isEditorActive ? 'flex' : 'hidden'
              )}
            >
              <Outlet />
            </div>
          </FocusDictionaryProvider>
        </EditorConfigurationProvider>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
