'use client';

import type { ComponentProps, ElementType, ReactNode, Ref } from 'react';
import { type FieldBinding, FormField } from '../FormField';
import { FormItemLayout, type FormItemLayoutProps } from '../layout';

export type FormElementProps<T extends ElementType> = {
  name: string;
  Element: T;
  label?: ReactNode;
  isRequired?: boolean;
  info?: string;
  showErrorMessage?: boolean;
  focus?: boolean;
  layoutClassName?: string;
  toolParamDescription?: string;
} & Omit<FormItemLayoutProps, 'children'>;

/** Lowercase attribute the browser reads; React's JSX types do not know it yet. */
const getWebMCPParamAttributes = (
  toolParamDescription?: string
): Record<string, string> =>
  toolParamDescription ? { toolparamdescription: toolParamDescription } : {};

/** Calls every ref with the element, so the form and the caller both receive it. */
const mergeRefs =
  <TElement,>(...refs: (Ref<TElement> | undefined)[]) =>
  (element: TElement | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(element);
      else if (ref) ref.current = element;
    }
  };

type ElementOverrides = {
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  ref?: Ref<HTMLElement>;
};

type FormFieldElementProps<T extends ElementType> = FormElementProps<T> &
  ComponentProps<T> & { field: FieldBinding };

const FormFieldElement = <T extends ElementType>({
  field,
  name,
  label,
  Element,
  isRequired = false,
  info,
  description,
  showErrorMessage = true,
  layoutClassName,
  toolParamDescription,
  ...props
}: FormFieldElementProps<T>) => {
  const { value, onChange, ref } = props as ElementOverrides;

  return (
    <FormItemLayout
      htmlFor={name}
      label={label}
      description={description}
      isRequired={isRequired}
      info={info}
      showErrorMessage={showErrorMessage}
      className={layoutClassName}
    >
      <Element
        data-testid="element"
        id={name}
        name={name}
        {...props}
        {...getWebMCPParamAttributes(toolParamDescription)}
        ref={mergeRefs(field.ref, ref)}
        // A caller-provided value wins; fall back to '' to stay controlled
        value={value !== undefined ? value : (field.value ?? '')}
        onChange={(...args: unknown[]) => {
          field.onChange(args[0]);
          onChange?.(...args);
        }}
      />
    </FormItemLayout>
  );
};

/**
 * Renders `Element` as a form field with label, description and error message,
 * controlled through its `value` / `onChange` props.
 */
export const FormElement = <T extends ElementType>(
  props: FormElementProps<T> & ComponentProps<T>
) => (
  <FormField
    name={props.name}
    render={({ field }) => <FormFieldElement {...props} field={field} />}
  />
);
