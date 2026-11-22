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
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-b border-neutral/40 bg-text/5 px-4 py-2 text-sm">
      <span className="flex items-center gap-2 text-neutral">
        <Eye className="size-4 shrink-0" aria-hidden />
        {message}
      </span>
      <div className="flex items-center gap-3">
        <Link
          to={App_Auth_SignUp_Path}
          color="text"
          variant="button"
          label={createProject.label.value}
          className="px-3 py-1 text-xs"
        >
          {createProject.text}
        </Link>
        <Link
          to={App_Auth_SignIn_Path}
          color="text"
          label={signIn.label.value}
          className="text-xs"
        >
          {signIn.text}
        </Link>
      </div>
    </div>
  );
};
