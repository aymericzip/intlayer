import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

function getRedirectUrl(_pathname: string): string | null {
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
