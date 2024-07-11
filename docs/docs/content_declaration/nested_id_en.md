# Getting Started with Nested IDs

Nested IDs in `intlayer` allow you to declare complex content structures efficiently. By introducing nested IDs, you can organize content into a hierarchical structure, leading to better performance and easier management in large-scale applications.

### Nested ID Declaration

To declare nested IDs in your content file, you create a structure with inner nodes containing additional content and unique identifiers. This setup is ideal for scenarios where content is vast or highly organized. Here's a typical example of a nested ID structure:

```typescript
import type { DeclarationContent } from "intlayer";

const nestedContent: DeclarationContent = {
  id: "parent_id",
  text: "This is the parent node",

  nestedContent: {
    id: "child_id",
    text: "This is the child node",
  },
};

export default nestedContent;
```

In this example, the `parent_id` contains a nested content node with an `id` of `child_id`. This structure allows `intlayer` to create separate dictionaries for each ID, providing flexibility in content management.

### Using Nested IDs in React

To utilize nested IDs in a React component, you can employ the `useIntlayer` hook to access the content from a given ID. This approach allows you to extract specific content pieces by referencing their unique IDs. Here's an example of how to retrieve content with nested IDs:

```javascript
import { useIntlayer } from "react-intlayer";

// Display the content in a React component
function MyComponent() {
  // Access the parent content
  const parentContent = useIntlayer("parent_id");

  // Access the child content
  const childContent = useIntlayer("child_id");

  return (
    <div>
      <p>{parentContent.text}</p> {/* Output: This is the parent node */}
      <p>{childContent.text}</p> {/* Output: This is the child node */}
    </div>
  );
}

export default MyComponent;
```

In this example, the `useIntlayer` hook retrieves the content based on the specified IDs. You can then display the content as required, with the flexibility to access both parent and child content independently.

### Key Benefits of Nested IDs

Nested IDs offer several benefits:

- **Improved Performance**: By splitting large content into smaller, organized structures, you reduce the load on your application, leading to improved performance.
- **Flexibility**: The hierarchical structure allows you to access specific parts of the content, providing greater flexibility in application design.
- **Scalability**: As applications grow, nested IDs make it easier to manage complex content structures without losing organization or performance.

### Advanced Usage of Nested IDs

To further optimize the performance of nested IDs, you can declare multiple nested levels or use additional unique identifiers within the structure. Here's an example with deeper nesting:

```typescript
import type { DeclarationContent } from "intlayer";

const deeplyNestedContent: DeclarationContent = {
  id: "level_1",
  text: "Level 1 content",

  nestedContent: {
    id: "level_2",
    text: "Level 2 content",

    nestedContent: {
      id: "level_3",
      text: "Level 3 content",
    },
  },
};

export default deeplyNestedContent;
```

In this example, the content structure has three levels of nesting, each with a unique identifier. This design allows you to retrieve content at any level of the hierarchy, providing significant flexibility in content management.

### Conclusion

Nested IDs in `intlayer` offer a powerful tool for organizing and managing complex content structures in a way that optimizes performance and scalability. By following the examples and guidelines in this documentation, you can build efficient content declarations that are easy to maintain and expand as your application grows.
