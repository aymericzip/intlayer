# Function Fetching

Intlayer allows you to declare content functions in your content modules, which can be either synchronous or asynchronous. When the application builds, Intlayer executes these functions to obtain the function's result. The return value must be a JSON object or a simple value like a string or number.

> Warning: function fetching is currently not available in JSON content declaration and distant content declarations files.

## Function Declarations

Here's an example of a simple synchronous function fetching content:

```typescript fileName="/**/*" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies DeclarationContent;

export default functionContent;
```

```javascript fileName="/**/*" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
};

export default functionContent;
```

```javascript fileName="/**/*" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
};

module.exports = functionContent;
```

```json fileName="/**/*" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "This is the content rendered by a function"
  }
}
```

In this example, the `text` key contains a function that returns a string. This content can be rendered in your React components using Intlayer's interpreter packages like `react-intlayer`.

## Asynchronous Function Fetching

In addition to synchronous functions, Intlayer supports asynchronous functions, allowing you to fetch data from external sources or simulate data retrieval with mock data.

Below is an example of an asynchronous function that simulates a server fetch:

```typescript fileName="/**/*" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Wait for 200ms to simulate a fetch from the server
  return await setTimeout(200).then(
    () => "This is the content fetched from the server"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

```javascript fileName="/**/*" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Wait for 200ms to simulate a fetch from the server
  await setTimeout(200);
  return "This is the content fetched from the server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="/**/*" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // Wait for 200ms to simulate a fetch from the server
  await setTimeout(200);
  return "This is the content fetched from the server";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="/**/*" contentDeclarationFormat="json"
No way to fetch content from a JSON file, use a .ts or .js file instead
```

In this case, the `fakeFetch` function mimics a delay to simulate server response time. Intlayer executes the asynchronous function and uses the result as the content for the `text` key.

## Using Function-Based Content in React Components

To use function-based content in a React component, you need to import `useIntlayer` from `react-intlayer` and call it with the content ID to retrieve the content. Here's an example:

```typescript fileName="/**/*" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: This is the content rendered by a function */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: This is the content fetched from the server */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="/**/*" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: This is the content rendered by a function */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: This is the content fetched from the server */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="/**/*" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Output: This is the content rendered by a function */}
      <p>{asyncFunctionContent.text}</p>
      {/* Output: This is the content fetched from the server */}
    </div>
  );
};

module.exports = MyComponent;
```
