/* eslint-disable react/no-unknown-property */
'use client';

import {
  Dialog,
  DialogContent,
  type DialogProps,
} from '@radix-ui/react-dialog';
import { cn } from '@utils/cn';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';

export const CommandRoot: FC<ComponentProps<typeof CommandPrimitive>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive
    className={cn('flex flex-col overflow-hidden rounded-md', className)}
    {...props}
  />
);

type CommandDialogProps = DialogProps;

const CommandDialog: FC<CommandDialogProps> = ({ children, ...props }) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0">
      <CommandRoot className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]_svg]:size-5">
        {children}
      </CommandRoot>
    </DialogContent>
  </Dialog>
);

const CommandInput: FC<ComponentProps<typeof CommandPrimitive.Input>> = ({
  className,
  ...props
}) => (
  <div className="flex w-full items-center" cmdk-input-wrapper="">
    <Search className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        'flex w-full rounded-md bg-transparent text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
);

const CommandList: FC<ComponentProps<typeof CommandPrimitive.List>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive.List
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
);

const CommandEmpty: FC<ComponentProps<typeof CommandPrimitive.Empty>> = (
  props
) => <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />;

const CommandGroup: FC<ComponentProps<typeof CommandPrimitive.Group>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive.Group
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs',
      className
    )}
    {...props}
  />
);

const CommandSeparator: FC<
  ComponentProps<typeof CommandPrimitive.Separator>
> = ({ className, ...props }) => (
  <CommandPrimitive.Separator
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
);

const CommandItem: FC<ComponentProps<typeof CommandPrimitive.Item>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive.Item
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50',
      className
    )}
    {...props}
  />
);

const CommandShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-muted-foreground text-xs tracking-widest',
        className
      )}
      {...props}
    />
  );
};

/**
 * Usage example:
 * ```jsx
 * <Command>
 *   <Command.Trigger>
 *     <Command.Input placeholder="Search..." />
 *   </Command.Trigger>
 *   <Command.Dialog>
 *     <Command.List>
 *       <Command.Item>Item 1</Command.Item>
 *       <Command.Item>Item 2</Command.Item>
 *       <Command.Item>Item 3</Command.Item>
 *     </Command.List>
 *   </Command.Dialog>
 * </Command>
 * ```
 */
export const Command = {
  ...CommandRoot,
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Separator: CommandSeparator,
  Item: CommandItem,
  Shortcut: CommandShortcut,
};
