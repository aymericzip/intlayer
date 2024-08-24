# Enumeration / Plurielisation

## How Enumeration Works

In Intlayer, enumeration is achieved through the `enu` function, which maps specific keys to their corresponding content. These keys can represent numeric values, ranges, or custom identifiers. When used with React Intlayer or Next Intlayer, the appropriate content is automatically selected based on the application's locale and defined rules.

## Setting Up Enumeration

To set up enumeration in your Intlayer project, you need to create a content module that includes enumeration definitions. Here's an example of a simple enumeration for the number of cars:

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration: DeclarationContent = {
  id: "car_count",
  numberOfCar: enu({
    "<-1": "Less than minus one car",
    "-1": "Minus one car",
    "0": "No cars",
    "1": "One car",
    ">5": "Some cars",
    ">19": "Many cars",
  }),
};

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
      <p>{content.numberOfCar(0)}</p> {/* Output: No cars */}
      <p>{content.numberOfCar(6)}</p> {/* Output: Some cars */}
      <p>{content.numberOfCar(20)}</p> {/* Output: Some cars */}
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

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_cli_en.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
