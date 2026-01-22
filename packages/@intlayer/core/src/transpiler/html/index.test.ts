import { describe, expect, it } from 'vitest';
import { html } from './index';

describe('html', () => {
  it('should extract custom components from string content by default', () => {
    const content = '<div><MyComponent>Hello</MyComponent></div>';
    const result = html(content);

    // Now expects div to be included
    expect(result.tags).toEqual({
      div: true,
      MyComponent: {
        children: 'string',
      },
    });
  });

  it('should detect custom components and their props', () => {
    const content =
      '<div>Hello <b>World</b><custom-component /><CustomComponent /> <CustomComponent2> Hello </CustomComponent2></div>';

    const result = html(content);

    expect(result.tags).not.toBeInstanceOf(Array);
    // This expectation is now correct based on the new logic
    expect(result.tags).toEqual({
      'custom-component': {},
      CustomComponent: {},
      CustomComponent2: {
        children: 'string',
      },
      div: true,
      b: true,
    });
  });

  it('should allow providing a custom component schema with types', () => {
    const content =
      "<MyComponent myProp='my value' myprop2='my value 2' my-Prop-3:'3'>child</MyComponent><p>My paragrap</p>";

    const components = {
      MyComponent: {
        myProp: 'string',
        myprop2: 'string',
        'my-prop-3': 'number',
        children: 'ReactNode',
      },
      p: true,
    };

    const result = html(content, components);

    expect(result.tags).toEqual(components);
    expect(result.html).toBe(content);
  });
});
