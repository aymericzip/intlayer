# Intlayer: Feature Overview & Roadmap

Intlayer is a content management and internationalization solution designed to streamline how you declare, manage, and update content across your applications. It offers powerful features such as centralized or distributed content declaration, extensive internationalization options, Markdown support, conditional rendering, TypeScript/JavaScript/JSON integration, and more. Below is a comprehensive overview of what Intlayer currently provides, followed by upcoming roadmap features.

---

## Current Features

### 1. Content Declaration

#### Centralized or Distributed

- **Centralized**: Declare all your content in a single, large file at the base of your application, similar to i18next, so you can manage everything in one place.
- **Distributed**: Alternatively, split your content into separate files at the component or feature level for better maintainability. This keeps your content close to the relevant code (components, tests, Storybook, etc.). Removing a component ensures any associated content is also removed, preventing leftover data from cluttering your codebase.

> Resources:
>
> - [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md)

### 2. Internationalization

- Support for **230 languages and locales** (including regional variants like French (France), English (Canada), English (UK), Portuguese (Portugal), etc.).
- Easily manage translations for all these locales from one place.

> Resources:
>
> - [Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)

### 3. Markdown Support

- Declare content using **Markdown**, allowing you to automatically format text with paragraphs, headings, links, and more.
- Ideal for blog posts, articles, documentation pages, or any scenario where rich text formatting is needed.

> Resources:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)

### 4. External file support

- Import content from external files as text format, such as TXT, HTML, JSON, YAML, or CSV.
- Use the `file` function in Intlayer to embed external file content into a dictionary, ensuring seamless integration with the Intlayer Visual Editor and CMS.
- Supports dynamic content updates, meaning that when the source file is modified, the content updates automatically within Intlayer.
- Enables multilingual content management by linking language-specific Markdown files dynamically.

> Resources:
>
> - [File Content Embedding](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)

### 5. Dynamic Content & Logic-Based Rendering

This section combines Enumeration, Nesting, Conditional Rendering, and Insertion functions, along with Function Fetching, into a single structured overview.

#### Enumeration & Pluralization

- Use the `enu` function to define content variations based on numeric values, ranges, or custom keys.
- Enables automatic selection of the correct phrase based on the given value, ensuring content adapts dynamically.
- Supports ordering rules, where the first valid condition is chosen, ensuring predictable behavior.
- Compatible with TypeScript, ESM, CommonJS, and JSON configurations for seamless integration.
- Works with React Intlayer and Next Intlayer via `useIntlayer`, allowing flexible UI content adjustments.
- Supports custom fallback values when no specific conditions match, preventing undefined responses.

#### Nesting & Sub-Content Referencing

- Use the `nest` function to reference and reuse content from another dictionary, reducing duplication.
- Allows referencing an entire dictionary or a specific nested value within it.
- Ensures dynamic content updates when the referenced dictionary changes.
- Compatible with TypeScript, ESM, CommonJS, and JSON configurations for flexible integration.
- Works seamlessly with React Intlayer and Next Intlayer using `useIntlayer` to retrieve nested content dynamically.
- Supports structured and hierarchical content management, improving maintainability and scalability.

#### Conditional Rendering

- Define content that adapts based on specific conditions, such as user language, user login status, or any other context-related variable.
- Helps tailor personalized experiences without duplicating content across multiple files.

#### Dynamic Content Insertion

- Utilize the `insert` function to define content with placeholders (`{{name}}`, `{{age}}`, etc.), allowing dynamic substitution at runtime.
- Enables template-like content that adapts based on user input, API responses, or other dynamic data sources.
- Works seamlessly with TypeScript, ESM, CommonJS, and JSON configurations, ensuring broad compatibility.
- Easily integrates with React Intlayer and Next Intlayer using `useIntlayer`, allowing flexible content rendering in UI components.
- Supports reusable and customizable messages by passing different data objects to the insertion function.

#### Function Fetching

Intlayer allows you to declare content functions in your content modules, which can be either synchronous or asynchronous. When the application builds, Intlayer executes these functions to obtain the function's result. The return value must be a JSON object or a simple value like a string or number.

> Warning: Function fetching is currently not available in JSON content declaration and distant content declaration files.

##### Function Declarations

Example of a simple synchronous function fetching content:

```typescript
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

##### Asynchronous Function Fetching

Example of an asynchronous function that simulates a server fetch:

```typescript
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  return await setTimeout(200).then(
    () => "This is the content fetched from the server"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

##### Using Function-Based Content in React Components

To use function-based content in a React component:

```tsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      <p>{asyncFunctionContent.text}</p>
    </div>
  );
};

export default MyComponent;
```

This section ensures all related dynamic content and logic-driven features are grouped for clarity and ease of understanding.

---

## Content Declaration Formats

Intlayer supports **TypeScript** (also JavaScript) and **JSON** for declaring content.

> Resources:
>
> - [Content Declaration Formats](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_extention_customization.md)

(Other sections remain unchanged.)

## Doc History

- 5.5.10 - 2025-06-29: Init history
