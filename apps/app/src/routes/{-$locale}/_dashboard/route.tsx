import {
  App_Admin_Users_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardFooter } from '#components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '#components/Dashboard/DashboardNavbar/DashboardNavbar';
import {
  DashboardSidebar,
  type SidebarNavigationItem,
} from '#components/Dashboard/DashboardSidebar';
import { DashboardSkeleton } from '#components/Dashboard/DashboardSkeleton';
import { WarmupClient } from '#components/Dashboard/WarmupClient';
import { validateAuth } from '#utils/auth';

export const Route = createFileRoute('/{-$locale}/_dashboard')({
  beforeLoad: async ({ context, location, params }) => {
    const { locale } = params;
    await validateAuth({
      queryClient: context.queryClient,
      pathname: location.pathname,
      search: location.search,
      locale,
      accessRule: 'authenticated',
    });
  },
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
      ],
    };
  },
});

function DashboardLayout() {
  const { locale } = useLocale();

  const { collapseButton, navigation } = useIntlayer('dashboard-sidebar');
  const { footerLinks } = useIntlayer('dashboard-footer-content');

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
      ],
    },
    {
      key: 'tags',
      href: App_Dashboard_Tags_Path,
      icon: 'Tags',
      label: navigation.tags.label.value,
      title: navigation.tags.title.value,
    },
    {
      key: 'projects',
      href: App_Dashboard_Projects_Path,
      icon: 'FolderKanban',
      label: navigation.projects.label.value,
      title: navigation.projects.title.value,
    },
    {
      key: 'organization',
      href: App_Dashboard_Organization_Path,
      icon: 'Building2',
      label: navigation.organization.label.value,
      title: navigation.organization.title.value,
    },
    {
      key: 'profile',
      href: App_Dashboard_Profile_Path,
      icon: 'User',
      label: navigation.profile.label.value,
      title: navigation.profile.title.value,
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
      <WarmupClient />
      <div
        className="dashboard-theme flex h-screen max-h-screen flex-col bg-card md:overflow-hidden"
        style={{ fontSize: '75%' }}
      >
        <DashboardNavbar items={navigationItems} />
        <div className="flex min-h-0 w-full flex-1">
          <DashboardSidebar
            items={navigationItems}
            collapseButtonLabel={collapseButton.label.value}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-background">
            <div className="flex flex-1 flex-col overflow-auto md:mr-2">
              <Outlet />
            </div>
          </div>
        </div>
        <DashboardFooter locale={locale} links={formattedFooterLinks} />
      </div>
    </AuthenticationBarrier>
  );
}
