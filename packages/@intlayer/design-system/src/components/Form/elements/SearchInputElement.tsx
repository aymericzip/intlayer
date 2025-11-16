import type { ComponentProps, FC } from 'react';
import { SearchInput } from '../../../components/Input';
import { FormElement, type FormElementProps } from './FormElement';

type SearchInputElementProps = Omit<
  FormElementProps<typeof SearchInput>,
  'Element'
> &
  Omit<
    ComponentProps<typeof SearchInput> & {
      name: string;
    },
    'aria-label' | 'aria-labelledby'
  >;

export const SearchInputElement: FC<SearchInputElementProps> = (props) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    Element={SearchInput}
    aria-labelledby={props.label ? `${props.name}-label` : undefined}
    aria-label={props.label ? undefined : props.name}
    {...props}
  />
);
