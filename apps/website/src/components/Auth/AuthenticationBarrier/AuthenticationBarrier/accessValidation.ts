import type { AuthenticationBarrierProps } from '.';
import type { Session } from '../useAuth';

export const accessValidation = (
  accessRule: AuthenticationBarrierProps['accessRule'],
  session: Session | null,
  redirectionFunction: (redirectionRoute: string) => void,
  redirectionRoute: string
) => {
  if (
    !session?.user &&
    (accessRule === 'authenticated' || accessRule === 'admin')
  ) {
    redirectionFunction(redirectionRoute);
  }

  if (session?.user && accessRule === 'none-authenticated') {
    redirectionFunction(redirectionRoute);
  }

  if (
    session?.user &&
    accessRule === 'admin' &&
    !session.user?.role.includes('admin')
  ) {
    redirectionFunction(redirectionRoute);
  }
};
