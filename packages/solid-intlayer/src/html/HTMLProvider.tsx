import {
  type Component,
  createContext,
  type ParentProps,
  useContext,
} from 'solid-js';
import { getContextProvider } from '../solidCompat';
import type { HTMLComponents } from './types';

type HTMLProviderValue = {
  components?: HTMLComponents<'permissive', {}>;
};

/**
 * `null` outside a provider. An explicit default keeps `useContext` from
 * throwing on Solid 2, where default-less contexts require a provider.
 */
const HTMLContext = createContext<HTMLProviderValue | null>(null);

const HTMLContextProvider = getContextProvider(HTMLContext);

export const useHTMLContext = () => useContext(HTMLContext);

export type HTMLProviderProps = ParentProps<{
  components?: HTMLComponents<'permissive', {}>;
}>;

export const HTMLProvider: Component<HTMLProviderProps> = (props) => {
  return (
    <HTMLContextProvider
      value={{
        components: props.components,
      }}
    >
      {props.children}
    </HTMLContextProvider>
  );
};
