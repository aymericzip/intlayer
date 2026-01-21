---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Enumeration
description: Discover how to declare and use enumerations in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - Enumeration
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Enumeration / Plurielisation

## How Enumeration Works

In Intlayer, enumeration is achieved through the `enu` function, which maps specific keys to their corresponding content. These keys can represent numeric values, ranges, or custom identifiers. When used with React Intlayer or Next Intlayer, the appropriate content is automatically selected based on the application's locale and defined rules.

## Setting Up Enumeration

To set up enumeration in your Intlayer project, you need to create a content module that includes enumeration definitions. Here's an example of a simple enumeration for the number of cars:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
      "fallback": "Fallback value", // Optional
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
      "fallback": "Fallback value", // Optional
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
      "fallback": "Fallback value", // Optional
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
        "fallback": "Fallback value" // Optional
      }
    }
  }
}
```

In this example, `enu` maps various conditions to specific content. When used in a React component, Intlayer can automatically choose the appropriate content based on the given variable.

> The order of declaration is important in Intlayer enumerations. The first valid declaration is the one that will be picked up. If multiple conditions apply, ensure they are ordered correctly to avoid unexpected behavior.

> If no fallback is declared, the function will return `undefined` if no keys match.

## Using Enumeration with React Intlayer

To use enumeration in a React component, you can leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified ID. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

In this example, the component dynamically adjusts its output based on the number of cars. The correct content is chosen automatically, depending on the specified range.

## Combining Enumeration with Insert for Ordinal Numbers

A common use case is displaying ordinal numbers (1st, 2nd, 3rd, etc.). You can combine `enu` with `insert` to create dynamic ordinal content:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, insert, type Dictionary } from "intlayer";

const rankingContent = {
  key: "ranking_component",
  content: {
    ordinal: enu({
      1: insert("{{count}}st place"),
      2: insert("{{count}}nd place"),
      3: insert("{{count}}rd place"),
      fallback: insert("{{count}}th place"),
    }),
  },
} satisfies Dictionary;

export default rankingContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu, insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const rankingContent = {
  key: "ranking_component",
  content: {
    ordinal: enu({
      1: insert("{{count}}st place"),
      2: insert("{{count}}nd place"),
      3: insert("{{count}}rd place"),
      fallback: insert("{{count}}th place"),
    }),
  },
};

export default rankingContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const rankingContent = {
  key: "ranking_component",
  content: {
    ordinal: enu({
      1: insert("{{count}}st place"),
      2: insert("{{count}}nd place"),
      3: insert("{{count}}rd place"),
      fallback: insert("{{count}}th place"),
    }),
  },
};

module.exports = rankingContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "ranking_component",
  "content": {
    "ordinal": {
      "nodeType": "enumeration",
      "enumeration": {
        "1": {
          "nodeType": "insertion",
          "insertion": "{{count}}st place"
        },
        "2": {
          "nodeType": "insertion",
          "insertion": "{{count}}nd place"
        },
        "3": {
          "nodeType": "insertion",
          "insertion": "{{count}}rd place"
        },
        "fallback": {
          "nodeType": "insertion",
          "insertion": "{{count}}th place"
        }
      }
    }
  }
}
```

### Using Ordinal Enumeration in React

To use this in a React component, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};

export default RankingComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const RankingComponent = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};

export default RankingComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const RankingComponent = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};

module.exports = RankingComponent;
```

In this example:

- `ordinal(lastDigit)` selects the correct enumeration entry based on the last digit (1 → "st", 2 → "nd", 3 → "rd", others → "th")
- `({ count })` passes the full number to the `insert` function to replace `{{count}}` in the string

This pattern allows you to display ordinal numbers correctly: "1st place", "2nd place", "3rd place", "4th place", "5th place", etc.

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
