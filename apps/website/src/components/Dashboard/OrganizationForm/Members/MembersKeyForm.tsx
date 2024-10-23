'use client';

import { UpdateOrganizationMembersBody, UserAPI } from '@intlayer/backend';
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
} from '@intlayer/design-system/hooks';
import { X } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';
import {
  getOrganizationMembersSchema,
  OrganizationMembersFormData,
} from './MembersFormSchema';

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
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: organization?.membersIds.map((el) => String(el)) ?? [],
      adminsIds: organization?.adminsIds.map((el) => String(el)) ?? [],
    },
  });
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
  } = useIntlayer('organization-members-form');
  const { updateOrganizationMembers } = useUpdateOrganizationMembers();
  const { toast } = useToast();
  const { getUsers, isLoading: isLoadingUsers } = useGetUsers();
  const [users, setUsers] = useState<UserAPI[]>([]);

  const onSubmitSuccess = async (data: OrganizationMembersFormData) => {
    const formattedData: UpdateOrganizationMembersBody = {
      membersIds: data.membersIds.map((el) => ({
        userId: el,
        isAdmin: data.adminsIds.includes(el),
      })),
    };

    await updateOrganizationMembers(formattedData)
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

  useEffect(() => {
    if (organization?.membersIds) {
      getUsers({ ids: organization.membersIds }).then((response) => {
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
          <div className="border-text dark:border-text-dark flex max-h-32 flex-col gap-2 overflow-auto rounded-xl border-2 p-2">
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
                    onClick={() => null}
                  >
                    <X size={16} />
                  </Form.Button>
                )}
              </div>
            ))}
          </div>

          {isOrganizationAdmin && (
            <div className="flex items-end gap-3 align-bottom">
              <Form.Input
                name="email"
                label={newMemberEmailInput.label.value}
                placeholder={newMemberEmailInput.placeholder.value}
                isRequired
              />
              <Form.Button
                className="w-auto"
                type="submit"
                color="text"
                variant="outline"
                isLoading={isSubmitting}
                label={newMemberSubmitButton.label.value}
                onClick={() => null}
              >
                {newMemberSubmitButton.label}
              </Form.Button>
            </div>
          )}

          <Form.MultiSelect
            name="adminsIds"
            label={adminsSelect.label.value}
            placeholder={adminsSelect.placeholder.value}
            description={adminsSelect.description.value}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) => getUserNames(users, value)}
            >
              <MultiSelect.Input placeholder={adminsSelect.placeholder.value} />
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
      )}
    </>
  );
};
