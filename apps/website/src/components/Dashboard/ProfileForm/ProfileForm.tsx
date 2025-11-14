'use client';

import { Container, Form, H3, useForm } from '@intlayer/design-system';
import { useSession, useUpdateUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import {
  type ProfileFormData,
  useProfileFormSchema,
} from './useProfileFormSchema';

export const ProfileForm: FC = () => {
  const { session } = useSession();
  const { user } = session ?? {};
  const ProfileFormSchema = useProfileFormSchema();
  const { form, isSubmitting } = useForm(ProfileFormSchema);
  const { title, nameInput, emailInput, editButton } =
    useIntlayer('profile-form');
  const { mutate: updateUser, isPending } = useUpdateUser();

  const onSubmitSuccess = (data: ProfileFormData) => {
    if (!user) return;

    updateUser({ ...data, id: String(user.id) });
  };

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [form.reset, user]);

  return (
    <Container
      roundedSize="xl"
      padding="md"
      className="flex size-full max-w-md justify-center"
    >
      <H3 className="mb-8"> {title}</H3>
      <Form
        schema={ProfileFormSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={(data) => console.error(data)}
        className="w-full"
        {...form}
      >
        <Form.Input
          name="name"
          label={nameInput.label}
          placeholder={nameInput.placeholder.value}
          isRequired
          defaultValue={user?.name}
        />
        <Form.Input
          name="email"
          type="email"
          label={emailInput.label}
          placeholder={emailInput.placeholder.value}
          disabled
          defaultValue={user?.email}
        />

        <Form.Button
          className="mt-12 w-full"
          type="submit"
          color="text"
          isLoading={isSubmitting || isPending}
          label={editButton.ariaLabel.value}
        >
          {editButton.text}
        </Form.Button>
      </Form>
    </Container>
  );
};
