import { render } from '@testing-library/react';
import type { FC } from 'react';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { Form, FormInput, getFormWebMCPAttributes, useForm } from './index';

const schema = z.object({ email: z.string() });

const NewsletterForm: FC<{ autoSubmit?: boolean }> = ({ autoSubmit }) => {
  const { form } = useForm(schema);

  return (
    <Form
      schema={schema}
      toolName="subscribeToNewsletter"
      toolDescription="Subscribe an email address"
      toolAutoSubmit={autoSubmit}
      {...form}
    >
      <FormInput
        name="email"
        label="Email"
        toolParamDescription="Address to subscribe"
      />
    </Form>
  );
};

describe('Form declarative WebMCP attributes', () => {
  it('maps the props onto the lowercase attributes', () => {
    expect(
      getFormWebMCPAttributes({
        toolName: 'searchProducts',
        toolDescription: 'Search',
        toolAutoSubmit: true,
      })
    ).toEqual({
      toolname: 'searchProducts',
      tooldescription: 'Search',
      toolautosubmit: '',
    });
    expect(getFormWebMCPAttributes({})).toEqual({});
  });

  it('renders toolname, tooldescription and toolparamdescription', () => {
    const { container } = render(<NewsletterForm />);
    const form = container.querySelector('form');
    const input = container.querySelector('input[name="email"]');

    expect(form?.getAttribute('toolname')).toBe('subscribeToNewsletter');
    expect(form?.getAttribute('tooldescription')).toBe(
      'Subscribe an email address'
    );
    expect(form?.hasAttribute('toolautosubmit')).toBe(false);
    expect(input?.getAttribute('toolparamdescription')).toBe(
      'Address to subscribe'
    );
  });

  it('emits toolautosubmit as a boolean attribute', () => {
    const { container } = render(<NewsletterForm autoSubmit />);

    expect(
      container.querySelector('form')?.getAttribute('toolautosubmit')
    ).toBe('');
  });
});
