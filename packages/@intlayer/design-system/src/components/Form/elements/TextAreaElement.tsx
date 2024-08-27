import { TextArea } from '../../../components/TextArea';
import { FormElement, type FormElementProps } from '.';

interface TextAreaElementsProps
  extends Omit<FormElementProps<typeof TextArea>, 'Element'>,
    React.ComponentProps<typeof TextArea> {
  name: string;
}

export const TextAreaElement = (props: TextAreaElementsProps) => (
  <FormElement
    Element={TextArea}
    id={props.name}
    data-testid={props.name}
    {...props}
  />
);
