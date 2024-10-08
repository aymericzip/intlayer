'use client';

import { AddNewAccessKeyResponse } from '@intlayer/backend';
import { Form, useForm, useToast } from '@intlayer/design-system';
import { useAddNewAccessKey } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  AccessKeyFormCreationData,
  getAccessKeyCreationSchema,
} from './AccessKeyCreationFormSchema';

type AccessKeyCreationFormProps = {
  onAccessKeyCreated: (response: AddNewAccessKeyResponse) => void;
};

export const AccessKeyCreationForm: FC<AccessKeyCreationFormProps> = ({
  onAccessKeyCreated,
}) => {
  const AccessKeyCreationSchema = getAccessKeyCreationSchema();
  const { addNewAccessKey } = useAddNewAccessKey();
  const { nameInput, createAccessKeyButton, createAccessKeyToasts } =
    useIntlayer('access-key-creation-form');
  const { form, isSubmitting } = useForm(AccessKeyCreationSchema);
  const { toast } = useToast();

  const onSubmitSuccess = (data: AccessKeyFormCreationData) => {
    // Send a request to the backend to create the access key
    addNewAccessKey(data).then((response) => {
      toast({
        title: createAccessKeyToasts.accessKeyCreated.title.value,
        description: createAccessKeyToasts.accessKeyCreated.description.value,
        variant: 'success',
      });
      onAccessKeyCreated(response);
    });
  };

  return (
    <Form
      schema={AccessKeyCreationSchema}
      {...form}
      className="flex min-w-64 flex-col items-center justify-center"
      autoComplete={false}
      onSubmitSuccess={onSubmitSuccess}
    >
      <Form.Input
        name="name"
        label={nameInput.label.value}
        placeholder={nameInput.placeholder.value}
      />
      <Form.Button
        type="submit"
        label={createAccessKeyButton.label.value}
        color="text"
        isLoading={isSubmitting}
        className="w-full"
      >
        {createAccessKeyButton.text.value}
      </Form.Button>
    </Form>
  );
};
