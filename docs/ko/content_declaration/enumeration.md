# Enumeration / Plurielisation

## How Enumeration Works

In Intlayer, enumeration is achieved through the `enu` function, which maps specific keys to their corresponding content. These keys can represent numeric values, ranges, or custom identifiers. When used with React Intlayer or Next Intlayer, the appropriate content is automatically selected based on the application's locale and defined rules.

## Setting Up Enumeration

To set up enumeration in your Intlayer project, you need to create a content module that includes enumeration definitions. Here's an example of a simple enumeration for the number of cars:

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "마이너스 하나 미만의 자동차",
      "-1": "마이너스 하나 자동차",
      "0": "자동차 없음",
      "1": "자동차 하나",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

In this example, `enu` maps various conditions to specific content. When used in a React component, Intlayer can automatically choose the appropriate content based on the given variable.

## Using Enumeration with React Intlayer

To use enumeration in a React component, you can leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified ID. Here's an example of how to use it:

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* 출력: 자동차 없음 */}
      <p>{content.numberOfCar(6)}</p> {/* 출력: 몇 대의 자동차 */}
      <p>{content.numberOfCar(20)}</p> {/* 출력: 몇 대의 자동차 */}
    </div>
  );
};

export default CarComponent;
```

In this example, the component dynamically adjusts its output based on the number of cars. The correct content is chosen automatically, depending on the specified range.

## Important Notes

- The order of declaration is crucial in Intlayer enumerations. The first valid declaration is the one that will be picked up.
- If multiple conditions apply, ensure they are ordered correctly to avoid unexpected behavior.

## Best Practices for Enumeration

To ensure your enumerations work as expected, follow these best practices:

- **Consistent Naming**: Use clear and consistent IDs for enumeration modules to avoid confusion.
- **Documentation**: Document your enumeration keys and their expected outputs to ensure future maintainability.
- **Error Handling**: Implement error handling to manage cases where no valid enumeration is found.
- **Optimize Performance**: For large applications, reduce the number of watched file extensions to improve performance.

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
