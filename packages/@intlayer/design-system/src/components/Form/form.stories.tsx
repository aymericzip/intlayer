import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod/v4';
import { Select } from '../Select';
import { MultiSelect } from '../Select/Multiselect';
import { Form, useForm } from '.';

type FormStoryArgs = {
  autoComplete: boolean;
  onSubmitSuccess?: (data: unknown) => void;
  onSubmitError?: (error: Error) => void;
};

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    autoComplete: {
      description: 'Enable native autocomplete for inputs',
      control: 'boolean',
      defaultValue: true,
    },
    onSubmitSuccess: { action: 'onSubmitSuccess' },
    onSubmitError: { action: 'onSubmitError' },
  },
};

export default meta;

type Story = StoryObj<typeof Form & FormStoryArgs>;

export const Default: Story = {
  args: {
    autoComplete: true,
  },
  render: ({ autoComplete, onSubmitSuccess, onSubmitError }) => {
    const Schema = z.object({
      name: z.string().min(2, 'Name must have at least 2 characters'),
      email: z.string().email('Enter a valid email'),
      password: z.string().min(6, 'Password must have at least 6 characters'),
      bio: z.string().max(200, 'Bio must be 200 characters or less').optional(),
      acceptTerms: z
        .boolean()
        .refine((v) => v, { message: 'You must accept the terms' }),
      theme: z.enum(['light', 'dark', 'system']),
    });

    const { form } = useForm(Schema, {
      mode: 'onChange',
      defaultValues: {
        name: '',
        email: '',
        password: '',
        bio: '',
        acceptTerms: false,
        theme: 'light',
      },
    });

    return (
      <div className="max-w-xl">
        <Form
          schema={Schema}
          {...form}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitError={onSubmitError}
          autoComplete={autoComplete}
        >
          <Form.Input
            name="name"
            label="Name"
            placeholder="John Doe"
            isRequired
          />

          <Form.Input
            name="email"
            type="email"
            label="Email"
            placeholder="john@example.com"
            isRequired
          />

          <Form.InputPassword name="password" label="Password" isRequired />

          <Form.TextArea
            name="bio"
            label="Bio"
            description="Tell us a bit about yourself"
          />

          <Form.Select name="theme" label="Theme">
            <Select.Trigger>
              <Select.Value placeholder="Select theme" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="light">Light</Select.Item>
              <Select.Item value="dark">Dark</Select.Item>
              <Select.Item value="system">System</Select.Item>
            </Select.Content>
          </Form.Select>

          <Form.MultiSelect name="languages" label="Languages">
            <MultiSelect.Trigger>
              <MultiSelect.Input placeholder="Select languages" />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <MultiSelect.List>
                <MultiSelect.Item value="english">English</MultiSelect.Item>
              </MultiSelect.List>
            </MultiSelect.Content>
          </Form.MultiSelect>

          <Form.Checkbox
            name="acceptTerms"
            label="Terms"
            inputLabel="I accept the terms and conditions"
          />

          <Form.OTP name="otp" label="OTP" maxLength={6} />

          <Form.Button type="submit" label="Button Label" color="text">
            Submit
          </Form.Button>
        </Form>
      </div>
    );
  },
};
