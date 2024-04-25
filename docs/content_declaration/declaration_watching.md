# Intlayer Package Documentation: Content Extension Customization

## Overview

The `intlayer` package is a versatile solution designed to structure your content for multi-language applications using JavaScript. This documentation focuses on customizing content file extensions to enhance build efficiency and avoid conflicts in large projects.

To build dictionaries from your content declarations, you can use [intlayer-cli](https://github.com/aypineau/intlayer/blob/main/packages/intlayer-cli/readme.md). For interpreting these dictionaries, consider [react-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/react-intlayer/readme.md) or [next-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/next-intlayer/readme.md).

## Content File Extensions

Intlayer allows you to customize the extensions for your content declaration files. This customization provides flexibility in managing large-scale projects and helps to avoid conflicts with other modules.

### Default Extensions

By default, Intlayer watches all files with the following extensions for content declarations:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

These default extensions are suitable for most applications. However, when you have specific needs, you can define custom extensions to streamline the build process and reduce the risk of conflicts with other components.

### Customizing Content Extensions

To customize the file extensions Intlayer uses to identify content declaration files, you can specify them in the Intlayer configuration file. This approach is beneficial for large-scale projects where limiting the scope of the watch process improves build performance.

Here is an example of how to define custom content extensions in your configuration:

```typescript
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Your custom extensions
  },
};

export default config;
```

In this example, the configuration specifies two custom extensions: `.my_content.ts` and `.my_content.tsx`. Intlayer will only watch files with these extensions to build dictionaries.

### Benefits of Custom Extensions

- **Build Performance**: Reducing the scope of watched files can significantly improve build performance in large projects.
- **Conflict Avoidance**: Custom extensions help prevent conflicts with other JavaScript or TypeScript files in your project.
- **Organization**: Custom extensions allow you to organize your content declaration files according to your project's needs.

### Guidelines for Custom Extensions

When customizing content file extensions, keep the following guidelines in mind:

- **Uniqueness**: Choose extensions that are unique within your project to avoid conflicts.
- **Consistent Naming**: Use consistent naming conventions for better code readability and maintenance.
- **Avoiding Common Extensions**: Refrain from using common extensions like `.ts` or `.js` to prevent conflicts with other modules or libraries.

## Conclusion

Customizing content file extensions in Intlayer is a valuable feature for optimizing performance and avoiding conflicts in large-scale applications. By following the guidelines outlined in this documentation, you can effectively manage your content declarations and ensure smooth integration with other parts of your project.
