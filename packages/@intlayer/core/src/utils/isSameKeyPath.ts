import type { KeyPath } from '../types';

export const isSameKeyPath = (keyPath1: KeyPath[], keyPath2: KeyPath[]) =>
  keyPath1.every(
    (element, index) =>
      keyPath2[index] &&
      keyPath2[index].key === element.key &&
      keyPath2[index].type === element.type
  );
