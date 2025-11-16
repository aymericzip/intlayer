import { Button } from '../Button';
import {
  FormElement,
  InputElement,
  InputPasswordElement,
  TextAreaElement,
} from './elements';
import { AutoSizedTextAreaElement } from './elements/AutoSizeTextAreaElement';
import { CheckboxElement } from './elements/CheckboxElement';
import { EditableFieldInputElement } from './elements/EditableFieldInputElement';
import { EditableFieldTextAreaElement } from './elements/EditableFieldTextAreaElement';
import { MultiSelectElement } from './elements/MultiselectElement';
import { OTPElement } from './elements/OTPElement';
import { SearchInputElement } from './elements/SearchInputElement';
import { SelectElement } from './elements/SelectElement';
import { SwitchSelectorElement } from './elements/SwitchSelectorElement';
import { Form as FormRoot } from './FormBase';
import { FormControl } from './FormControl';
import { FormDescription } from './FormDescription';
import { FormField } from './FormField';
import { FormItem } from './FormItem';
import { FormMessage } from './FormMessage';
import { FormLabelLayout } from './layout';

type FormType = typeof FormRoot & {
  Description: typeof FormDescription;
  Control: typeof FormControl;
  Field: typeof FormField;
  Item: typeof FormItem;
  Label: typeof FormLabelLayout;
  Message: typeof FormMessage;
  Element: typeof FormElement;
  Button: typeof Button;
  Input: typeof InputElement;
  InputPassword: typeof InputPasswordElement;
  Checkbox: typeof CheckboxElement;
  TextArea: typeof TextAreaElement;
  AutoSizedTextArea: typeof AutoSizedTextAreaElement;
  MultiSelect: typeof MultiSelectElement;
  Select: typeof SelectElement;
  EditableFieldInput: typeof EditableFieldInputElement;
  EditableFieldTextArea: typeof EditableFieldTextAreaElement;
  SwitchSelector: typeof SwitchSelectorElement;
  OTP: typeof OTPElement;
  SearchInput: typeof SearchInputElement;
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
export const Form = FormRoot as FormType;
Form.Description = FormDescription;
Form.Control = FormControl;
Form.Field = FormField;
Form.Item = FormItem;
Form.Label = FormLabelLayout;
Form.Message = FormMessage;
Form.Element = FormElement;
Form.Input = InputElement;
Form.InputPassword = InputPasswordElement;
Form.Checkbox = CheckboxElement;
Form.TextArea = TextAreaElement;
Form.AutoSizedTextArea = AutoSizedTextAreaElement;
Form.Button = Button;
Form.Select = SelectElement;
Form.MultiSelect = MultiSelectElement;
Form.EditableFieldInput = EditableFieldInputElement;
Form.EditableFieldTextArea = EditableFieldTextAreaElement;
Form.SwitchSelector = SwitchSelectorElement;
Form.OTP = OTPElement;
Form.SearchInput = SearchInputElement;
