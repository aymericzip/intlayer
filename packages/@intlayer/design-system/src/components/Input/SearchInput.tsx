import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Input, type InputProps } from './Input';

export const SearchInput = ({ className, ...props }: InputProps) => (
  <div className="relative flex w-full items-center gap-1">
    <Search className="absolute left-2 size-4" />
    <Input {...props} type="search" className={cn('pl-8', className)} />
  </div>
);
