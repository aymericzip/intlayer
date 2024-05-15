```tsx
// src/component/Component.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const Component = () => {
  const { title, content } = useIntlayer("component"); // Create related content declaration

  return (
    <div>
      <h2>{title} </h2>
      <p>{content}</p>
    </div>
  );
};
```
