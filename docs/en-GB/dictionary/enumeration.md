# Enumeration / Pluralisation

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

> The order of declaration is important in Intlayer enumerations. The first valid declaration is the one that will be picked up. If multiple conditions apply, ensure they are ordered correctly to avoid unexpected behaviour.

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

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
