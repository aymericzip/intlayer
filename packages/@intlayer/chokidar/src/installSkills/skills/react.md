# Intlayer React Usage

## useIntlayer Hook

```tsx
import { useIntlayer } from "react-intlayer";
const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```

[React Documentation](https://intlayer.org/doc/packages/react-intlayer)
