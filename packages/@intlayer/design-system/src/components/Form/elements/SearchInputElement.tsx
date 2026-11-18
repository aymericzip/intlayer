import { SearchInput } from '@components/Input';
import type { ComponentProps, FC } from 'react';
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
  <FormElement Element={SearchInput} {...props} />
);
