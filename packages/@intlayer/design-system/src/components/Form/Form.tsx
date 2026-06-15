import { Form as FormRoot } from './FormBase';

/**
 * Form components
 *
 * Example of usage:
 * ```jsx
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
