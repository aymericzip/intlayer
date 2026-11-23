import { useSession } from '@intlayer/design-system/api';
import {
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
} from '@intlayer/design-system/routes';
import { Eye } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

/**
 * Sticky strip shown while browsing the shared read-only demo account,
 * pointing visitors to sign-up (or sign-in) to create their own project.
 */
export const DemoBanner: FC = () => {
  const { session } = useSession();
  const { message, createProject, signIn } = useIntlayer('demo-banner');

  if (!session?.isDemo) return null;

  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-20 border-b border-text/80! bg-card px-4 py-3 text-sm">
      <span className="flex min-w-0 items-center gap-2 text-text/80">
        <Eye className="size-4 shrink-0" aria-hidden />
        <span className="truncate">{message}</span>
      </span>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          to={App_Auth_SignUp_Path}
          color="text"
          variant="button"
          size="sm"
          label={createProject.label.value}
        >
          {createProject.text}
        </Link>
        <Link
          to={App_Auth_SignIn_Path}
          color="text"
          variant="button-outlined"
          size="sm"
          label={signIn.label.value}
        >
          {signIn.text}
        </Link>
      </div>
    </div>
  );
};
