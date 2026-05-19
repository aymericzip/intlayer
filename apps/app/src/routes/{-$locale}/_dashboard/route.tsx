import { Button } from '@intlayer/design-system/button';
import { useSession } from '@intlayer/design-system/hooks';
import {
  App_Admin_Users_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { WithResizer } from '@intlayer/design-system/with-resizer';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { getIntlayer, getPathWithoutLocale } from 'intlayer';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardFooter } from '#components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '#components/Dashboard/DashboardNavbar/DashboardNavbar';
import {
  DashboardSidebar,
  type SidebarNavigationItem,
} from '#components/Dashboard/DashboardSidebar';
import { DashboardSkeleton } from '#components/Dashboard/DashboardSkeleton';
import {
  dashboardRightPanelManager,
  useDashboardRightPanel,
} from '#hooks/useDashboardRightPanel';

export const Route = createFileRoute('/{-$locale}/_dashboard')({
  pendingComponent: DashboardSkeleton,
  component: DashboardLayout,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('dashboard-metadata', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
    };
  },
});

function DashboardLayout() {
  const { locale } = useLocale();
  const { session } = useSession();
  const {
    activePanel,
    close: closeRightPanel,
    open: openRightPanel,
  } = useDashboardRightPanel();
  const { pathname } = useLocation();
  const wasVisualEditorOpenRef = useRef(false);
  const hasProject = !!session?.project;

  const isVisualEditorPage =
    getPathWithoutLocale(pathname).startsWith(App_Dashboard_Translate_Path) ||
    getPathWithoutLocale(pathname).startsWith(App_Dashboard_Dictionaries_Path);

  useEffect(() => {
    const currentPanel = dashboardRightPanelManager.getSnapshot().activePanel;
    if (!isVisualEditorPage && currentPanel === 'visual-editor') {
      wasVisualEditorOpenRef.current = true;
      closeRightPanel();
    } else if (isVisualEditorPage && wasVisualEditorOpenRef.current) {
      wasVisualEditorOpenRef.current = false;
      openRightPanel('visual-editor');
    }
  }, [isVisualEditorPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const { navigation } = useIntlayer('dashboard-sidebar');
  const { footerLinks } = useIntlayer('dashboard-footer-content');

  const { translationStatus, aiAssistant, visualEditor, closePanel } =
    useIntlayer('dashboard-route');

  const PANEL_TITLES: Record<string, string> = {
    'translation-status': translationStatus.value,
    'dashboard-chat': aiAssistant.value,
    'visual-editor': visualEditor.value,
  };

  const navigationItems: SidebarNavigationItem[] = [
    {
      key: 'content-group',
      href: App_Dashboard_Editor_Path,
      icon: 'FileText',
      label: navigation.content.label.value,
      title: navigation.content.title.value,
      items: [
        {
          key: 'editor',
          href: App_Dashboard_Editor_Path,
          icon: 'PenTool',
          label: navigation.editor.label.value,
          title: navigation.editor.title.value,
        },
        {
          key: 'translate',
          href: App_Dashboard_Translate_Path,
          icon: 'Globe',
          label: navigation.translate.label.value,
          title: navigation.translate.title.value,
        },
        {
          key: 'dictionaries',
          href: App_Dashboard_Dictionaries_Path,
          icon: 'Book',
          label: navigation.dictionaries.label.value,
          title: navigation.dictionaries.title.value,
        },
        {
          key: 'tags',
          href: App_Dashboard_Tags_Path,
          icon: 'Tags',
          label: navigation.tags.label.value,
          title: navigation.tags.title.value,
        },
      ],
    },
    {
      key: 'ide',
      href: App_Dashboard_IDE_Path,
      icon: 'SquareCode',
      label: navigation.ide.label.value,
      title: navigation.ide.title.value,
    },
    {
      key: 'projects',
      href: App_Dashboard_Projects_Path,
      icon: 'FolderKanban',
      label: navigation.projects.label.value,
      title: hasProject
        ? navigation.project.title.value
        : navigation.projects.title.value,
    },
    {
      key: 'organization',
      href: App_Dashboard_Organization_Path,
      icon: 'Building2',
      label: navigation.organization.label.value,
      title: navigation.organization.title.value,
    },
    {
      key: 'admin',
      href: App_Admin_Users_Path,
      icon: 'Shield',
      label: navigation.admin.label.value,
      title: navigation.admin.title.value,
    },
  ];

  const formattedFooterLinks = footerLinks.map((el) => ({
    href: el.href.value,
    label: el.label.value,
    text: el.text.value,
  }));

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <div
        className="dashboard-theme flex h-screen max-h-screen flex-col bg-card md:overflow-hidden"
        style={{ fontSize: '75%' }}
      >
        <DashboardNavbar items={navigationItems} />
        <div className="flex min-h-0 w-full flex-1">
          <DashboardSidebar items={navigationItems} />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-neutral/40 bg-background">
            <div className="flex flex-1 flex-col overflow-auto">
              <Outlet />
            </div>
          </div>
          <WithResizer
            initialWidth={0}
            defaultOpenWidth={360}
            isOpen={activePanel !== null}
            handlePosition="left"
            style={false}
          >
            <div className="ml-3 flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral/40 bg-background md:mr-2">
              <div className="flex shrink-0 items-center justify-between border-neutral/20 border-b px-3 py-2">
                <span className="font-medium text-sm">
                  {activePanel
                    ? (PANEL_TITLES[activePanel] ?? activePanel)
                    : ''}
                </span>
                <Button
                  type="button"
                  label={closePanel.value}
                  onClick={closeRightPanel}
                  Icon={X}
                  variant="hoverable"
                  size="icon-md"
                />
              </div>
              <div
                id="dashboard-right-panel"
                className="relative flex-1 overflow-hidden"
              />
            </div>
          </WithResizer>
        </div>
        <DashboardFooter locale={locale} links={formattedFooterLinks} />
      </div>
    </AuthenticationBarrier>
  );
}
