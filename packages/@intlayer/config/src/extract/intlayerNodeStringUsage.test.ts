import { describe, expect, it } from 'vitest';
import {
  findIntlayerNodeStringUsage,
  findRedundantIntlayerNodeValue,
  getIntlayerNodeBindingNames,
  getIntlayerNodeGetterNames,
  type IntlayerNodeAstNode,
  isIntlayerJsxNodePackage,
  isIntlayerNodePackage,
} from './intlayerNodeStringUsage';

const identifier = (name: string): IntlayerNodeAstNode => ({
  type: 'Identifier',
  name,
});

const member = (
  object: IntlayerNodeAstNode,
  propertyName: string
): IntlayerNodeAstNode => ({
  type: 'MemberExpression',
  object,
  property: identifier(propertyName),
  computed: false,
});

describe('isIntlayerNodePackage', () => {
  it('matches framework packages and their subpaths', () => {
    expect(isIntlayerNodePackage('react-intlayer')).toBe(true);
    expect(isIntlayerNodePackage('next-intlayer/server')).toBe(true);
  });

  it('rejects packages returning primitives', () => {
    expect(isIntlayerNodePackage('intlayer')).toBe(false);
    expect(isIntlayerNodePackage('express-intlayer')).toBe(false);
    expect(isIntlayerNodePackage('react-intlayer-extra')).toBe(false);
  });
});

describe('getIntlayerNodeGetterNames / getIntlayerNodeBindingNames', () => {
  it('resolves aliased getters and destructured bindings', () => {
    const program: IntlayerNodeAstNode = {
      type: 'Program',
      body: [
        {
          type: 'ImportDeclaration',
          source: { type: 'Literal', value: 'solid-intlayer' },
          specifiers: [
            {
              type: 'ImportSpecifier',
              imported: identifier('useIntlayer'),
              local: identifier('useContent'),
            },
          ],
        },
      ],
    };
    const getterNames = getIntlayerNodeGetterNames(program);

    expect([...getterNames]).toEqual(['useContent']);

    const declarator: IntlayerNodeAstNode = {
      type: 'VariableDeclarator',
      id: {
        type: 'ObjectPattern',
        properties: [
          {
            type: 'Property',
            key: identifier('title'),
            value: identifier('title'),
          },
          { type: 'RestElement', argument: identifier('rest') },
        ],
      },
      init: {
        type: 'AwaitExpression',
        argument: {
          type: 'CallExpression',
          callee: identifier('useContent'),
          arguments: [],
        },
      },
    };

    expect(getIntlayerNodeBindingNames(declarator, getterNames)).toEqual({
      rootNames: ['rest'],
      leafNames: ['title'],
    });
  });
});

describe('findIntlayerNodeStringUsage', () => {
  it('reports a string method called on a field', () => {
    const reference = identifier('content');
    const field = member(reference, 'title');
    const methodAccess = member(field, 'toUpperCase');

    expect(
      findIntlayerNodeStringUsage(reference, [field, methodAccess], false)
    ).toEqual({ chainEnd: field, context: 'string-method' });
  });

  it('ignores template literals, which accept any type', () => {
    const reference = identifier('content');
    const field = member(reference, 'title');
    const template: IntlayerNodeAstNode = {
      type: 'TemplateLiteral',
      expressions: [field],
      quasis: [],
    };

    expect(
      findIntlayerNodeStringUsage(reference, [field, template], false)
    ).toBeNull();
  });

  it('skips a chain already reading .value', () => {
    const reference = identifier('content');
    const field = member(reference, 'title');
    const valueAccess = member(field, 'value');
    const methodAccess = member(valueAccess, 'toUpperCase');

    expect(
      findIntlayerNodeStringUsage(
        reference,
        [field, valueAccess, methodAccess],
        false
      )
    ).toBeNull();
  });

  it('skips the whole dictionary but not a destructured leaf', () => {
    const reference = identifier('title');
    const methodAccess = member(reference, 'toUpperCase');

    expect(
      findIntlayerNodeStringUsage(reference, [methodAccess], false)
    ).toBeNull();
    expect(
      findIntlayerNodeStringUsage(reference, [methodAccess], true)?.context
    ).toBe('string-method');
  });
});

describe('findRedundantIntlayerNodeValue', () => {
  const buildJsxChild = () => {
    const reference = identifier('content');
    const field = member(reference, 'title');
    const valueAccess = member(field, 'value');
    const container: IntlayerNodeAstNode = {
      type: 'JSXExpressionContainer',
      expression: valueAccess,
    };
    const element: IntlayerNodeAstNode = {
      type: 'JSXElement',
      children: [container],
    };

    return { reference, field, valueAccess, container, element };
  };

  it('reports .value rendered as a JSX child', () => {
    const { reference, field, valueAccess, container, element } =
      buildJsxChild();

    expect(
      findRedundantIntlayerNodeValue(
        reference,
        [field, valueAccess, container, element],
        false
      )
    ).toEqual({ chainEnd: field, valueAccess });
  });

  it('ignores .value passed to an attribute', () => {
    const { reference, field, valueAccess, container } = buildJsxChild();
    const attribute: IntlayerNodeAstNode = {
      type: 'JSXAttribute',
      value: container,
    };

    expect(
      findRedundantIntlayerNodeValue(
        reference,
        [field, valueAccess, container, attribute],
        false
      )
    ).toBeNull();
  });

  it('limits JSX-renderable packages to JSX frameworks', () => {
    expect(isIntlayerJsxNodePackage('solid-intlayer')).toBe(true);
    expect(isIntlayerJsxNodePackage('vanilla-intlayer')).toBe(false);
  });
});
