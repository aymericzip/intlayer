'use client';

import {
  AddOrganizationMemberBody,
  UpdateOrganizationMembersBody,
  UserAPI,
} from '@intlayer/backend';
import {
  useForm,
  Form,
  useToast,
  useAuth,
  MultiSelect,
  H3,
  Loader,
} from '@intlayer/design-system';
import {
  useUpdateOrganizationMembers,
  useGetUsers,
  useAddOrganizationMember,
} from '@intlayer/design-system/hooks';
import { X } from 'lucide-react';
import { ObjectId } from 'mongoose';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';
import {
  getOrganizationMembersSchema,
  OrganizationMembersFormData,
} from './MembersFormSchema';
import { getOrganizationNewMembersSchema } from './NewMembersFormSchema';

const getUserNames = (
  users: UserAPI[],
  id: UserAPI['_id'] | string
): string => {
  const user = users.find((user) => String(user._id) === String(id));
  return user?.name ?? user?.email ?? String(id);
};

export const MembersForm: FC = () => {
  const { session, isOrganizationAdmin, checkSession } = useAuth();
  const { organization } = session ?? {};
  const MembersFormSchema = getOrganizationMembersSchema();
  const NewMembersFormSchema = getOrganizationNewMembersSchema();
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: organization?.membersIds.map((el) => String(el)) ?? [],
      adminsIds: organization?.adminsIds.map((el) => String(el)) ?? [],
    },
  });

  const { form: newUserForm, isSubmitting: IsSubmittingNewUser } = useForm(
    NewMembersFormSchema,
    {}
  );
  const {
    title,
    description,
    addMembersButton,
    newMemberEmailInput,
    adminsSelect,
    deleteMemberButton,
    newMemberSubmitButton,
    noMembers,
    updateOrganizationMembersToasts,
    addOrganizationMemberToasts,
  } = useIntlayer('organization-members-form');
  const { updateOrganizationMembers } = useUpdateOrganizationMembers();
  const { addOrganizationMember } = useAddOrganizationMember();
  const { toast } = useToast();
  const { getUsers, isLoading: isLoadingUsers } = useGetUsers();
  const [users, setUsers] = useState<UserAPI[]>([]);

  const handleUpdateMembers = async (data: UpdateOrganizationMembersBody) => {
    await updateOrganizationMembers(data)
      .then(async () => {
        toast({
          title: updateOrganizationMembersToasts.updated.title.value,
          description:
            updateOrganizationMembersToasts.updated.description.value,
          variant: 'success',
        });

        await checkSession();
      })
      .catch((error) => {
        toast({
          title: updateOrganizationMembersToasts.failed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  const onSubmitSuccess = async (data: OrganizationMembersFormData) => {
    const formattedData: UpdateOrganizationMembersBody = {
      membersIds: data.membersIds.map((el) => ({
        userId: el,
        isAdmin: data.adminsIds.includes(el),
      })),
    };

    handleUpdateMembers(formattedData);
  };

  const handleRemoveMember = (memberId: string | ObjectId) => {
    if (!organization) return;

    const formattedData: UpdateOrganizationMembersBody = {
      membersIds: organization.membersIds
        .filter((id) => String(id) !== String(memberId))
        .map((id) => ({
          userId: id,
          isAdmin: organization.adminsIds?.includes(id) ?? false,
        })),
    };

    handleUpdateMembers(formattedData);
  };

  const onSubmitSuccessAddMember = () => {
    const userEmail = newUserForm.getValues('userEmail');
    const formattedData: AddOrganizationMemberBody = {
      userEmail,
    };

    addOrganizationMember(formattedData)
      .then(async () => {
        toast({
          title: addOrganizationMemberToasts.updated.title.value,
          description: addOrganizationMemberToasts.updated.description.value,
          variant: 'success',
        });

        await checkSession();
      })
      .catch((error) => {
        toast({
          title: addOrganizationMemberToasts.failed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    if (organization?.membersIds) {
      const membersIds = organization.membersIds.map((el) => String(el));

      getUsers({ ids: membersIds }).then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      });
    }
  }, [getUsers, organization]);

  return (
    <>
      <H3 className="mb-8"> {title}</H3>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3">
          {isOrganizationAdmin && (
            <Form
              schema={NewMembersFormSchema}
              onSubmitSuccess={onSubmitSuccessAddMember}
              className="flex flex-row items-end gap-3 align-bottom"
              {...newUserForm}
            >
              <Form.Input
                name="userEmail"
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
              <span className="text-neutral dark:text-neutral-dark flex size-full justify-center text-sm">
                {noMembers}
              </span>
            )}
            <div className="border-text dark:border-text-dark flex max-h-48 flex-col gap-2 overflow-auto rounded-xl border-2 p-2">
              {organization?.membersIds.map((memberId) => (
                <div
                  key={String(memberId)}
                  className="bg-text/10 dark:bg-text-dark/10 flex items-center justify-between rounded-lg px-2 py-1"
                >
                  <span>{getUserNames(users, memberId)}</span>
                  {isOrganizationAdmin && (
                    <Form.Button
                      color="text"
                      label={deleteMemberButton.label.value}
                      variant="hoverable"
                      size="icon"
                      onClick={() => handleRemoveMember(memberId)}
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
                getBadgeValue={(value) => getUserNames(users, value)}
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
                      {getUserNames(users, memberId)}
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
