import { MessageKey } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types';
import {
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  type Setter,
  useContext,
} from 'solid-js';
import { useCrossFrameState } from './useCrossFrameState';

export type DictionaryContent = Record<Dictionary['key'], Dictionary>;

type DictionariesRecordStatesContextType = {
  localeDictionaries: DictionaryContent;
};
type DictionariesRecordActionsContextType = {
  setLocaleDictionaries: Setter<DictionaryContent>;
  setLocaleDictionary: (dictionary: Dictionary) => void;
};

const DictionariesRecordStatesContext = createContext<
  DictionariesRecordStatesContextType | undefined
>(undefined);
const DictionariesRecordActionsContext = createContext<
  DictionariesRecordActionsContextType | undefined
>(undefined);

export const DictionariesRecordProvider: Component<ParentProps> = (props) => {
  const [localeDictionaries, setLocaleDictionaries] =
    useCrossFrameState<DictionaryContent>(
      MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
      undefined
    );

  const stateValue = createMemo(() => ({
    localeDictionaries: localeDictionaries() ?? {},
  }));

  const actionValue = createMemo(() => ({
    setLocaleDictionaries: setLocaleDictionaries as Setter<DictionaryContent>,
    setLocaleDictionary: (dictionary: Dictionary) => {
      setLocaleDictionaries((dictionaries) => ({
        ...dictionaries,
        [dictionary.key]: dictionary,
      }));
    },
  }));

  return (
    <DictionariesRecordStatesContext.Provider value={stateValue()}>
      <DictionariesRecordActionsContext.Provider value={actionValue()}>
        {props.children}
      </DictionariesRecordActionsContext.Provider>
    </DictionariesRecordStatesContext.Provider>
  );
};

export const useDictionariesRecordActions = () =>
  useContext(DictionariesRecordActionsContext);

export const useDictionariesRecord = () => {
  const actionsContext = useDictionariesRecordActions();
  const statesContext = useContext(DictionariesRecordStatesContext);

  if (!statesContext) {
    throw new Error(
      'useDictionariesRecordStates must be used within a DictionariesRecordProvider'
    );
  }

  return { ...statesContext, ...actionsContext };
};
