import {
  App_Admin,
  App_Auth_ChangePassword,
  App_Auth_ResetPassword,
  App_Auth_SignIn,
  App_Auth_SignUp,
  App_Dashboard,
  App_Onboarding,
  App_Pricing,
} from '@intlayer/design-system/routes';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

function getRedirectUrl(pathname: string): string | null {
  const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(\/.*)?$/);
  const hasLocale = !!localeMatch;
  const strippedPath = hasLocale ? localeMatch[3] || '/' : pathname;

  const blogRedirectMatch = strippedPath.match(
    /^\/blog\/i18n-technologies\/(CMS\/wix|CMS\/wordpress|CMS\/drupal|frameworks\/flutter)(\/.*)?$/
  );
  if (blogRedirectMatch) {
    return hasLocale ? `/${localeMatch[1]}/blog` : '/blog';
  }

  if (strippedPath === '/doc/environment/vite-and-react/tanstack-start') {
    return hasLocale
      ? `/${localeMatch[1]}/doc/environment/tanstack-start`
      : '/doc/environment/tanstack-start';
  }

  if (strippedPath === '/pricing') return App_Pricing;
  if (strippedPath === '/onboarding') return App_Onboarding;
  if (strippedPath === '/dashboard') return App_Dashboard;
  if (strippedPath.startsWith('/dashboard/')) {
    return `${App_Dashboard}/${strippedPath.substring('/dashboard/'.length)}`;
  }
  if (strippedPath === '/admin') return App_Admin;
  if (strippedPath.startsWith('/admin/')) {
    return `${App_Admin}/${strippedPath.substring('/admin/'.length)}`;
  }
  if (strippedPath === '/auth/login') return App_Auth_SignIn;
  if (strippedPath === '/auth/register') return App_Auth_SignUp;
  if (strippedPath === '/auth/password/reset') return App_Auth_ResetPassword;
  if (strippedPath === '/auth/password/change') return App_Auth_ChangePassword;

  const mdDocMatch = strippedPath.match(/^\/doc\/(.+)\.md$/);
  if (mdDocMatch) {
    const docSlug = mdDocMatch[1];
    const targetLocale = hasLocale ? localeMatch[1] : 'en';
    return `/${targetLocale}/doc/raw/${docSlug}?format=txt`;
  }

  return null;
}

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ location }) => {
    const pathname = location.pathname;

    if (pathname.includes('/assets/') && !pathname.startsWith('/assets/')) {
      const newPathname = pathname.substring(pathname.indexOf('/assets/'));
      throw redirect({ to: newPathname + location.searchStr, statusCode: 301 });
    }

    const redirectUrl = getRedirectUrl(pathname);
    if (redirectUrl) {
      throw redirect({ to: redirectUrl, statusCode: 301 });
    }
  },
  component: () => <Outlet />,
});
