'use client';

import { cn } from '@utils/cn';
import { Search } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';
import {
  CommandPrimitive,
  CommandPrimitiveEmpty,
  CommandPrimitiveGroup,
  CommandPrimitiveInput,
  CommandPrimitiveItem,
  CommandPrimitiveList,
  CommandPrimitiveSeparator,
} from './CommandPrimitive';

export const CommandRoot: FC<ComponentProps<typeof CommandPrimitive>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive
    className={cn(
      'flex flex-col overflow-hidden rounded-md px-3 py-2 outline-hidden',
      className
    )}
    {...props}
  />
);

const CommandInput: FC<ComponentProps<typeof CommandPrimitiveInput>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-1 items-center gap-2 px-3 py-2',
      'rounded-2xl supports-[corner-shape:squircle]:rounded-4xl',
      'bg-neutral-50 dark:bg-neutral-950',
      'ring-1 ring-neutral-100 dark:ring-neutral-700',
      'transition-shadow duration-100 focus-within:ring-3 hover:ring-3',
      className
    )}
  >
    <Search className="size-4 shrink-0 opacity-50" />
    <CommandPrimitiveInput
      className="flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
);

const CommandList: FC<ComponentProps<typeof CommandPrimitiveList>> = ({
  className,
  ...props
}) => (
  <CommandPrimitiveList
    className={cn('max-h-75 overflow-x-hidden overflow-y-auto', className)}
    {...props}
  />
);

const CommandEmpty: FC<ComponentProps<typeof CommandPrimitiveEmpty>> = ({
  className,
  ...props
}) => (
  <CommandPrimitiveEmpty
    className={cn('py-6 text-center text-sm', className)}
    {...props}
  />
);

const CommandGroup: FC<ComponentProps<typeof CommandPrimitiveGroup>> = ({
  className,
  ...props
}) => (
  <CommandPrimitiveGroup
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:py-1.5 [&_[data-command-group-heading]]:text-xs [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
);

const CommandSeparator: FC<
  ComponentProps<typeof CommandPrimitiveSeparator>
> = ({ className, ...props }) => (
  <CommandPrimitiveSeparator
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
);

const CommandItem: FC<ComponentProps<typeof CommandPrimitiveItem>> = ({
  className,
  ...props
}) => (
  <CommandPrimitiveItem
    className={cn(
      'relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
      className
    )}
    {...props}
  />
);

const CommandShortcut: FC<HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      'ms-auto text-xs tracking-widest text-muted-foreground',
      className
    )}
    {...props}
  />
);

/**
 * Searchable command menu parts, rendered inside `CommandRoot`.
 *
 * @example
 * <CommandRoot>
 *   <Command.Input placeholder="Search..." />
 *   <Command.List>
 *     <Command.Empty>No results.</Command.Empty>
 *     <Command.Group heading="Suggestions">
 *       <Command.Item onSelect={openCalendar}>Calendar</Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </CommandRoot>
 */
export const Command = {
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Separator: CommandSeparator,
  Item: CommandItem,
  Shortcut: CommandShortcut,
};
