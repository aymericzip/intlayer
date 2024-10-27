'use client';

import { UpdateProjectMembersBody, UserAPI } from '@intlayer/backend';
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
  useGetUsers,
  useUpdateProjectMembers,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';
import {
  getProjectMembersSchema,
  ProjectMembersFormData,
} from './MembersFormSchema';

const getUserNames = (
  users: UserAPI[],
  id: UserAPI['_id'] | string
): string => {
  const user = users.find((user) => String(user._id) === String(id));
  return user?.name ?? user?.email ?? String(id);
};

export const MembersForm: FC = () => {
  const { session, isProjectAdmin, revalidateSession } = useAuth();
  const { organization, project } = session ?? {};
  const MembersFormSchema = getProjectMembersSchema();
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: project?.membersIds.map((el) => String(el)) ?? [],
      adminsIds: project?.adminsIds.map((el) => String(el)) ?? [],
    },
  });
  const {
    title,
    addMembersButton,
    membersSelect,
    adminsSelect,
    updateProjectMembersToasts,
  } = useIntlayer('project-members-form');
  const { updateProjectMembers } = useUpdateProjectMembers();
  const { toast } = useToast();
  const { getUsers, isLoading: isLoadingUsers } = useGetUsers();
  const [users, setUsers] = useState<UserAPI[]>([]);

  const onSubmitSuccess = async (data: ProjectMembersFormData) => {
    const formattedData: UpdateProjectMembersBody = {
      membersIds: data.membersIds.map((el) => ({
        userId: el,
        isAdmin: data.adminsIds.includes(el),
      })),
    };

    await updateProjectMembers(formattedData)
      .then(async () => {
        toast({
          title: updateProjectMembersToasts.updated.title.value,
          description: updateProjectMembersToasts.updated.description.value,
          variant: 'success',
        });

        await revalidateSession();
      })
      .catch((error) => {
        toast({
          title: updateProjectMembersToasts.failed.title.value,
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
      <H3 className="mb-8">{title}</H3>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <Form
          className="w-full"
          schema={MembersFormSchema}
          onSubmitSuccess={onSubmitSuccess}
          {...form}
        >
          <Form.MultiSelect
            name="membersIds"
            label={membersSelect.label.value}
            placeholder={membersSelect.placeholder.value}
            description={membersSelect.description.value}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) => getUserNames(users, value)}
            >
              <MultiSelect.Input
                placeholder={membersSelect.placeholder.value}
              />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <MultiSelect.List>
                {organization?.membersIds.map((memberId) => (
                  <MultiSelect.Item
                    key={String(memberId)}
                    value={String(memberId)}
                  >
                    {getUserNames(users, memberId)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Form.MultiSelect>
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
                {form.getValues('membersIds').map((memberId) => (
                  <MultiSelect.Item
                    key={String(memberId)}
                    value={String(memberId)}
                  >
                    {getUserNames(users, memberId)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Form.MultiSelect>
          {isProjectAdmin && (
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
