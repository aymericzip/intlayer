```tsx
// src/components/Component.tsx
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentComponent = () => {
  const { title, content } = useIntlayer("server-component");

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};
```
