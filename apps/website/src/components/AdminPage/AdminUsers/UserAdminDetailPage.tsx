'use client';

import type { UserAPI } from '@intlayer/backend';
import {
  Avatar,
  Badge,
  BadgeColor,
  BadgeVariant,
  Form,
  Loader,
  Modal,
  MultiSelect,
  Select,
  toast,
  useForm,
} from '@intlayer/design-system';
import {
  useDeleteUser,
  useGetOrganizations,
  useGetUserById,
  useUpdateOrganizationMembersById,
  useUpdateUser,
} from '@intlayer/design-system/hooks';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useEffect, useMemo, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import { useUserEditSchema } from './useUserEditSchema';

export const UserAdminDetailPage: FC<{ userId: string }> = ({ userId }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [initialOrganizationIds, setInitialOrganizationIds] = useState<
    string[]
  >([]);

  const { data: userResponse, isLoading, error } = useGetUserById(userId);

  const { data: organizationsResponse } = useGetOrganizations() as any;
  const organizations = organizationsResponse?.data ?? [];

  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  const updateOrganizationMembersByIdMutation =
    useUpdateOrganizationMembersById();

  const UserEditSchema = useUserEditSchema();
  const { form, isSubmitting } = useForm(UserEditSchema);

  const {
    title,
    statusLabels,
    formLabels,
    errorMessages,
    deleteSection,
    successMessages,
  } = useIntlayer('user-detail-page');

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
          description: `${errorMessages.organizationsWithOneUser.value}: ${invalidRemovals.join(', ')}`,
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

  const handleDeleteUser = async () => {
    if (!user) return;

    try {
      await deleteUserMutation.mutateAsync(user.id);

      toast({
        title: successMessages.userDeleted.value,
        variant: 'success',
      });

      router.push(PagesRoutes.Admin_Users);
    } catch (error) {
      toast({
        title: errorMessages.deleteError.value,
        description: (error as Error).message,
        variant: 'error',
      });
    } finally {
      setIsDeleteModalOpen(false);
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
      <div className="p-6">
        <div className="text-red-500">
          {errorMessages.loadingError.value}:{' '}
          {(error as Error)?.message ?? 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">
          {title.value}
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
                    ? statusLabels.verified.value
                    : statusLabels.pending.value}
                </Badge>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-card p-6 dark:border-neutral-700">
              <h3 className="mb-6 font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                {formLabels.title.value}
              </h3>

              <Form
                schema={UserEditSchema}
                onSubmitSuccess={onSubmitSuccess}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
                {...form}
              >
                <Form.Input
                  name="name"
                  label={formLabels.name.value}
                  placeholder={formLabels.namePlaceholder.value}
                  isRequired
                />

                <Form.Input
                  name="email"
                  type="email"
                  label={formLabels.email.value}
                  placeholder={formLabels.emailPlaceholder.value}
                  isRequired
                />

                <Form.MultiSelect
                  name="organizationIds"
                  label={formLabels.organizations.value}
                  placeholder={formLabels.organizationsPlaceholder.value}
                  className="md:col-span-2"
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
                                  {formLabels.lastMember.value}
                                </Badge>
                              )}
                            </div>
                          </MultiSelect.Item>
                        );
                      })}
                    </MultiSelect.List>
                  </MultiSelect.Content>
                </Form.MultiSelect>

                <div className="grid grid-cols-1 gap-4 border-neutral-200 border-t pt-4 md:col-span-2 md:grid-cols-2 dark:border-neutral-700">
                  <div>
                    <div className="mb-1 block font-medium text-neutral-600 text-sm dark:text-neutral-400">
                      {formLabels.createdAt.value}
                    </div>
                    <p className="text-neutral-900 dark:text-neutral-100">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 block font-medium text-neutral-600 text-sm dark:text-neutral-400">
                      {formLabels.updatedAt.value}
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
                  className="md:col-span-2"
                >
                  {formLabels.updateButton.value}
                </Form.Button>
              </Form>
            </div>

            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-lg text-red-900 dark:text-red-100">
                <AlertTriangle className="h-5 w-5" />
                {deleteSection.title.value}
              </h3>
              <p className="mb-4 text-red-700 text-sm dark:text-red-300">
                {deleteSection.description.value}
              </p>
              <Form.Button
                label={deleteSection.button.value}
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={deleteUserMutation.isPending}
                Icon={Trash2}
                variant="outline"
                color="error"
              >
                {deleteSection.button.value}
              </Form.Button>
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

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={deleteSection.modalTitle.value}
      >
        <div className="space-y-4 px-4">
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
            <div className="flex-1">
              <p className="font-medium text-red-900 text-sm dark:text-red-100">
                {deleteSection.modalWarning.value}
              </p>
              <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                {deleteSection.modalDescription.value}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Form.Button
              label={deleteSection.cancelButton.value}
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteUserMutation.isPending}
              color="error"
            >
              {deleteSection.cancelButton.value}
            </Form.Button>
            <Form.Button
              label={deleteSection.confirmButton.value}
              onClick={handleDeleteUser}
              isLoading={deleteUserMutation.isPending}
              Icon={Trash2}
            >
              {deleteSection.confirmButton.value}
            </Form.Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
