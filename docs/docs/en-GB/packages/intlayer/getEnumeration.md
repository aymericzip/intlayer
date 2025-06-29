---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration Function Documentation | intlayer
description: See how to use the getEnumeration function for intlayer package
keywords:
  - getEnumeration
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: `getEnumeration` Function in `intlayer`

## Description

The `getEnumeration` function retrieves content corresponding to a specific quantity based on predefined conditions in an enumeration object. The conditions are defined as keys, and their priority is determined by their order in the object.

## Parameters

- `enumerationContent: QuantityContent<Content>`

  - **Description**: An object where keys represent conditions (e.g., `<=`, `<`, `>=`, `=`) and values represent the corresponding content. The order of keys defines their matching priority.
  - **Type**: `QuantityContent<Content>`
    - `Content` can be any type.

- `quantity: number`

  - **Description**: The numeric value used to match against the conditions in `enumerationContent`.
  - **Type**: `number`

## Returns

- **Type**: `Content`
- **Description**: The content corresponding to the first matching condition in the `enumerationContent`. If no match is found, it defaults to handling based on the implementation (e.g., error or fallback content).

## Example Usage

### Basic Usage

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "You have less than -2.3",
    "<1": "You have less than one",
    "2": "You have two",
    ">=3": "You have three or more",
  },
  2
);

console.log(content); // Output: "You have two"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "You have less than one",
    "2": "You have two",
    ">=3": "You have three or more",
  },
  2
);

console.log(content); // Output: "You have two"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "You have less than one",
    "2": "You have two",
    ">=3": "You have three or more",
  },
  2
);

console.log(content); // Output: "You have two"
```

### Priority of Conditions

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // Output: "You have less than four"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // Output: "You have less than four"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // Output: "You have less than four"
```

## Edge Cases

- **No Matching Condition:**

  - If no condition matches the provided quantity, the function will either return `undefined` or handle the default/fallback scenario explicitly.

- **Ambiguous Conditions:**

  - If conditions overlap, the first matching condition (based on object order) takes precedence.

- **Invalid Keys:**

  - The function assumes that all keys in `enumerationContent` are valid and parsable as conditions. Invalid or improperly formatted keys may lead to unexpected behavior.

- **TypeScript Enforcement:**
  - The function ensures that the `Content` type is consistent across all keys, allowing for type safety in the retrieved content.

## Notes

- The `findMatchingCondition` utility is used to determine the appropriate condition based on the given quantity.

## Doc History

- 5.5.10 - 2025-06-29: Init history
