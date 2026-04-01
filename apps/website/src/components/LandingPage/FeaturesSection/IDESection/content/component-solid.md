```tsx
// src/components/Component.tsx
import { useIntlayer } from "solid-intlayer";

export const Component = () => {
  const content = useIntlayer("component");

  return (
    <div>
      <h2>{content().title}</h2>
      <p>{content().content}</p>
    </div>
  );
};
```
