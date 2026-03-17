import configuration from '@intlayer/config/built';
import {
  type Component,
  lazy,
  type ParentProps,
  Show,
  Suspense,
} from 'solid-js';

const DynamicEditorProvider = lazy(() =>
  import('./contexts').then((m) => ({ default: m.EditorProvider }))
);

export const IntlayerEditorProvider: Component<ParentProps> = (props) => {
  const { editor } = configuration ?? {};
  const isEnabled = editor?.enabled ?? false;

  return (
    <Show
      when={typeof window !== 'undefined' && isEnabled}
      fallback={props.children}
    >
      <Suspense fallback={props.children}>
        <DynamicEditorProvider mode="client">
          {props.children}
        </DynamicEditorProvider>
      </Suspense>
    </Show>
  );
};
