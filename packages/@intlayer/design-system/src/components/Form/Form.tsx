import { Form as FormRoot } from './FormBase';

/**
 * Form component
 *
 * Example of usage:
 * ```jsx
 * import { Form, FormInput, FormButton } from '@intlayer/design-system/form';
 *
 * <Form
 *  schema={ZodSchema}
 *  onSubmitSuccess={onSubmitSuccess}
 *  onSubmitError={onSubmitError}
 *  autoComplete
 * >
 *   <FormInput name="name" label="Name" />
 *   <FormButton type="submit" label="Click to submit">
 *      Submit
 *   </FormButton>
 * </Form>
 * ```
 */
export const Form = FormRoot;
