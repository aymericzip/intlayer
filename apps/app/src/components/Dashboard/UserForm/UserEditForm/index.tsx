import type { UserAPI } from '@intlayer/backend';
import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import {
  useGetOrganizations,
  useGetUserById,
  useUpdateOrganizationMembersById,
  useUpdateUser,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { toast } from '@intlayer/design-system/toaster';
import { type FC, useEffect, useMemo, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useUserEditSchema } from '../../AdminPage/AdminUsers/useUserEditSchema';
import { UserDates } from './UserDates';
import { UserFormFields } from './UserFormFields';
import { UserHeader } from './UserHeader';

export const UserEditForm: FC<{ userId: string }> = ({ userId }) => {
  const initialOrganizationIds = useRef<string[]>([]);

  const { data: userResponse, isLoading, error } = useGetUserById(userId);

  const { data: organizationsResponse } = useGetOrganizations();
  const organizations = organizationsResponse?.data ?? [];

  const updateUserMutation = useUpdateUser();
  const updateOrganizationMembersByIdMutation =
    useUpdateOrganizationMembersById();

  const UserEditSchema = useUserEditSchema();
  const { form, isSubmitting } = useForm(UserEditSchema);

  const {
    formLabels,
    errorMessages,
    successMessages,
    updateError,
    unknownError,
    userNotFound,
  } = useIntlayer('user-edit-form');

  const user: UserAPI | undefined = userResponse?.data ?? undefined;

  const userOrganizations = useMemo(
    () => organizations.filter((org: any) => org.membersIds?.includes(userId)),
    [organizations, userId]
  );
  const currentOrganizationIds = useMemo(
    () => userOrganizations.map((org: any) => org.id),
    [userOrganizations]
  );

  useEffect(() => {
    if (user && currentOrganizationIds.length >= 0) {
      initialOrganizationIds.current = currentOrganizationIds;

      form.reset({
        name: user.name ?? '-',
        email: user.email ?? '-',
        role: user.role ?? 'user',
        lang: user.lang ?? 'en',
        organizationIds: currentOrganizationIds,
      });
    }
  }, [user, currentOrganizationIds, form]);

  const onSubmitSuccess = async (data: any) => {
    if (!user) return;

    const newOrgIds = data.organizationIds ?? [];
    const orgsToAdd = newOrgIds.filter(
      (id: string) => !initialOrganizationIds.current.includes(id)
    );
    const orgsToRemove = initialOrganizationIds.current.filter(
      (id: string) => !newOrgIds.includes(id)
    );

    const invalidRemovals: string[] = [];
    for (const orgId of orgsToRemove) {
      const org = organizations.find((o: any) => o.id === orgId);
      if (org) {
        const remainingMembers = org.membersIds.filter(
          (id: string) => id !== user.id
        );
        if (remainingMembers.length === 0) {
          invalidRemovals.push(org.name);
        }
      }
    }

    if (invalidRemovals.length > 0) {
      toast({
        title: errorMessages.cannotRemoveLastMember.value,
        description: `${errorMessages.organizationsWithOneUser}: ${invalidRemovals.join(', ')}`,
        variant: 'error',
      });
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        name: data.name,
        email: data.email,
        role: data.role,
        lang: data.lang,
      });

      for (const orgId of orgsToAdd) {
        const org = organizations.find((o: any) => o.id === orgId);
        if (org) {
          const updatedMemberIds = [...(org.membersIds ?? []), user.id];

          await updateOrganizationMembersByIdMutation.mutateAsync({
            organizationId: org.id,
            membersIds: updatedMemberIds,
            adminsIds: org.adminsIds ?? [],
          });
        }
      }

      for (const orgId of orgsToRemove) {
        const org = organizations.find((o: any) => o.id === orgId);
        if (org) {
          const updatedMemberIds = org.membersIds.filter(
            (id: string) => id !== user.id
          );
          const updatedAdminIds =
            org.adminsIds?.filter((id: string) => id !== user.id) ?? [];
          await updateOrganizationMembersByIdMutation.mutateAsync({
            organizationId: org.id,
            membersIds: updatedMemberIds,
            adminsIds:
              updatedAdminIds.length > 0
                ? updatedAdminIds
                : (org.adminsIds ?? []),
          });
        }
      }

      initialOrganizationIds.current = newOrgIds;

      toast({
        title: successMessages.userUpdated.value,
        variant: 'success',
      });
    } catch (error) {
      console.error(updateError.value, error);
      toast({
        title: errorMessages.updateError.value,
        description: (error as Error).message,
        variant: 'error',
      });
    }
  };

  const getOrganizationName = (value: string) => {
    const organization = organizations.find((org: any) => org.id === value);
    return organization?.name ?? '';
  };

  const isLastMemberInOrg = (orgId: string): boolean => {
    const org = organizations.find((o: any) => o.id === orgId);
    return org?.membersIds?.length === 1 && org.membersIds.includes(userId);
  };

  if (error) {
    return (
      <div className="p-6 text-error">
        {errorMessages.loadingError}:{' '}
        {(error as Error)?.message ?? unknownError.value}
      </div>
    );
  }

  return (
    <Loader isLoading={isLoading}>
      {user ? (
        <div className="grid w-full min-w-0 justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
          <div className="mb-auto flex min-w-0 flex-col gap-4">
            <UserHeader user={user} />

            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
            >
              <H3 className="mb-8">{formLabels.title}</H3>

              <Form
                schema={UserEditSchema}
                onSubmitSuccess={onSubmitSuccess}
                className="w-full"
                {...form}
              >
                <UserFormFields
                  organizations={organizations}
                  isLastMemberInOrg={isLastMemberInOrg}
                  getOrganizationName={getOrganizationName}
                />

                <Form.Button
                  type="submit"
                  className="mt-12 w-full"
                  label={formLabels.updateButton.value}
                  isLoading={
                    isSubmitting ||
                    updateUserMutation.isPending ||
                    updateOrganizationMembersByIdMutation.isPending
                  }
                  color="text"
                >
                  {formLabels.updateButton}
                </Form.Button>
              </Form>
            </Container>
          </div>

          <div className="mb-auto flex min-w-0 flex-col gap-4">
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
            >
              <UserDates user={user} />
            </Container>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            {userNotFound}
          </p>
        </div>
      )}
    </Loader>
  );
};
