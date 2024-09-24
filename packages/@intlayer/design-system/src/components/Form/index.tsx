import { Button } from '../Button';
import {
  FormElement,
  InputElement,
  InputPasswordElement,
  TextAreaElement,
} from './elements';
import { Form as FormRoot } from './Form';
import { FormControl } from './FormControl';
import { FormDescription } from './FormDescription';
import { FormField } from './FormField';
import { FormItem } from './FormItem';
import { FormLabel } from './FormLabel';
import { FormMessage } from './FormMessage';

export { useForm } from './Form';
export { useFormField } from './FormField';

type FormType = typeof FormRoot & {
  Description: typeof FormDescription;
  Control: typeof FormControl;
  Field: typeof FormField;
  Item: typeof FormItem;
  Label: typeof FormLabel;
  Message: typeof FormMessage;
  Element: typeof FormElement;
  Input: typeof InputElement;
  InputPassword: typeof InputPasswordElement;
  TextArea: typeof TextAreaElement;
  Button: typeof Button;
};

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
 *   <Form.Input name="name" label="Name" />
 *   <Form.Button type="submit" label="Click to submit">
 *      Submit
 *   </Form.Button>
 * </Form>
 * ```
 */
export const Form = {
  ...FormRoot,
  Description: FormDescription,
  Control: FormControl,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Message: FormMessage,
  Element: FormElement,
  Input: InputElement,
  InputPassword: InputPasswordElement,
  TextArea: TextAreaElement,
  Button,
} as FormType;
