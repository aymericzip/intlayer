## How File Embedding Works

In Intlayer, the `file` function allows embedding external file content into a dictionary. This approach ensures that Intlayer recognises the source file, enabling seamless integration with the Intlayer Visual Editor and CMS. Unlike direct `import`, `require`, or `fs` file reading methods, using `file` associates the file with the dictionary, allowing Intlayer to track and update the content dynamically when the file is edited.

## Setting Up File Content

To embed file content in your Intlayer project, use the `file` function in a content module. Below are examples demonstrating different implementations.

### TypeScript Implementation

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### ECMAScript Module (ESM) Implementation

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### CommonJS Implementation

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### JSON Configuration

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Using File Content in React Intlayer

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Multilingual Markdown Example

To support multilingual editable Markdown files, you can use `file` in combination with `t()` and `md()` to define different language versions of a Markdown content file.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        "en-GB": file("src/components/test.en-GB.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        "en-GB": file("src/components/test.en-GB.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        "en-GB": file("src/components/test.en-GB.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

This setup allows the content to be dynamically retrieved based on the user's language preference. When used in the Intlayer Visual Editor or CMS, the system will recognise that the content comes from the specified Markdown files and ensure they remain editable.

## How Intlayer Handles File Content

The `file` function is based on Node.js' `fs` module to read the content of the specified file and insert it into the dictionary. When used in conjunction with the Intlayer Visual Editor or CMS, Intlayer can track the relationship between the dictionary and the file. This allows Intlayer to:

- Recognise that the content originates from a specific file.
- Automatically update the dictionary content when the linked file is edited.
- Ensure synchronisation between the file and the dictionary, preserving the integrity of the content.

## Additional Resources

For more details on configuring and using file embedding in Intlayer, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md)
- [Markdown Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/dictionary/markdown.md)
- [Translation Content Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/dictionary/translation.md)

These resources provide further insights into file embedding, content management, and Intlayer’s integration with various frameworks.
