```tsx
// src/components/Component.tsx
import { useIntlayer } from "preact-intlayer";

export const Component = () => {
  const { title, content } = useIntlayer("component");

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};
```
