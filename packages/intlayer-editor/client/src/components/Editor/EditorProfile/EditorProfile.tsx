import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { LogIn, LogOut } from 'lucide-react';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import { useEditorAuth } from '../../EditorAuthProvider';

const DROPDOWN_IDENTIFIER = 'editor-profile';

/**
 * CMS identity of the editor. Signed out, logs in through `intlayer login`;
 * signed in, shows whether the session or the access key is used.
 */
export const EditorProfile: FunctionComponent = () => {
  const content = useIntlayer('editor-profile');
  const editorAuth = useEditorAuth();

  if (!editorAuth) return null;

  const { auth, isLoggingIn, login, logout, isLoggingOut } = editorAuth;

  if (!auth) {
    return (
      <Button
        label={content.login.label.value}
        onClick={login}
        isLoading={isLoggingIn}
        variant="outline"
        color="text"
        // Matches the `sm` locale switcher trigger of the top bar
        size="custom"
        className="min-h-0 px-1.5 py-0.5 text-xs"
        roundedSize="full"
        Icon={LogIn}
        iconClassName="size-3"
      >
        {isLoggingIn ? content.login.pending : content.login.title}
      </Button>
    );
  }

  const { user, project, authType } = auth;
  const displayName = user?.name ?? user?.email ?? project?.name ?? '';

  return (
    <DropDown identifier={DROPDOWN_IDENTIFIER}>
      <DropDown.Trigger
        identifier={DROPDOWN_IDENTIFIER}
        label={content.profileLabel.value}
        size="icon-sm"
        variant="outline"
        color="text"
        roundedSize="full"
        className="border-none p-0!"
      >
        <Avatar
          fullname={displayName}
          src={user?.image ?? undefined}
          size="sm"
        />
      </DropDown.Trigger>
      <DropDown.Panel
        identifier={DROPDOWN_IDENTIFIER}
        isFocusable
        isOverable
        align="end"
      >
        <Container
          className="min-w-56 p-4"
          transparency="xs"
          roundedSize="2xl"
          border
          borderColor="neutral"
        >
          <div className="flex flex-col gap-3">
            {user?.name && (
              <span className="whitespace-nowrap font-bold">{user.name}</span>
            )}
            {user?.email && (
              <span className="whitespace-nowrap text-sm">{user.email}</span>
            )}
            {project?.name && (
              <span className="whitespace-nowrap text-sm">
                {content.project}: {project.name}
              </span>
            )}
            <span className="whitespace-nowrap text-neutral text-xs">
              {authType === 'session'
                ? content.sessionAuth
                : content.accessKeyAuth}
            </span>
            {authType === 'session' && (
              <Button
                label={content.logout.label.value}
                onClick={logout}
                isLoading={isLoggingOut}
                variant="outline"
                color="text"
                size="sm"
                Icon={LogOut}
              >
                {content.logout.title}
              </Button>
            )}
          </div>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
