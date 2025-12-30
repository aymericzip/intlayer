import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';

type LastKeyType = string | number;

export const editDictionaryByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[],
  newValue: ContentNode
): ContentNode => {
  let currentValue: any = dictionaryContent;
  let parentValue: any = null;
  let lastKeys: LastKeyType[] = [];

  if (keyPath.length === 0) {
    return newValue;
  }

  try {
    for (let i = 0; i < keyPath.length; i++) {
      const keyObj = keyPath[i];
      parentValue = currentValue;

      if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
        lastKeys = [keyObj.key];
        if (
          !currentValue[keyObj.key] ||
          typeof currentValue[keyObj.key] !== 'object'
        ) {
          currentValue[keyObj.key] = {};
        }
        currentValue = currentValue[keyObj.key];
      }

      if (
        keyObj.type === NodeType.Translation ||
        keyObj.type === NodeType.Enumeration
      ) {
        lastKeys = [keyObj.type, keyObj.key];
        if (
          !currentValue[keyObj.type] ||
          typeof currentValue[keyObj.type] !== 'object'
        ) {
          currentValue[keyObj.type] = {};
        }
        if (
          !currentValue[keyObj.type][keyObj.key] ||
          typeof currentValue[keyObj.type][keyObj.key] !== 'object'
        ) {
          currentValue[keyObj.type][keyObj.key] = {};
        }
        currentValue = currentValue[keyObj.type][keyObj.key];
      }

      if (
        keyObj.type === NodeType.Enumeration ||
        keyObj.type === NodeType.Condition
      ) {
        // Note: Logic above already handles Enumeration, ensure no duplication in your actual file
        // or keep the specific block if your logic differs.
        // The important part is below in the final update block.

        // Assuming this block runs for Condition/Gender/etc:
        if (keyObj.type !== NodeType.Enumeration) {
          lastKeys = [keyObj.type, keyObj.key];
          currentValue = currentValue[keyObj.type][keyObj.key];
        }
      }

      if (
        keyObj.type === NodeType.Markdown ||
        keyObj.type === NodeType.Insertion
      ) {
        lastKeys = [keyObj.type];
        if (
          !currentValue[keyObj.type] ||
          typeof currentValue[keyObj.type] !== 'object'
        ) {
          currentValue[keyObj.type] = '';
        }
        currentValue = currentValue[keyObj.type];
      }

      if (keyObj.type === NodeType.File) {
        lastKeys = ['content'];
        currentValue = currentValue.content;
      }

      // Only update the value when processing the last key in the keyPath.
      if (i === keyPath.length - 1 && parentValue && lastKeys.length > 0) {
        let target = parentValue;

        // Drill down to the container holding the value to be changed
        for (const key of lastKeys.slice(0, -1)) {
          target = target[key];
        }

        const finalKey = lastKeys[lastKeys.length - 1];

        if (typeof newValue === 'undefined') {
          // Use splice for arrays to re-index the list, use delete for objects
          if (Array.isArray(target)) {
            const index = Number(finalKey);
            if (!isNaN(index) && index >= 0 && index < target.length) {
              target.splice(index, 1);
            }
          } else {
            delete target[finalKey];
          }
        } else {
          target[finalKey] = newValue;
        }
      }
    }

    return dictionaryContent;
  } catch (error) {
    console.error(
      'Cannot edit dictionary by key path',
      { dictionaryContent, keyPath, newValue },
      error
    );
    return dictionaryContent;
  }
};
