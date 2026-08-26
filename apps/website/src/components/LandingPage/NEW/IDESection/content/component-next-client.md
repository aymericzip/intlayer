```tsx
// src/components/Component.tsx

"use client";

import { useIntlayer } from "react-intlayer";

export const ClientComponentComponent = () => {
  const { title, content } = useIntlayer("client-component");

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};
```
