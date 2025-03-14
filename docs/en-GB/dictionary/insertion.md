## How Insertion Works

In Intlayer, insertion content is achieved through the `insertion` function, which identifies placeholder fields in a string (such as `{{name}}` or `{{age}}`) that can be replaced dynamically at runtime. This approach allows you to create flexible, template-like strings where specific parts of the content are determined by data passed in from your application.

When integrated with React Intlayer or Next Intlayer, you can simply provide the data object containing the values for each placeholder, and Intlayer will automatically render the content with the placeholders replaced.

## Setting Up Insertion Content

To set up insertion content in your Intlayer project, create a content module that includes your insertion definitions. Below are examples in various formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hello, my name is {{name}} and I am {{age}} years old!"
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hello, my name is {{name}} and I am {{age}} years old!"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hello, my name is {{name}} and I am {{age}} years old!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Hello, my name is {{name}} and I am {{age}} years old!",
    },
  },
}
```

## Using Insertion Content with React Intlayer

To utilise insertion content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the content for the specified key and allows you to pass in an object that maps each placeholder in your content to the value you wish to display.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* You can reuse the same insertion with different values */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* You can reuse the same insertion with different values */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* You can reuse the same insertion with different values */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md)

These resources offer further insights into the setup and usage of Intlayer across various environments and frameworks.
