'use client';

import { Button } from '@components/Button';
import { DropDown } from '@components/DropDown';
import { cn } from '@utils/cn';
import { Check, Link2, Trash } from 'lucide-react';
import { useRef } from 'react';
import { getUrlFromString, useEditor } from '../novel-';

const DROPDOWN_ID = 'markdown-editor-link-selector';

/**
 * Bubble-menu selector for adding / editing / removing a link on the current
 * selection. Reuses the design-system `DropDown`.
 */
export const LinkSelector = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useEditor();
  if (!editor) return null;

  const currentHref = editor.getAttributes('link').href as string | undefined;

  return (
    <DropDown identifier={DROPDOWN_ID}>
      <DropDown.Trigger
        identifier={DROPDOWN_ID}
        label="Link"
        variant="hoverable"
        color="text"
        size="sm"
        roundedSize="none"
        Icon={Link2}
      >
        <span
          className={cn(
            'text-sm underline decoration-stone-400 underline-offset-4',
            editor.isActive('link') && 'text-blue-500'
          )}
        >
          Link
        </span>
      </DropDown.Trigger>
      <DropDown.Panel identifier={DROPDOWN_ID} isFocusable align="start">
        <form
          key={currentHref ?? 'no-link'}
          className="flex w-60 gap-1 rounded-md border bg-popover p-1 shadow-md"
          onSubmit={(event) => {
            event.preventDefault();
            const input = event.currentTarget[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-transparent p-1 text-sm outline-none"
            defaultValue={currentHref ?? ''}
          />
          {currentHref ? (
            <Button
              label="Remove link"
              type="button"
              size="icon-sm"
              variant="outline"
              color="error"
              Icon={Trash}
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (inputRef.current) inputRef.current.value = '';
              }}
            />
          ) : (
            <Button
              label="Apply link"
              type="submit"
              size="icon-sm"
              color="text"
              Icon={Check}
            />
          )}
        </form>
      </DropDown.Panel>
    </DropDown>
  );
};
