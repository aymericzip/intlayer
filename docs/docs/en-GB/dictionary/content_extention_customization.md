# Content Extension Customisation

## Content File Extensions

Intlayer allows you to customise the extensions for your content declaration files. This customisation provides flexibility in managing large-scale projects and helps to avoid conflicts with other modules.

### Default Extensions

By default, Intlayer watches all files with the following extensions for content declarations:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

These default extensions are suitable for most applications. However, when you have specific needs, you can define custom extensions to streamline the build process and reduce the risk of conflicts with other components.

### Customising Content Extensions

To customise the file extensions Intlayer uses to identify content declaration files, you can specify them in the Intlayer configuration file. This approach is beneficial for large-scale projects where limiting the scope of the watch process improves build performance.

Here is an example of how to define custom content extensions in your configuration:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Your custom extensions
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Your custom extensions
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Your custom extensions
  },
};

module.exports = config;
```

In this example, the configuration specifies two custom extensions: `.my_content.ts` and `.my_content.tsx`. Intlayer will only watch files with these extensions to build dictionaries.

### Benefits of Custom Extensions

- **Build Performance**: Reducing the scope of watched files can significantly improve build performance in large projects.
- **Conflict Avoidance**: Custom extensions help prevent conflicts with other JavaScript or TypeScript files in your project.
- **Organisation**: Custom extensions allow you to organise your content declaration files according to your project's needs.

### Guidelines for Custom Extensions

When customising content file extensions, keep the following guidelines in mind:

- **Uniqueness**: Choose extensions that are unique within your project to avoid conflicts.
- **Consistent Naming**: Use consistent naming conventions for better code readability and maintenance.
- **Avoiding Common Extensions**: Refrain from using common extensions like `.ts` or `.js` to prevent conflicts with other modules or libraries.

## Conclusion

Customising content file extensions in Intlayer is a valuable feature for optimising performance and avoiding conflicts in large-scale applications. By following the guidelines outlined in this documentation, you can effectively manage your content declarations and ensure smooth integration with other parts of your project.

[Learn more](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/**/*.md)
