import {
  type DeepTransformContent as DeepTransformContentCore,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
} from '@intlayer/core';

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginReact<T> {}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `react-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {};

export type DeepTransformContent<T> = DeepTransformContentCore<
  T,
  IInterpreterPluginState
>;
