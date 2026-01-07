'use client';

import type { Webhook } from '@intlayer/backend';
import { Button, Form, Modal, useForm } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { z } from 'zod';

const createWebhookSchema = (nameRequired: string, invalidUrl: string) =>
  z.object({
    name: z.string().min(1, nameRequired),
    url: z.url(invalidUrl),
    secret: z.string().optional(),
    enabled: z.boolean().default(true),
  });

type WebhookFormData = z.infer<ReturnType<typeof createWebhookSchema>>;

interface WebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Webhook) => void;
  initialValues?: Webhook;
}

export const WebhookModal: FC<WebhookModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValues,
}) => {
  const { webhooksSection } = useIntlayer('build-settings');
  const { modal, validationErrors } = webhooksSection;

  const schema = createWebhookSchema(
    validationErrors.nameRequired.value,
    validationErrors.invalidUrl.value
  );

  const defaultValues: WebhookFormData = {
    name: '',
    url: '',
    secret: '',
    enabled: true,
  };

  const { form, isSubmitting } = useForm(schema, {
    defaultValues,
  });

  // Reset form when modal opens or initialValues change
  useEffect(() => {
    if (isOpen) {
      form.reset(initialValues ?? defaultValues);
    }
  }, [isOpen, initialValues, form]);

  const onSubmit = (data: WebhookFormData) => {
    onConfirm(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialValues ? modal.titleEdit.value : modal.titleAdd.value}
      size="lg"
      hasCloseButton
      padding="lg"
    >
      <Form schema={schema} onSubmitSuccess={onSubmit} {...form}>
        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <Form.Label>{modal.nameLabel.value}</Form.Label>
            <p className="text-neutral text-xs">
              {modal.nameDescription.value}
            </p>
            <Form.Input
              name="name"
              placeholder="e.g. Production Vercel"
              isRequired
            />
          </div>

          {/* URL Field */}
          <div className="flex flex-col gap-2">
            <Form.Label>{modal.urlLabel.value}</Form.Label>
            <p className="text-neutral text-xs">{modal.urlDescription.value}</p>
            <Form.Input
              name="url"
              placeholder="https://api.vercel.com/..."
              isRequired
            />
          </div>

          {/* Secret Field */}
          <div className="flex flex-col gap-2">
            <Form.Label>{modal.secretLabel.value}</Form.Label>
            <p className="text-neutral text-xs">
              {modal.secretDescription.value}
            </p>
            <Form.Input
              name="secret"
              type="password"
              placeholder="••••••••••••••••"
              autoComplete="off"
            />
          </div>

          {/* Enabled Switch */}
          <Form.SwitchSelector
            name="enabled"
            label="Enable Webhook"
            color="text"
          />

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              color="text"
              onClick={onClose}
              type="button"
              label={modal.cancel.value}
            >
              {modal.cancel.value}
            </Button>
            <Form.Button
              type="submit"
              color="text"
              isLoading={isSubmitting}
              label={modal.confirm.value}
            >
              {modal.confirm.value}
            </Form.Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
