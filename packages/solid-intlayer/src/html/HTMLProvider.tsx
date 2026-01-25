import {
  type Component,
  createContext,
  type ParentProps,
  useContext,
} from 'solid-js';
import type { HTMLComponents } from './types';

type HTMLProviderValue = {
  components?: HTMLComponents<'permissive', {}>;
};

const HTMLContext = createContext<HTMLProviderValue>();

export const useHTMLContext = () => useContext(HTMLContext);

export type HTMLProviderProps = ParentProps<{
  components?: HTMLComponents<'permissive', {}>;
}>;

export const HTMLProvider: Component<HTMLProviderProps> = (props) => {
  return (
    <HTMLContext.Provider
      value={{
        components: props.components,
      }}
    >
      {props.children}
    </HTMLContext.Provider>
  );
};
