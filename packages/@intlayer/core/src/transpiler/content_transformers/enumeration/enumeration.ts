/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeType } from '../../../types/index';
import {
  getStackTraceInfo,
  type NoteStackTraceInfo,
} from '../../../utils/getStackTraceInfo';

type Positif = number | `${number}`;
type Negatif = `-${number}`;
type Numbers = Positif | Negatif;

type Equal = Numbers;
type EqualString = `=${Numbers}`;
type Superior = `>${Numbers}`;
type SuperiorOrEqual = `>=${Numbers}`;
type Inferior = `<${Numbers}`;
type InferiorOrEqual = `<=${Numbers}`;

type EnterFormat =
  | Equal
  | EqualString
  | Superior
  | SuperiorOrEqual
  | Inferior
  | InferiorOrEqual;

export type QuantityContent<Content> = Record<EnterFormat, Content>;

export type EnumerationContent<Content> = Partial<QuantityContent<Content>> &
  NoteStackTraceInfo & {
    nodeType: NodeType.Enumeration;
  };

/**
 * Create a JSON string with the content and the stack trace information
 */
const enumeration = <Content>(content?: Partial<QuantityContent<Content>>) => {
  const stackTraceInfo = getStackTraceInfo();

  if (typeof content === 'string') {
    const result: EnumerationContent<Content> = {
      nodeType: NodeType.Enumeration,
      ...stackTraceInfo,
      1: content,
    };

    return result;
  }

  const result: EnumerationContent<Content> = {
    nodeType: NodeType.Enumeration,
    ...stackTraceInfo,
    ...content,
  };

  return result;
};

export { enumeration as enu };
