import type {
  OrganizationAPI,
  UpdateOrganizationMembersBody,
  UserAPI,
} from '@intlayer/backend';
import {
  useGetUsers,
  useUpdateOrganizationMembers,
} from '@intlayer/design-system/api';
import { Form, FormButton } from '@intlayer/design-system/form';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type RemoveMemberModalProps = {
  organization: OrganizationAPI | undefined | null;
  memberId: UserAPI['id'] | null | undefined;
  isOpen: boolean;
  onClose?: () => void;
  onRemove?: () => void;
};

export const RemoveMemberModal: FC<RemoveMemberModalProps> = ({
  organization,
  memberId,
  onClose,
  onRemove,
  isOpen,
}) => {
  const { mutateAsync: updateOrganizationMembers, isPending: isRemoving } =
    useUpdateOrganizationMembers();
  const { confirmButton, cancelButton, description, title } = useIntlayer(
    'remove-member-modal'
  );
  const { data: usersResponse, isLoading: isLoadingUsers } = useGetUsers({
    ids: organization?.membersIds ?? [],
  });

  const user = usersResponse?.data?.find(
    (user: UserAPI) => String(user.id) === String(memberId)
  );

  const handleRemoveMember = async () => {
    if (!organization) return;
    if (!memberId) return;

    const formattedData: UpdateOrganizationMembersBody = {
      membersIds: organization.membersIds.filter(
        (id) => String(id) !== String(memberId)
      ),
      adminsIds: organization.adminsIds?.filter(
        (id) => String(id) !== String(memberId)
      ),
    };

    await updateOrganizationMembers(formattedData);

    onRemove?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title({
        memberName: user?.name ?? user?.email ?? String(memberId),
      })}
      size="md"
      hasCloseButton
      padding="md"
    >
      <Loader isLoading={isLoadingUsers}>
        <form className="size-full p-3">
          <p className="text-neutral text-sm">{description}</p>
          <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
            <FormButton
              variant="outline"
              label={cancelButton.label.value}
              color="text"
              type="button"
              isFullWidth={true}
              className="w-auto"
              onClick={onClose}
            >
              {cancelButton.text}
            </FormButton>
            <FormButton
              variant="outline"
              label={confirmButton.label.value}
              isFullWidth={true}
              color="error"
              className="w-auto"
              isLoading={isRemoving}
              disabled={isRemoving}
              onClick={handleRemoveMember}
            >
              {confirmButton.text}
            </FormButton>
          </div>
        </form>
      </Loader>
    </Modal>
  );
};
