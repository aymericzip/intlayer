'use client';

import type {
  OrganizationAPI,
  UpdateOrganizationMembersBody,
  UserAPI,
} from '@intlayer/backend';
import { Form, Loader, Modal } from '@intlayer/design-system';
import {
  useGetUsers,
  useUpdateOrganizationMembers,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useEffect, type FC } from 'react';

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
  const updateMembersMutation = useUpdateOrganizationMembers() as any;
  const { mutateAsync: updateOrganizationMembers, isPending: isRemoving } =
    updateMembersMutation;
  const { confirmButton, cancelButton, description, title } = useIntlayer(
    'remove-member-modal'
  );
  const usersQuery = useGetUsers() as any;
  const {
    data: usersResponse,
    refetch: getUsers,
    isLoading: isLoadingUsers,
  } = usersQuery;

  const user = usersResponse?.data?.find(
    (user: UserAPI) => String(user.id) === String(memberId)
  );

  useEffect(() => {
    if (organization?.membersIds) {
      const membersIds = organization.membersIds;

      getUsers();
    }
  }, [getUsers, organization]);

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
      title={title.value.replace(
        '{{memberName}}',
        user?.name ?? user?.email ?? String(memberId)
      )}
      size="md"
    >
      <Loader isLoading={isLoadingUsers}>
        <form className="size-full p-3">
          <p className="text-neutral text-sm">{description}</p>
          <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
            <Form.Button
              variant="outline"
              label={cancelButton.label.value}
              color="text"
              type="button"
              isFullWidth={true}
              className="w-auto"
              onClick={onClose}
            >
              {cancelButton.text}
            </Form.Button>
            <Form.Button
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
            </Form.Button>
          </div>
        </form>
      </Loader>
    </Modal>
  );
};
