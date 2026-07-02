import { useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import {
  App_Admin_Users_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
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
import { TranslationStatusBar } from '#components/TranslationStatusBar';
import {
  dashboardRightPanelManager,
  useDashboardRightPanel,
} from '#hooks/useDashboardRightPanel';
import { useDictionarySidebar } from '#hooks/useDictionarySidebar';
import { useEditorPagesSidebar } from '#hooks/useEditorPagesSidebar';
import { useTagSidebar } from '#hooks/useTagSidebar';

export const Route = createFileRoute('/{-$locale}/_dashboard')({
  pendingComponent: DashboardSkeleton,
  component: DashboardLayout,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('dashboard-metadata', locale);
    const siteUrl = import.meta.env.VITE_SITE_URL;
    const pageUrl = locale ? `${siteUrl}/${locale}` : siteUrl;

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
        { property: 'og:title', content: content.metadata.title },
        { property: 'og:description', content: content.metadata.description },
        { property: 'og:url', content: pageUrl },
        { property: 'og:image', content: `${siteUrl}/cover.png` },
        { name: 'twitter:title', content: content.metadata.title },
        {
          name: 'twitter:description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function DashboardLayout() {
  const { locale } = useLocale();
  const { session } = useSession();
  const { sidebarKeys, pinnedKeys, pin, unpin, removeRecent, trackVisit } =
    useDictionarySidebar();
  const {
    sidebarKeys: tagSidebarKeys,
    pinnedKeys: pinnedTagKeys,
    pin: pinTag,
    unpin: unpinTag,
    removeRecent: removeRecentTag,
    trackVisit: trackVisitTag,
  } = useTagSidebar();
  const {
    sidebarPaths: editorPageSidebarKeys,
    pinnedPaths: pinnedEditorPageKeys,
    pin: pinEditorPage,
    unpin: unpinEditorPage,
    removeRecent: removeRecentEditorPage,
  } = useEditorPagesSidebar();
  const {
    activePanel,
    close: closeRightPanel,
    open: openRightPanel,
  } = useDashboardRightPanel();
  const { pathname } = useLocation();
  const wasVisualEditorOpenRef = useRef(false);
  const hasProject = !!session?.project;

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  const isVisualEditorPage =
    pathWithoutLocale.startsWith(App_Dashboard_Translate_Path) ||
    pathWithoutLocale.startsWith(App_Dashboard_Dictionaries_Path);

  const dictionaryDetailMatch = pathWithoutLocale.match(
    new RegExp(`^${App_Dashboard_Dictionaries_Path}/(.+)$`)
  );
  const currentDictionaryKey = dictionaryDetailMatch?.[1] ?? null;

  const tagDetailMatch = pathWithoutLocale.match(
    new RegExp(`^${App_Dashboard_Tags_Path}/(.+)$`)
  );
  const currentTagKey = tagDetailMatch?.[1] ?? null;

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

  useEffect(() => {
    if (currentDictionaryKey) {
      trackVisit(currentDictionaryKey);
    }
  }, [currentDictionaryKey, trackVisit]);

  useEffect(() => {
    if (currentTagKey) {
      trackVisitTag(currentTagKey);
    }
  }, [currentTagKey, trackVisitTag]);

  const { navigation } = useIntlayer('dashboard-sidebar');
  const { footerLinks } = useIntlayer('dashboard-footer-content');

  const {
    translationStatus,
    aiAssistant,
    visualEditor,
    closePanel,
    mainContentAriaLabel,
    sidePanelAriaLabel,
  } = useIntlayer('dashboard-route');

  const PANEL_TITLES: Record<string, string> = {
    'translation-status': translationStatus.value,
    'dashboard-chat': aiAssistant.value,
    'visual-editor': visualEditor.value,
  };

  const navigationItems: SidebarNavigationItem[] = [
    {
      key: 'overview',
      href: App_Home_Path,
      icon: 'LayoutDashboard',
      label: navigation.overview.label.value,
      title: navigation.overview.title.value,
    },
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
          items:
            editorPageSidebarKeys.length > 0
              ? editorPageSidebarKeys.map((path) => ({
                  key: `editor-page-${path}`,
                  href: `${App_Dashboard_Editor_Path}?path=${encodeURIComponent(path)}`,
                  label: path,
                  title: path,
                }))
              : undefined,
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
          items:
            sidebarKeys.length > 0
              ? sidebarKeys.map((dictionaryKey) => ({
                  key: `dictionary-${dictionaryKey}`,
                  href: `${App_Dashboard_Dictionaries_Path}/${dictionaryKey}`,
                  label: dictionaryKey,
                  title: dictionaryKey,
                }))
              : undefined,
        },
        {
          key: 'tags',
          href: App_Dashboard_Tags_Path,
          icon: 'Tags',
          label: navigation.tags.label.value,
          title: navigation.tags.title.value,
          items:
            tagSidebarKeys.length > 0
              ? tagSidebarKeys.map((tagKey) => ({
                  key: `tag-${tagKey}`,
                  href: `${App_Dashboard_Tags_Path}/${tagKey}`,
                  label: tagKey,
                  title: tagKey,
                }))
              : undefined,
        },
        {
          key: 'assets',
          href: App_Dashboard_Assets_Path,
          icon: 'Image',
          label: navigation.assets.label.value,
          title: navigation.assets.title.value,
        },
      ],
    },
    {
      key: 'scanner',
      href: App_Dashboard_Scanner_Path,
      icon: 'ScanLine',
      label: navigation.scanner.label.value,
      title: navigation.scanner.title.value,
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
        <div className="relative flex min-h-0 w-full flex-1">
          <DashboardSidebar
            items={navigationItems}
            onPinDictionary={pin}
            onUnpinDictionary={unpin}
            onRemoveDictionary={removeRecent}
            pinnedDictionaryKeys={pinnedKeys}
            onPinTag={pinTag}
            onUnpinTag={unpinTag}
            onRemoveTag={removeRecentTag}
            pinnedTagKeys={pinnedTagKeys}
            onPinEditorPage={pinEditorPage}
            onUnpinEditorPage={unpinEditorPage}
            onRemoveEditorPage={removeRecentEditorPage}
            pinnedEditorPageKeys={pinnedEditorPageKeys}
          />
          <main
            id="main-content"
            aria-label={mainContentAriaLabel.value}
            className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-neutral/40 bg-background"
          >
            <div className="flex flex-1 flex-col overflow-auto">
              <Outlet />
            </div>
            <TranslationStatusBar />
          </main>
          <WithResizer
            initialWidth={0}
            defaultOpenWidth={360}
            isOpen={activePanel !== null}
            handlePosition="left"
            style={false}
            className={cn(
              'md:min-w-2',
              activePanel !== null &&
                'max-md:absolute! max-md:inset-y-0 max-md:right-0 max-md:z-50 max-md:w-full! max-md:max-w-none!'
            )}
          >
            <aside
              aria-label={
                activePanel && PANEL_TITLES[activePanel]
                  ? PANEL_TITLES[activePanel]
                  : sidePanelAriaLabel.value
              }
              className="ml-3 flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral/40 bg-background md:mr-2"
            >
              <div className="flex shrink-0 items-center justify-between border-neutral/20 border-b px-3 py-2">
                <span className="font-medium text-sm" aria-hidden="true">
                  {activePanel && PANEL_TITLES[activePanel]
                    ? PANEL_TITLES[activePanel]
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
            </aside>
          </WithResizer>
        </div>
        <DashboardFooter locale={locale} links={formattedFooterLinks} />
      </div>
    </AuthenticationBarrier>
  );
}
