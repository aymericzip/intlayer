'use client';

import type {
  AddOrganizationMemberBody,
  UpdateOrganizationMembersBody,
  UserAPI,
} from '@intlayer/backend';
import {
  Form,
  H3,
  Loader,
  MultiSelect,
  useForm,
} from '@intlayer/design-system';
import {
  useAddOrganizationMember,
  useAuth,
  useGetUsers,
  useUpdateOrganizationMembers,
} from '@intlayer/design-system/hooks';
import { X } from 'lucide-react';
import type { ObjectId } from 'mongoose';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';
import { RemoveMemberModal } from './RemoveMemberModal';
import {
  useOrganizationMembersSchema,
  type OrganizationMembersFormData,
} from './useMembersFormSchema';
import { useOrganizationNewMembersSchema } from './useNewMembersFormSchema';

export const MembersForm: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};
  const MembersFormSchema = useOrganizationMembersSchema();
  const NewMembersFormSchema = useOrganizationNewMembersSchema();
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: organization?.membersIds.map((el) => String(el)) ?? [],
      adminsIds: (organization?.adminsIds ?? []).map((el) => String(el)) ?? [],
    },
  });

  const { form: newUserForm, isSubmitting: IsSubmittingNewUser } =
    useForm(NewMembersFormSchema);
  const {
    title,
    description,
    addMembersButton,
    newMemberEmailInput,
    adminsSelect,
    deleteMemberButton,
    newMemberSubmitButton,
    noMembers,
  } = useIntlayer('organization-members-form');
  const { updateOrganizationMembers } = useUpdateOrganizationMembers();
  const { addOrganizationMember } = useAddOrganizationMember();
  const {
    data: usersResponse,
    getUsers,
    isWaitingData: isLoadingUsers,
  } = useGetUsers();
  const [memberIdToRemove, setMemberIdToRemove] = useState<ObjectId>();
  const isOrganizationAdmin = false;

  const onSubmitSuccess = async (data: OrganizationMembersFormData) => {
    const formattedData: UpdateOrganizationMembersBody = {
      membersIds: data.membersIds.map((el) => ({
        userId: el,
        isAdmin: data.adminsIds.includes(el),
      })),
    };

    await updateOrganizationMembers(formattedData);
  };

  const onSubmitSuccessAddMember = async () => {
    const userEmail = newUserForm.getValues('userEmail');
    const formattedData: AddOrganizationMemberBody = {
      userEmail,
    };

    await addOrganizationMember(formattedData);
  };

  useEffect(() => {
    if (organization?.membersIds) {
      const membersIds = organization.membersIds.map((el) => String(el));

      getUsers({ ids: membersIds });
    }
  }, [getUsers, organization]);

  const getUserName = (memberId: UserAPI['id'] | string) => {
    const user = usersResponse?.data?.find(
      (user) => String(user.id) === String(memberId)
    );
    return user?.name ?? user?.email ?? String(memberId);
  };

  return (
    <>
      <RemoveMemberModal
        organization={organization}
        memberId={memberIdToRemove}
        isOpen={Boolean(memberIdToRemove)}
        onClose={() => setMemberIdToRemove(undefined)}
        onRemove={() => setMemberIdToRemove(undefined)}
      />
      <H3 className="mb-8">{title}</H3>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3">
          {isOrganizationAdmin && (
            <Form
              schema={NewMembersFormSchema}
              onSubmitSuccess={onSubmitSuccessAddMember}
              className="flex flex-row items-end gap-3 align-bottom"
              autoComplete={false}
              {...newUserForm}
            >
              <Form.Input
                name="userEmail"
                type="email"
                label={newMemberEmailInput.label.value}
                placeholder={newMemberEmailInput.placeholder.value}
              />
              <Form.Button
                className="w-auto"
                type="submit"
                color="text"
                variant="outline"
                isLoading={IsSubmittingNewUser}
                label={newMemberSubmitButton.label.value}
              >
                {newMemberSubmitButton.label}
              </Form.Button>
            </Form>
          )}

          <Form
            className="w-full"
            schema={MembersFormSchema}
            onSubmitSuccess={onSubmitSuccess}
            {...form}
          >
            <Form.Label>{title}</Form.Label>
            <Form.Description>{description}</Form.Description>

            {!organization?.membersIds.length && (
              <span className="text-neutral flex size-full justify-center text-sm">
                {noMembers}
              </span>
            )}
            <div className="border-text flex max-h-48 flex-col gap-2 overflow-auto rounded-xl border-2 p-2">
              {organization?.membersIds.map((memberId) => (
                <div
                  key={String(memberId)}
                  className="bg-text/10 flex items-center justify-between rounded-lg px-2 py-1"
                >
                  <span>{getUserName(memberId)}</span>
                  {isOrganizationAdmin && (
                    <Form.Button
                      color="text"
                      label={deleteMemberButton.label.value}
                      variant="hoverable"
                      size="icon-md"
                      onClick={() => setMemberIdToRemove(memberId)}
                    >
                      <X size={16} />
                    </Form.Button>
                  )}
                </div>
              ))}
            </div>

            <Form.MultiSelect
              name="adminsIds"
              label={adminsSelect.label.value}
              placeholder={adminsSelect.placeholder.value}
              description={adminsSelect.description.value}
            >
              <MultiSelect.Trigger
                getBadgeValue={(value) => getUserName(value)}
              >
                <MultiSelect.Input
                  placeholder={adminsSelect.placeholder.value}
                />
              </MultiSelect.Trigger>
              <MultiSelect.Content>
                <MultiSelect.List>
                  {organization?.membersIds.map((memberId) => (
                    <MultiSelect.Item
                      value={String(memberId)}
                      key={String(memberId)}
                    >
                      {getUserName(memberId)}
                    </MultiSelect.Item>
                  ))}
                </MultiSelect.List>
              </MultiSelect.Content>
            </Form.MultiSelect>

            {isOrganizationAdmin && (
              <Form.Button
                className="w-full"
                type="submit"
                color="text"
                isLoading={isSubmitting}
                label={addMembersButton.label.value}
                onClick={() => null}
              >
                {addMembersButton.text}
              </Form.Button>
            )}
          </Form>
        </div>
      )}
    </>
  );
};
