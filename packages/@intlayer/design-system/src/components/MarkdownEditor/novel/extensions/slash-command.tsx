import type { Editor, Range } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion';
import type { ReactNode, RefObject } from 'react';
import { EditorCommandOut } from '../components/editor-command';

const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      } as SuggestionOptions,
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

type ClientRectGetter = (() => DOMRect | null) | null | undefined;

type SuggestionPopup = {
  setReferenceClientRect: (getReferenceClientRect: ClientRectGetter) => void;
  hide: () => void;
  destroy: () => void;
};

/**
 * Minimal floating popup anchored to the caret. Replaces the tippy.js
 * dependency: the popup is a fixed-position element appended to the given
 * container, placed below the reference rect (flipped above when it would
 * overflow the viewport) and repositioned on scroll/resize.
 */
const createSuggestionPopup = (
  content: HTMLElement,
  getReferenceClientRect: ClientRectGetter,
  container: HTMLElement
): SuggestionPopup => {
  let getRect = getReferenceClientRect;

  const element = document.createElement('div');
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.zIndex = '50';
  element.style.maxWidth = '90vw';
  element.appendChild(content);
  container.appendChild(element);

  const reposition = () => {
    const referenceRect = getRect?.();
    if (!referenceRect) return;

    const viewportPadding = 8;
    const { offsetWidth, offsetHeight } = element;

    const overflowsBottom =
      referenceRect.bottom + offsetHeight >
      window.innerHeight - viewportPadding;
    const top = overflowsBottom
      ? referenceRect.top - offsetHeight
      : referenceRect.bottom;
    const left = Math.min(
      referenceRect.left,
      window.innerWidth - offsetWidth - viewportPadding
    );

    element.style.top = `${Math.max(top, viewportPadding)}px`;
    element.style.left = `${Math.max(left, viewportPadding)}px`;
  };

  // The React content renders asynchronously; measure again on the next frame
  // so the initial placement uses the real popup size.
  reposition();
  requestAnimationFrame(reposition);
  window.addEventListener('resize', reposition);
  window.addEventListener('scroll', reposition, true);

  return {
    setReferenceClientRect: (nextGetReferenceClientRect) => {
      getRect = nextGetReferenceClientRect;
      reposition();
    },
    hide: () => {
      element.style.display = 'none';
    },
    destroy: () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
      element.remove();
    },
  };
};

const renderItems = (elementRef?: RefObject<HTMLElement> | null) => {
  let component: ReactRenderer | null = null;
  let popup: SuggestionPopup | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: ClientRectGetter }) => {
      component = new ReactRenderer(EditorCommandOut, {
        props,
        editor: props.editor,
      });

      const { selection } = props.editor.state;

      const parentNode = selection.$from.node(selection.$from.depth);
      const blockType = parentNode.type.name;

      if (blockType === 'codeBlock') {
        return false;
      }

      popup = createSuggestionPopup(
        component.element as HTMLElement,
        props.clientRect,
        elementRef?.current ?? document.body
      );
    },
    onUpdate: (props: { editor: Editor; clientRect: ClientRectGetter }) => {
      component?.updateProps(props);

      popup?.setReferenceClientRect(props.clientRect);
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.destroy();
      component?.destroy();
    },
  };
};

export interface SuggestionItem {
  title: string;
  description: string;
  icon: ReactNode;
  searchTerms?: string[];
  command?: (props: { editor: Editor; range: Range }) => void;
}

export const createSuggestionItems = (items: SuggestionItem[]) => items;

export const handleCommandNavigation = (event: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
    const slashCommand = document.querySelector('#slash-command');
    if (slashCommand) {
      return true;
    }
  }
};

export { Command, renderItems };
