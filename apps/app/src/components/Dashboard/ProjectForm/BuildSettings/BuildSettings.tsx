'use client';

import type { ProjectConfigCI, Webhook } from '@intlayer/backend';
import {
  Button,
  Container,
  Form,
  H3,
  H4,
  useForm,
} from '@intlayer/design-system';
import {
  useGetCIConfig,
  useSession,
  useTriggerBuild,
  useTriggerWebhook,
  useUpdateProject,
} from '@intlayer/design-system/hooks';
import { CheckCircle, Pencil, Play, Plus, Trash, XCircle } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { z } from 'zod';
import { CIWorkflowModal } from './CIWorkflowModal';
import { WebhookModal } from './WebhookModal';

// Only validation needed here is for the global toggle
const buildSettingsSchema = z.object({
  autoTriggerBuilds: z.boolean(),
});

type BuildSettingsFormData = z.infer<typeof buildSettingsSchema>;

export const BuildSettings: FC = () => {
  const { session } = useSession();
  const { project } = session ?? {};
  const isProjectAdmin = session?.roles?.includes('project_admin');

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: triggerBuild, isPending: isBuilding } = useTriggerBuild();
  const { mutate: triggerWebhook, isPending: isTriggeringWebhook } =
    useTriggerWebhook();

  const {
    title,
    gitProviderSection,
    webhooksSection,
    testTriggerButton,
    saveButton,
  } = useIntlayer('build-settings');

  // We keep a local state for the webhooks list that syncs with DB
  const [webhooksList, setWebhooksList] = useState<Webhook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCIModalOpen, setIsCIModalOpen] = useState(false);

  // CI Configuration
  const {
    data: ciStatus,
    isLoading: isLoadingCI,
    refetch: checkCI,
  } = useGetCIConfig({
    enabled: false, // Only fetch when button clicked
  });

  // Initialize from project data
  useEffect(() => {
    if (project?.webhooks?.webhooks) {
      setWebhooksList(project.webhooks.webhooks as Webhook[]);
    }
  }, [project?.webhooks?.webhooks]);

  const defaultValues: BuildSettingsFormData = {
    autoTriggerBuilds: project?.webhooks?.autoTriggerBuilds ?? false,
  };

  const { form } = useForm(buildSettingsSchema, {
    defaultValues,
  });

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleModalConfirm = (data: Webhook) => {
    const newList = [...webhooksList];
    if (editingIndex !== null) {
      // Update existing
      newList[editingIndex] = { ...newList[editingIndex], ...data };
    } else {
      // Add new
      newList.push(data);
    }
    setWebhooksList(newList);
  };

  const handleDelete = (index: number) => {
    setWebhooksList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = (formData: BuildSettingsFormData) => {
    const config: ProjectConfigCI = {
      autoTriggerBuilds: formData.autoTriggerBuilds,
      webhooks: webhooksList,
    };

    updateProject(
      { webhooks: config },
      {
        onSuccess: () => {
          // Optional toast here
        },
      }
    );
  };

  const handleTestTrigger = () => {
    triggerBuild(undefined);
  };

  const handleTestWebhook = (index: number) => {
    triggerWebhook(index);
  };

  const handleCheckCI = async () => {
    const result = await checkCI();
    if (result.data) {
      setIsCIModalOpen(true);
    }
    setIsCIModalOpen(true);
  };

  const provider = project?.repository?.provider;

  return (
    <>
      <Form
        schema={buildSettingsSchema}
        onSubmitSuccess={handleSaveAll}
        className="flex w-full flex-col gap-8"
        {...form}
      >
        <H3>{title}</H3>

        {/* Git Provider Integration Section */}
        <Container
          roundedSize="2xl"
          border={true}
          borderColor="text"
          className="flex flex-col gap-4 px-6 py-4"
        >
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <H4 className="capitalize">
                {provider
                  ? gitProviderSection.title({ provider })
                  : gitProviderSection.noProvider}
              </H4>
              <p className="max-w-md text-neutral text-sm">
                {gitProviderSection.description}
              </p>
            </div>
            <div className="flex-0">
              <Form.SwitchSelector
                name="autoTriggerBuilds"
                disabled={!isProjectAdmin || !provider}
                color="text"
                size="sm"
              />
            </div>
          </div>

          {provider && (
            <div className="mt-2 flex flex-wrap justify-end gap-2 pt-4">
              <Button
                variant="outline"
                color="text"
                label={gitProviderSection.configureCIButton.ariaLabel.value}
                onClick={handleCheckCI}
                disabled={isLoadingCI}
                isLoading={isLoadingCI}
              >
                {gitProviderSection.configureCIButton.text}
              </Button>
              <Button
                color="text"
                label={testTriggerButton.ariaLabel.value}
                onClick={handleTestTrigger}
                disabled={isBuilding}
                isLoading={isBuilding}
                Icon={Play}
              >
                {testTriggerButton.text}
              </Button>
            </div>
          )}
        </Container>

        {/* Webhooks List Section */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <H4>{webhooksSection.title}</H4>
              <p className="text-neutral text-sm">
                {webhooksSection.description}
              </p>
            </div>

            <div className="flex-0">
              <Button
                variant="default"
                label={webhooksSection.addButton.ariaLabel.value}
                onClick={handleOpenAdd}
                disabled={!isProjectAdmin}
                Icon={Plus}
                color="text"
                size="sm"
              >
                {webhooksSection.addButton.text}
              </Button>
            </div>
          </div>

          {/* List Display */}
          <div className="flex flex-col gap-3">
            {webhooksList.length === 0 ? (
              <Container
                roundedSize="2xl"
                border={true}
                background="none"
                borderColor="neutral"
                className="h-20 items-center justify-center px-6 py-2"
              >
                <p className="text-neutral text-sm">
                  {webhooksSection.noWebhooks}
                </p>
              </Container>
            ) : (
              webhooksList.map((webhook, index) => (
                <Container
                  key={index}
                  roundedSize="2xl"
                  border={true}
                  background="none"
                  borderColor="text"
                  className="flex-row justify-between px-6 py-2"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold">
                        {webhook.name}
                      </span>
                      {webhook.enabled ? (
                        <span className="flex items-center gap-1 rounded-full bg-text/10 px-2 py-0.5 font-medium text-text text-xs">
                          <CheckCircle size={12} />{' '}
                          {webhooksSection.list.enabled}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-neutral/10 px-2 py-0.5 font-medium text-neutral text-xs">
                          <XCircle size={12} /> {webhooksSection.list.disabled}
                        </span>
                      )}
                    </div>
                    <span className="block truncate text-neutral text-xs">
                      {webhook.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="hoverable"
                      color="text"
                      size="icon-sm"
                      disabled={!isProjectAdmin || isTriggeringWebhook}
                      onClick={() => handleTestWebhook(index)}
                      label={testTriggerButton.ariaLabel.value}
                      isLoading={isTriggeringWebhook}
                      Icon={Play}
                    />
                    <Button
                      variant="hoverable"
                      color="text"
                      size="icon-sm"
                      disabled={!isProjectAdmin}
                      onClick={() => handleOpenEdit(index)}
                      label={webhooksSection.list.edit.value}
                      Icon={Pencil}
                    />
                    <Button
                      variant="hoverable"
                      color="text"
                      className="hover:text-error"
                      size="icon-sm"
                      disabled={!isProjectAdmin}
                      onClick={() => handleDelete(index)}
                      label={webhooksSection.list.delete.value}
                      Icon={Trash}
                    />
                  </div>
                </Container>
              ))
            )}
          </div>
        </div>

        {/* Global Save Button */}
        {isProjectAdmin && (
          <div className="flex justify-end border-neutral/10 border-t">
            <Form.Button
              type="submit"
              label={saveButton.ariaLabel.value}
              color="text"
              isLoading={isUpdating}
              disabled={!isProjectAdmin}
              isFullWidth={false}
            >
              {saveButton.text}
            </Form.Button>
          </div>
        )}
      </Form>

      <WebhookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        initialValues={
          editingIndex !== null ? webhooksList[editingIndex] : undefined
        }
      />

      <CIWorkflowModal
        isOpen={isCIModalOpen}
        onClose={() => setIsCIModalOpen(false)}
        provider={provider}
        isLoading={isLoadingCI}
        ciStatus={ciStatus?.data}
      />
    </>
  );
};
