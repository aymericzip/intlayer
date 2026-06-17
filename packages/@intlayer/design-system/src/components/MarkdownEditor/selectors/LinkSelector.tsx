'use client';

import { Button } from '@components/Button';
import { cn } from '@utils/cn';
import { Check, Link2, Trash } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { getUrlFromString, useEditor } from '../novel';

/**
 * Bubble-menu selector for adding / editing / removing a link on the current
 * selection.
 *
 * The trigger uses `onMouseDown` + `preventDefault` to keep the editor
 * selection alive. The input inside the panel is allowed to take real focus
 * (the user needs to type a URL) — the editor re-focuses on submit/remove.
 */
export const LinkSelector: FC = () => {
  const { editor } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const content = useIntlayer('markdown-editor');

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideMouseDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideMouseDown);

    // Programmatically focus the input
    inputRef.current?.focus();

    return () =>
      document.removeEventListener('mousedown', handleOutsideMouseDown);
  }, [isOpen]);

  if (!editor) return null;

  const currentHref = editor.getAttributes('link').href as string | undefined;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          'flex items-center gap-1 whitespace-nowrap rounded-none px-3 py-1.5 text-sm hover:bg-accent',
          editor.isActive('link') && 'text-blue-500'
        )}
      >
        <Link2 className="size-4" />
        <span className="underline decoration-stone-400 underline-offset-4">
          {content.link.value}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 z-50">
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
              setIsOpen(false);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={content.linkPlaceholder.value}
              className="flex-1 bg-transparent p-1 text-sm outline-none"
              defaultValue={currentHref ?? ''}
            />
            {currentHref ? (
              <Button
                label={content.removeLink.value}
                type="button"
                size="icon-sm"
                variant="outline"
                color="error"
                Icon={Trash}
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  if (inputRef.current) inputRef.current.value = '';
                  setIsOpen(false);
                }}
              />
            ) : (
              <Button
                label={content.applyLink.value}
                type="submit"
                size="icon-sm"
                color="text"
                Icon={Check}
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
};
