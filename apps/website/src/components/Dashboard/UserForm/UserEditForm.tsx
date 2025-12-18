'use client';

import type { UserAPI } from '@intlayer/backend';
import {
  Avatar,
  Badge,
  BadgeColor,
  BadgeVariant,
  Form,
  Loader,
  MultiSelect,
  toast,
  useForm,
} from '@intlayer/design-system';
import {
  useGetOrganizations,
  useGetUserById,
  useUpdateOrganizationMembersById,
  useUpdateUser,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useUserEditSchema } from '../AdminPage/AdminUsers/useUserEditSchema';

export const UserEditForm: FC<{ userId: string }> = ({ userId }) => {
  const [initialOrganizationIds, setInitialOrganizationIds] = useState<
    string[]
  >([]);

  const { data: userResponse, isLoading, error } = useGetUserById(userId);

  const { data: organizationsResponse } = useGetOrganizations();
  const organizations = organizationsResponse?.data ?? [];

  const updateUserMutation = useUpdateUser();
  const updateOrganizationMembersByIdMutation =
    useUpdateOrganizationMembersById();

  const UserEditSchema = useUserEditSchema();
  const { form, isSubmitting } = useForm(UserEditSchema);

  const { title, statusLabels, formLabels, errorMessages, successMessages } =
    useIntlayer('user-edit-form');

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
      setInitialOrganizationIds(currentOrganizationIds);

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

    try {
      const newOrgIds = data.organizationIds ?? [];
      const orgsToAdd = newOrgIds.filter(
        (id: string) => !initialOrganizationIds.includes(id)
      );
      const orgsToRemove = initialOrganizationIds.filter(
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

      setInitialOrganizationIds(newOrgIds);

      toast({
        title: successMessages.userUpdated.value,
        variant: 'success',
      });
    } catch (error) {
      console.error('Update error:', error);
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
        {(error as Error)?.message ?? 'Unknown error'}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">
          {title}
        </h1>
      </div>

      <Loader isLoading={isLoading}>
        {user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-card p-6 dark:border-neutral-700">
              <Avatar
                isLoggedIn={true}
                isLoading={false}
                className="h-16 w-16"
                fullname={user.email}
              />
              <div className="flex-1">
                <h2 className="font-semibold text-neutral-900 text-xl dark:text-neutral-100">
                  {user.name ?? user.email}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {user.email}
                </p>

                <Badge
                  variant={BadgeVariant.OUTLINE}
                  color={
                    user.emailVerified
                      ? BadgeColor.TEXT
                      : BadgeColor.DESTRUCTIVE
                  }
                >
                  {user.emailVerified
                    ? statusLabels.verified
                    : statusLabels.pending}
                </Badge>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-card p-6 dark:border-neutral-700">
              <h3 className="mb-6 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                {formLabels.title}
              </h3>

              <Form
                schema={UserEditSchema}
                onSubmitSuccess={onSubmitSuccess}
                {...form}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Form.Input
                    name="name"
                    label={formLabels.name}
                    placeholder={formLabels.namePlaceholder.value}
                    isRequired
                  />

                  <Form.Input
                    name="email"
                    type="email"
                    label={formLabels.email}
                    placeholder={formLabels.emailPlaceholder.value}
                    isRequired
                  />

                  <Form.MultiSelect
                    name="organizationIds"
                    label={formLabels.organizations.value}
                    placeholder={formLabels.organizationsPlaceholder.value}
                    className=""
                  >
                    <MultiSelect.Trigger
                      getBadgeValue={(value) => getOrganizationName(value)}
                    >
                      <MultiSelect.Input
                        placeholder={formLabels.organizationsPlaceholder.value}
                      />
                    </MultiSelect.Trigger>
                    <MultiSelect.Content>
                      <MultiSelect.List>
                        {organizations.map((org: any) => {
                          const isLastMember = isLastMemberInOrg(org.id);
                          return (
                            <MultiSelect.Item key={org.id} value={org.id}>
                              <div className="flex w-full items-center justify-between">
                                <span>{org.name}</span>
                                {isLastMember && (
                                  <Badge
                                    variant={BadgeVariant.OUTLINE}
                                    color={BadgeColor.DESTRUCTIVE}
                                    className="ml-2 text-xs"
                                  >
                                    {formLabels.lastMember}
                                  </Badge>
                                )}
                              </div>
                            </MultiSelect.Item>
                          );
                        })}
                      </MultiSelect.List>
                    </MultiSelect.Content>
                  </Form.MultiSelect>
                </div>

                <div className="m-3 grid grid-cols-1 gap-4 border-neutral-200 border-t pt-4 md:col-span-2 md:grid-cols-2 dark:border-neutral-700">
                  <div>
                    <div className="mb-1 block font-medium text-neutral-600 text-sm dark:text-neutral-400">
                      {formLabels.createdAt}
                    </div>
                    <p className="text-neutral-900 dark:text-neutral-100">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 block font-medium text-neutral-600 text-sm dark:text-neutral-400">
                      {formLabels.updatedAt}
                    </div>
                    <p className="text-neutral-900 dark:text-neutral-100">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <Form.Button
                  type="submit"
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
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              User not found
            </p>
          </div>
        )}
      </Loader>
    </>
  );
};
