'use client';

import type { AddOrganizationMemberBody, UserAPI } from '@intlayer/backend';
import {
  Form,
  H3,
  Loader,
  MultiSelect,
  useForm,
} from '@intlayer/design-system';
import {
  useAddOrganizationMember,
  useGetUsers,
  useSession,
  useUpdateOrganizationMembers,
} from '@intlayer/design-system/hooks';
import { Plus, X } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { RemoveMemberModal } from './RemoveMemberModal';
import { useOrganizationMembersSchema } from './useMembersFormSchema';
import { useOrganizationNewMembersSchema } from './useNewMembersFormSchema';

export const MembersForm: FC = () => {
  const { session } = useSession();
  const { organization } = session ?? {};
  const MembersFormSchema = useOrganizationMembersSchema();
  const NewMembersFormSchema = useOrganizationNewMembersSchema();
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: organization?.membersIds ?? [],
      adminsIds: organization?.adminsIds ?? [],
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
  const { mutate: updateOrganizationMembers } = useUpdateOrganizationMembers();
  const { mutate: addOrganizationMember } = useAddOrganizationMember();
  const { data: usersResponse, isPending: isLoadingUsers } = useGetUsers({
    ids: organization?.membersIds ?? [],
  });
  const [memberIdToRemove, setMemberIdToRemove] = useState<string>();
  const isOrganizationAdmin = session?.roles.includes('org_admin');

  const onSubmitSuccessAddMember = () => {
    const userEmail = newUserForm.getValues('userEmail');
    const formattedData: AddOrganizationMemberBody = {
      userEmail,
    };

    addOrganizationMember(formattedData);
  };

  useEffect(() => {
    form.reset({
      membersIds: organization?.membersIds ?? [],
      adminsIds: organization?.adminsIds ?? [],
    });
  }, [organization, form]);

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
                className="mb-2"
                type="submit"
                color="text"
                size="icon-lg"
                isLoading={IsSubmittingNewUser}
                label={newMemberSubmitButton.label.value}
                Icon={Plus}
              />
            </Form>
          )}

          <Form
            className="w-full"
            schema={MembersFormSchema}
            onSubmitSuccess={updateOrganizationMembers}
            {...form}
          >
            <div className="flex flex-col gap-2 px-3">
              <Form.Label>{title}</Form.Label>
              <Form.Description>{description}</Form.Description>

              {!organization?.membersIds.length && (
                <span className="flex size-full justify-center text-neutral text-sm">
                  {noMembers}
                </span>
              )}
              <div className="flex max-h-48 flex-col gap-2 overflow-auto rounded-xl border-2 border-text p-2">
                {organization?.membersIds.map((memberId) => (
                  <div
                    key={String(memberId)}
                    className="flex items-center justify-between rounded-lg bg-text/10 px-2 py-1"
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
