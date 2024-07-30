```tsx
// src/component/server/Component.tsx

import { useIntlayer } from "next-intlayer/server";

export const Component = () => {
  const { title, content } = useIntlayer("server-component"); // Create related content declaration

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};
```
