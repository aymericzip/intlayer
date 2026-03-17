import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { defineIntlayerElements, MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types/nodeType';
import {
  type Component,
  createMemo,
  type JSX,
  onCleanup,
  onMount,
} from 'solid-js';
import { useIntlayerContext } from '../client';
import {
  useEditorEnabled,
  useEditorStateManager,
  useFocusDictionary,
} from './contexts';

// JSX declaration for the Lit web component in Solid
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'intlayer-content-selector': JSX.HTMLAttributes<HTMLElement> & {
        'is-selecting'?: boolean | undefined;
        'press-duration'?: number;
      };
    }
  }
}

export type ContentSelectorWrapperProps = NodeProps &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: JSX.Element;
  };

const ContentSelectorWrapperContent: Component<ContentSelectorWrapperProps> = (
  props
) => {
  const { focusedContent, setFocusedContent } = useFocusDictionary();
  const manager = useEditorStateManager();

  const filteredKeyPath = createMemo(() =>
    props.keyPath.filter((key) => key.type !== NodeType.Translation)
  );

  const isSelected = createMemo(
    () =>
      (focusedContent()?.dictionaryKey === props.dictionaryKey &&
        (focusedContent()?.keyPath?.length ?? 0) > 0 &&
        isSameKeyPath(focusedContent()?.keyPath ?? [], filteredKeyPath())) ??
      false
  );

  let ref: HTMLElement | undefined;

  const handlePress = () => {
    setFocusedContent({
      dictionaryKey: props.dictionaryKey,
      keyPath: filteredKeyPath(),
    });
  };

  const handleHover = () => {
    manager.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      { dictionaryKey: props.dictionaryKey, keyPath: filteredKeyPath() }
    );
  };

  const handleUnhover = () => {
    manager.messenger.send(
      `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
      null
    );
  };

  onMount(() => {
    if (!ref) return;
    ref.addEventListener('intlayer:press', handlePress);
    ref.addEventListener('intlayer:hover', handleHover);
    ref.addEventListener('intlayer:unhover', handleUnhover);
    onCleanup(() => {
      ref?.removeEventListener('intlayer:press', handlePress);
      ref?.removeEventListener('intlayer:hover', handleHover);
      ref?.removeEventListener('intlayer:unhover', handleUnhover);
    });
  });

  return (
    // @ts-ignore — custom element ref type
    <intlayer-content-selector
      ref={ref}
      is-selecting={isSelected() || undefined}
    >
      {props.children}
    </intlayer-content-selector>
  );
};

export const ContentSelectorRenderer: Component<ContentSelectorWrapperProps> = (
  props
) => {
  const { enabled } = useEditorEnabled();
  const { disableEditor } = useIntlayerContext();

  onMount(() => defineIntlayerElements());

  if (enabled() && !disableEditor) {
    return (
      <ContentSelectorWrapperContent {...props}>
        {props.children}
      </ContentSelectorWrapperContent>
    );
  }

  return props.children;
};
