import { act, fireEvent, render, screen } from '@testing-library/react';
import type { FC } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod/mini';
import {
  Form,
  FormButton,
  FormCheckbox,
  FormInput,
  useForm,
  useFormState,
  useWatch,
} from './index';

const schema = z.object({
  email: z.email('Invalid email'),
  acceptTerms: z.optional(z.boolean()),
});

const TestForm: FC<{ onSubmitSuccess: (data: unknown) => void }> = ({
  onSubmitSuccess,
}) => {
  const form = useForm(schema, { defaultValues: { email: '' } });
  const { isValid } = useFormState(form);
  const email = useWatch({ form, name: 'email' });

  return (
    <Form form={form} onSubmitSuccess={onSubmitSuccess}>
      <FormInput name="email" label="Email" />
      <FormCheckbox name="acceptTerms" inputLabel="Accept" />
      <output data-testid="mirror">{email}</output>
      <output data-testid="valid">{String(isValid)}</output>
      <FormButton type="submit" label="Submit">
        Submit
      </FormButton>
    </Form>
  );
};

const submit = async () => {
  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });
};

describe('Form', () => {
  it('shows schema errors on submit and blocks onSubmitSuccess', async () => {
    const onSubmitSuccess = vi.fn();
    render(<TestForm onSubmitSuccess={onSubmitSuccess} />);

    await submit();

    expect(screen.getByRole('alert').textContent).toBe('Invalid email');
    expect(onSubmitSuccess).not.toHaveBeenCalled();
  });

  it('binds inputs and checkboxes, then submits the parsed values', async () => {
    const onSubmitSuccess = vi.fn();
    const { container } = render(
      <TestForm onSubmitSuccess={onSubmitSuccess} />
    );
    const emailInput = container.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const checkbox = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'me@intlayer.org' } });
    fireEvent.click(checkbox);

    expect(emailInput.value).toBe('me@intlayer.org');
    expect(screen.getByTestId('mirror').textContent).toBe('me@intlayer.org');
    expect(screen.getByTestId('valid').textContent).toBe('true');

    await submit();

    expect(screen.queryByRole('alert')).toBeNull();
    expect(onSubmitSuccess).toHaveBeenCalledWith({
      email: 'me@intlayer.org',
      acceptTerms: true,
    });
  });

  it('shows the submit FormButton as loading while the submit resolves', async () => {
    let resolveSubmit: () => void = () => {};
    const onSubmitSuccess = () =>
      new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
    const { container } = render(
      <TestForm onSubmitSuccess={onSubmitSuccess} />
    );
    const submitButton = () =>
      container.querySelector('button[type="submit"]') as HTMLButtonElement;

    fireEvent.change(container.querySelector('input[name="email"]')!, {
      target: { value: 'me@intlayer.org' },
    });
    await submit();
    expect(submitButton().getAttribute('aria-busy')).toBe('true');
    expect(submitButton().disabled).toBe(true);

    await act(async () => resolveSubmit());
    expect(submitButton().getAttribute('aria-busy')).toBe('false');
  });
});
