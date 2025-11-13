import type {
  ConditionContent,
  EnumerationContent,
  GenderContent,
  InsertionContent,
  MarkdownContent,
  NestedContent,
  TranslationContent,
} from '@intlayer/core';
import { getNodeType } from '@intlayer/core';
import type { FileContent } from '@intlayer/core/file';
import {
  type ContentNode,
  type Dictionary,
  type Locale,
  NodeType,
  type StrictModeLocaleMap,
} from '@intlayer/types';
import {
  type CallExpression,
  IndentationText,
  NewLineKind,
  Node,
  type ObjectLiteralExpression,
  Project,
  QuoteKind,
  type SourceFile,
  SyntaxKind,
  ts,
} from 'ts-morph';

/**
 * Builds a translation initializer string for the 't' function call.
 * Creates a properly formatted translation object with locale keys and values.
 *
 * @param translationMap - Map of locale codes to translation values
 * @param typeArgumentsText - Optional generic type arguments for the translation function
 * @returns Formatted string for the translation function call
 */
const buildTranslationInitializer = (
  translationMap: TranslationContent[NodeType.Translation],
  typeArgumentsText?: string
): string => {
  // Convert map to entries and sort for consistent output
  // Identifiers first (a-z), then others alphabetically
  const translationEntries = Object.entries(translationMap).sort(
    ([firstKey], [secondKey]) => firstKey.localeCompare(secondKey)
  );

  const translationParts: string[] = [];

  for (const [localeCode, translationValue] of translationEntries) {
    // Check if locale code is a valid JavaScript identifier
    const isLocaleCodeValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(
      localeCode
    );
    const formattedLocaleKey = isLocaleCodeValidIdentifier
      ? localeCode
      : JSON.stringify(localeCode);

    if (typeof translationValue === 'string') {
      translationParts.push(
        `${formattedLocaleKey}: ${JSON.stringify(translationValue)}`
      );
    } else if (Array.isArray(translationValue)) {
      const serializedArrayElements = (translationValue as string[])
        .map((arrayElement) => JSON.stringify(arrayElement))
        .join(', ');

      translationParts.push(
        `${formattedLocaleKey}: [ ${serializedArrayElements} ]`
      );
    } else {
      // Fallback to JSON serialization for non-string values to avoid breaking
      translationParts.push(
        `${formattedLocaleKey}: ${JSON.stringify(translationValue)}`
      );
    }
  }

  return `t${typeArgumentsText ?? ''}({ ${translationParts.join(', ')} })`;
};

/**
 * Synchronizes numeric suffixes across locales to maintain consistency.
 * When updating a fallback locale's numeric suffix, this function updates
 * the corresponding numeric suffixes in other locales to match.
 *
 * This is useful for maintaining numbered lists across translations,
 * e.g., "Hello 1" / "Bonjour 1" when updating to "Hello 3".
 *
 * @param existingTranslationMap - Current translation map with locale values
 * @param fallbackLocaleCode - The locale being updated (fallback)
 * @param newFallbackValue - The new value for the fallback locale
 * @returns Updated translation map with synchronized numeric suffixes
 */
const syncNumericSuffixAcrossLocales = (
  existingTranslationMap: Record<string, string>,
  fallbackLocaleCode: string,
  newFallbackValue: string
): Record<string, string> => {
  const updatedTranslationMap: Record<string, string> = {
    ...existingTranslationMap,
    [fallbackLocaleCode]: newFallbackValue,
  };

  // Extract the trailing number from the new fallback value
  const trailingNumberMatch = newFallbackValue.match(/\d+(?!.*\d)/);

  if (!trailingNumberMatch) return updatedTranslationMap;
  const newTrailingNumber = trailingNumberMatch[0];

  // Update numeric suffixes in other locales to match the new fallback number
  for (const [localeCode, currentValue] of Object.entries(
    existingTranslationMap
  )) {
    if (localeCode === fallbackLocaleCode) continue;

    const currentTrailingNumberMatch = currentValue.match(/\d+(?!.*\d)/);

    if (!currentTrailingNumberMatch) continue;

    // Replace the trailing number in this locale with the new number
    updatedTranslationMap[localeCode] = currentValue.replace(
      /(\d+)(?!.*\d)/,
      newTrailingNumber
    );
  }

  return updatedTranslationMap;
};

/**
 * Safely formats a key for use in object literals.
 * Handles special cases like reserved keywords and non-identifier keys.
 *
 * @param objectKey - The key to format
 * @returns Properly formatted key string
 */
const stringifyKey = (objectKey: string): string => {
  const isKeyValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(objectKey);

  if (!isKeyValidIdentifier) return JSON.stringify(objectKey);

  // Handle reserved keywords that need to be quoted
  if (objectKey === 'true' || objectKey === 'false')
    return JSON.stringify(objectKey);

  return objectKey;
};

/**
 * Builds an enumeration initializer string for the 'enu' function call.
 * Creates a properly formatted enumeration object with key-value pairs.
 *
 * @param enumerationMap - Map of enumeration keys to string values
 * @returns Formatted string for the enumeration function call, or empty string if invalid
 */
const buildEnumerationInitializer = (
  enumerationMap: EnumerationContent[NodeType.Enumeration]
): string => {
  const enumerationParts: string[] = [];

  for (const [enumerationKey, enumerationValue] of Object.entries(
    enumerationMap
  )) {
    if (typeof enumerationValue !== 'string') return '';
    // Non-string values are not supported for enumerations
    enumerationParts.push(
      `${stringifyKey(enumerationKey)}: ${JSON.stringify(enumerationValue)}`
    );
  }

  return `enu({ ${enumerationParts.join(', ')} })`;
};

/**
 * Builds a condition initializer string for the 'cond' function call.
 * Creates a properly formatted condition object with key-value pairs.
 *
 * @param conditionMap - Map of condition keys to string values
 * @returns Formatted string for the condition function call, or empty string if invalid
 */
const buildConditionInitializer = (
  conditionMap: ConditionContent[NodeType.Condition]
): string => {
  const conditionParts: string[] = [];

  for (const [conditionKey, conditionValue] of Object.entries(conditionMap)) {
    if (typeof conditionValue !== 'string') return '';

    conditionParts.push(
      `${stringifyKey(conditionKey)}: ${JSON.stringify(conditionValue)}`
    );
  }

  return `cond({ ${conditionParts.join(', ')} })`;
};

/**
 * Builds a gender initializer string for the 'gender' function call.
 * Creates a properly formatted gender object with key-value pairs.
 *
 * @param genderMap - Map of gender keys to string values
 * @returns Formatted string for the gender function call, or empty string if invalid
 */
const buildGenderInitializer = (
  genderMap: GenderContent[NodeType.Gender]
): string => {
  const genderParts: string[] = [];

  for (const [genderKey, genderValue] of Object.entries(genderMap)) {
    if (typeof genderValue !== 'string') return '';

    genderParts.push(
      `${stringifyKey(genderKey)}: ${JSON.stringify(genderValue)}`
    );
  }

  return `gender({ ${genderParts.join(', ')} })`;
};

/**
 * Builds an insertion initializer string for the 'insert' function call.
 * Handles both string content and translation content for insertions.
 *
 * @param insertionContent - The content to be inserted (string or translation)
 * @returns Formatted string for the insertion function call, or undefined if invalid
 */
const buildInsertionInitializer = (
  insertionContent: InsertionContent[NodeType.Insertion]
): string | undefined => {
  if (typeof insertionContent === 'string')
    return `insert(${JSON.stringify(insertionContent)})`;

  if (getNodeType(insertionContent as ContentNode) === NodeType.Translation) {
    const translationContent = insertionContent as TranslationContent;
    const translationMap = translationContent[NodeType.Translation] ?? {};

    const areAllValuesStrings = Object.values(translationMap).every(
      (translationValue) => typeof translationValue === 'string'
    );

    if (!areAllValuesStrings) return undefined;

    return `insert(${buildTranslationInitializer(translationMap)})`;
  }

  return;
};

/**
 * Builds a file initializer string for the 'file' function call.
 * Creates a properly formatted file path reference.
 *
 * @param filePath - The file path to reference
 * @returns Formatted string for the file function call, or undefined if invalid
 */
const buildFileInitializer = (filePath: unknown): string | undefined => {
  if (typeof filePath === 'string') return `file(${JSON.stringify(filePath)})`;

  return;
};

/**
 * Builds a markdown initializer string for the 'md' function call.
 * Handles string content, translation content, and file references for markdown.
 *
 * @param markdownContent - The markdown content (string, translation, or file reference)
 * @returns Formatted string for the markdown function call, or undefined if invalid
 */
const buildMarkdownInitializer = (
  markdownContent: MarkdownContent[NodeType.Markdown]
): string | undefined => {
  if (typeof markdownContent === 'string')
    return `md(${JSON.stringify(markdownContent)})`;

  // Support markdown translations: md(t({ en: '...', fr: '...' }))
  if (getNodeType(markdownContent as ContentNode) === NodeType.Translation) {
    const translationContent = markdownContent as TranslationContent;
    const translationMap = translationContent[NodeType.Translation] ?? {};
    const areAllValuesStrings = Object.values(translationMap).every(
      (translationValue) => typeof translationValue === 'string'
    );

    if (!areAllValuesStrings) return undefined;

    return `md(${buildTranslationInitializer(translationMap)})`;
  }

  if (getNodeType(markdownContent as ContentNode) === NodeType.File) {
    const filePath = (markdownContent as FileContent)[NodeType.File];

    const fileInitializer = buildFileInitializer(filePath);

    if (!fileInitializer) return undefined;

    return `md(${fileInitializer})`;
  }

  return;
};

/**
 * Builds a nested initializer string for the 'nest' function call.
 * Creates a properly formatted nested dictionary reference.
 *
 * @param nestedContent - The nested content with dictionary key and optional path
 * @returns Formatted string for the nested function call, or undefined if invalid
 */
const buildNestedInitializer = (
  nestedContent: NestedContent[NodeType.Nested]
): string | undefined => {
  // nestedContent is already the unwrapped { dictionaryKey, path } object

  if (!nestedContent || typeof nestedContent.dictionaryKey !== 'string')
    return undefined;

  if (nestedContent.path && typeof nestedContent.path === 'string') {
    return `nest(${JSON.stringify(nestedContent.dictionaryKey)}, ${JSON.stringify(nestedContent.path)})`;
  }

  return `nest(${JSON.stringify(nestedContent.dictionaryKey)})`;
};

/**
 * Reads an existing translation map from a property in a content object.
 * Parses the 't' function call and extracts the translation key-value pairs.
 *
 * @param contentObject - The object containing the property
 * @param propertyName - The name of the property to read
 * @returns Translation map with locale keys and values, or undefined if not found
 */
const readExistingTranslationMap = (
  contentObject: ObjectLiteralExpression,
  propertyName: string
): Record<string, string | string[]> | undefined => {
  const property = contentObject.getProperty(propertyName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const propertyInitializer = property.getInitializer();

  if (!propertyInitializer) return undefined;

  if (!Node.isCallExpression(propertyInitializer)) return undefined;

  const callExpression = propertyInitializer.getExpression();

  if (!Node.isIdentifier(callExpression) || callExpression.getText() !== 't')
    return undefined;

  const translationArgument = propertyInitializer.getArguments()[0];

  if (
    !translationArgument ||
    !Node.isObjectLiteralExpression(translationArgument)
  )
    return undefined;

  const translationMap: Record<string, string | string[]> = {};

  for (const propertyAssignment of translationArgument.getProperties()) {
    if (!Node.isPropertyAssignment(propertyAssignment)) continue;

    const propertyNameNode = propertyAssignment.getNameNode();
    const rawPropertyName = propertyNameNode.getText();
    const cleanPropertyName = rawPropertyName.replace(/^['"]|['"]$/g, '');
    const valueInitializer = propertyAssignment.getInitializer();

    if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
      translationMap[cleanPropertyName] = valueInitializer.getLiteralValue();
    } else if (
      valueInitializer &&
      Node.isArrayLiteralExpression(valueInitializer)
    ) {
      const stringArray: string[] = [];

      for (const arrayElement of valueInitializer.getElements()) {
        if (!Node.isStringLiteral(arrayElement)) return undefined;
        stringArray.push(arrayElement.getLiteralValue());
      }
      translationMap[cleanPropertyName] = stringArray;
    } else {
      return undefined;
    }
  }

  return translationMap;
};

/**
 * Reads an existing map from a function call (enu, cond, or gender).
 * Parses the function call and extracts the key-value pairs.
 *
 * @param contentObject - The object containing the property
 * @param propertyName - The name of the property to read
 * @param functionName - The name of the function to look for ('enu', 'cond', or 'gender')
 * @returns Map with keys and string values, or undefined if not found
 */
const readExistingMapFromCall = (
  contentObject: ObjectLiteralExpression,
  propertyName: string,
  functionName: 'enu' | 'cond' | 'gender'
): Record<string, string> | undefined => {
  const property = contentObject.getProperty(propertyName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const propertyInitializer = property.getInitializer();

  if (!propertyInitializer || !Node.isCallExpression(propertyInitializer))
    return undefined;

  const callExpression = propertyInitializer.getExpression();

  if (
    !Node.isIdentifier(callExpression) ||
    callExpression.getText() !== functionName
  )
    return undefined;

  const functionArgument = propertyInitializer.getArguments()[0];

  if (!functionArgument || !Node.isObjectLiteralExpression(functionArgument))
    return undefined;

  const keyValueMap: Record<string, string> = {};

  for (const propertyAssignment of functionArgument.getProperties()) {
    if (!Node.isPropertyAssignment(propertyAssignment)) continue;

    const propertyNameNode = propertyAssignment.getNameNode();
    const rawPropertyName = propertyNameNode.getText();
    const cleanPropertyName = rawPropertyName.replace(/^['"]|['"]$/g, '');
    const valueInitializer = propertyAssignment.getInitializer();

    if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
      keyValueMap[cleanPropertyName] = valueInitializer.getLiteralValue();
    }
  }

  return keyValueMap;
};

/**
 * Extracts generic type arguments text from a call expression.
 * Returns the type arguments as a string (e.g., "<string[]>").
 *
 * @param callExpression - The call expression to extract type arguments from
 * @returns Type arguments as a string, or undefined if none found
 */
const getCallExpressionTypeArgsText = (
  callExpression: CallExpression
): string | undefined => {
  try {
    const typeArguments = callExpression.getTypeArguments();
    if (!typeArguments || typeArguments.length === 0) return undefined;
    const typeArgumentsText = `<${typeArguments.map((typeArgument) => typeArgument.getText()).join(', ')}>`;
    return typeArgumentsText;
  } catch {
    return undefined;
  }
};

/**
 * Reads existing type arguments used in a specific property call.
 * Supports both direct calls and nested calls (e.g., md(t<...>(...))).
 *
 * @param contentObject - The object containing the property
 * @param propertyName - The name of the property to read
 * @param functionName - The name of the function to look for
 * @returns Type arguments as a string, or undefined if not found
 */
const readExistingTypeArgsForCall = (
  contentObject: ObjectLiteralExpression,
  propertyName: string,
  functionName:
    | 't'
    | 'md'
    | 'insert'
    | 'enu'
    | 'cond'
    | 'gender'
    | 'nest'
    | 'file'
): string | undefined => {
  const property = contentObject.getProperty(propertyName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;
  const propertyInitializer = property.getInitializer();

  if (!propertyInitializer || !Node.isCallExpression(propertyInitializer))
    return undefined;
  const callExpression = propertyInitializer.getExpression();

  if (
    Node.isIdentifier(callExpression) &&
    callExpression.getText() === functionName
  ) {
    return getCallExpressionTypeArgsText(propertyInitializer);
  }

  // Support nested md(t<...>(...)) when asking for 't'
  if (
    functionName === 't' &&
    Node.isIdentifier(callExpression) &&
    callExpression.getText() === 'md'
  ) {
    const markdownArgument = propertyInitializer.getArguments()[0];
    if (markdownArgument && Node.isCallExpression(markdownArgument)) {
      const innerExpression = markdownArgument.getExpression();
      if (
        Node.isIdentifier(innerExpression) &&
        innerExpression.getText() === 't'
      ) {
        return getCallExpressionTypeArgsText(markdownArgument);
      }
    }
  }
  return undefined;
};

/**
 * Compares two string maps for equality.
 * Filters out non-string values from the first map before comparison.
 *
 * @param firstMap - First map to compare (may contain non-string values)
 * @param secondMap - Second map to compare (should contain only strings)
 * @returns True if the string values in both maps are equal
 */
const areStringMapsEqual = (
  firstMap: Record<string, unknown>,
  secondMap: Record<string, string> | undefined
): boolean => {
  if (!secondMap) return false;

  // Filter to only string values from the first map
  const firstMapStringEntries = Object.entries(firstMap).filter(
    ([, value]) => typeof value === 'string'
  ) as [string, string][];

  // Check if all values in first map are strings
  if (firstMapStringEntries.length !== Object.keys(firstMap).length)
    return false;

  // Check if both maps have the same number of entries
  if (firstMapStringEntries.length !== Object.keys(secondMap).length)
    return false;

  // Compare each key-value pair
  for (const [key, value] of firstMapStringEntries) {
    if (!(key in secondMap)) return false;

    if (secondMap[key] !== value) return false;
  }

  return true;
};

/**
 * Compares translation maps for equality.
 * Handles both string and array values in translations.
 *
 * @param desiredTranslationMap - The desired translation map
 * @param existingTranslationMap - The existing translation map to compare against
 * @returns True if both translation maps are equal
 */
const areTranslationsEqual = (
  desiredTranslationMap: Record<string, unknown>,
  existingTranslationMap: Record<string, string | string[]> | undefined
): boolean => {
  if (!existingTranslationMap) return false;

  for (const [localeCode, desiredValue] of Object.entries(
    desiredTranslationMap
  )) {
    if (!(localeCode in existingTranslationMap)) return false;
    const existingValue = existingTranslationMap[localeCode];

    if (typeof desiredValue === 'string') {
      if (typeof existingValue !== 'string') return false;

      if (existingValue !== desiredValue) return false;
    } else if (Array.isArray(desiredValue)) {
      if (!Array.isArray(existingValue)) return false;

      if (existingValue.length !== desiredValue.length) return false;

      for (let arrayIndex = 0; arrayIndex < desiredValue.length; arrayIndex++)
        if (existingValue[arrayIndex] !== desiredValue[arrayIndex])
          return false;
    } else {
      return false;
    }
  }

  return true;
};

/**
 * Gets existing property names from the content object.
 * Handles both regular property assignments and shorthand properties.
 *
 * @param contentObject - The object literal expression to extract property names from
 * @returns Set of existing property names
 */
const getExistingPropertyNames = (
  contentObject: ObjectLiteralExpression
): Set<string> => {
  const existingPropertyNames = new Set<string>();

  for (const property of contentObject.getProperties()) {
    if (Node.isPropertyAssignment(property)) {
      const propertyName = property.getName();

      if (propertyName)
        existingPropertyNames.add(propertyName.replace(/^['"]|['"]$/g, ''));
      continue;
    }
    // Also consider shorthand properties like { pricing }
    if (Node.isShorthandPropertyAssignment(property)) {
      const shorthandPropertyName = property.getNameNode().getText();
      if (shorthandPropertyName)
        existingPropertyNames.add(shorthandPropertyName);
    }
  }
  return existingPropertyNames;
};

/**
 * Processes array content entries.
 * Handles arrays of various content types including strings, objects, and complex content nodes.
 * Supports nested objects within arrays and maintains existing translation structures.
 *
 * @param contentObject - The object containing the array property
 * @param propertyKey - The key of the array property
 * @param arrayValue - The array of values to process
 * @param existingPropertyKeys - Set of existing property names in the content object
 * @param effectiveFallbackLocale - The fallback locale for translations
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processArrayContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  arrayValue: unknown[],
  existingPropertyKeys: Set<string>,
  effectiveFallbackLocale: string,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  // If property key is absent locally but present in a spread source, defer to that object
  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processArrayContent(
        spreadTargetObject,
        propertyKey,
        arrayValue,
        getExistingPropertyNames(spreadTargetObject),
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );
    }
  }
  const serializedArrayElements: string[] = [];
  let hasUnsupportedContent = false;
  let existingArrayElements: import('ts-morph').Node[] | undefined;
  let existingArrayHasTranslation = false;
  let existingArrayTypeArguments: string | undefined;
  let arrayWasChanged = false;

  const existingProperty = contentObject.getProperty(propertyKey);

  if (existingProperty && Node.isPropertyAssignment(existingProperty)) {
    const propertyInitializer = existingProperty.getInitializer();
    let existingPropertyTypeArguments: string | undefined;
    const areAllDesiredValuesStrings = arrayValue.every(
      (arrayElement) => typeof arrayElement === 'string'
    );

    if (
      propertyInitializer &&
      Node.isCallExpression(propertyInitializer) &&
      Node.isIdentifier(propertyInitializer.getExpression()) &&
      propertyInitializer.getExpression().getText() === 't' &&
      areAllDesiredValuesStrings
    ) {
      existingPropertyTypeArguments =
        getCallExpressionTypeArgsText(propertyInitializer);
      const existingTranslationMap = readExistingTranslationMap(
        contentObject,
        propertyKey
      );

      if (existingTranslationMap) {
        const updatedTranslationMap = {
          ...existingTranslationMap,
          [effectiveFallbackLocale]: arrayValue as string[],
        } as Record<string, string | string[]>;
        const translationInitializerText = buildTranslationInitializer(
          updatedTranslationMap as any,
          existingPropertyTypeArguments
        );
        requiredImports.add('t');
        const property = contentObject.getProperty(propertyKey);

        if (property && Node.isPropertyAssignment(property)) {
          const currentInitializerText = property.getInitializer()?.getText();

          if (currentInitializerText !== translationInitializerText) {
            property.setInitializer(translationInitializerText);
            return true;
          }
        }
        return false;
      }
    }

    if (
      propertyInitializer &&
      Node.isArrayLiteralExpression(propertyInitializer)
    ) {
      existingArrayElements = propertyInitializer.getElements();
      existingArrayHasTranslation = propertyInitializer
        .getElements()
        .some((arrayElement) => {
          if (!Node.isCallExpression(arrayElement)) return false;
          const callExpression = arrayElement.getExpression();
          return (
            Node.isIdentifier(callExpression) &&
            callExpression.getText() === 't'
          );
        });
      if (existingArrayHasTranslation) {
        for (const arrayElement of existingArrayElements) {
          if (Node.isCallExpression(arrayElement)) {
            const callExpression = arrayElement.getExpression();
            if (
              Node.isIdentifier(callExpression) &&
              callExpression.getText() === 't'
            ) {
              existingArrayTypeArguments =
                getCallExpressionTypeArgsText(arrayElement);
              if (existingArrayTypeArguments) break;
            }
          }
        }
      }
    }
  }

  for (let elementIndex = 0; elementIndex < arrayValue.length; elementIndex++) {
    const currentElement = arrayValue[elementIndex];

    if (
      currentElement === null ||
      currentElement === undefined ||
      typeof currentElement === 'string' ||
      typeof currentElement === 'number' ||
      typeof currentElement === 'boolean'
    ) {
      let serializedElementValue = serializeValue(
        currentElement as ContentNode
      );

      if (
        typeof currentElement === 'string' &&
        existingArrayElements &&
        elementIndex < existingArrayElements.length
      ) {
        const existingArrayElement = existingArrayElements[elementIndex];

        if (Node.isCallExpression(existingArrayElement)) {
          const callExpression = existingArrayElement.getExpression();

          if (
            Node.isIdentifier(callExpression) &&
            callExpression.getText() === 't'
          ) {
            const translationArgument = existingArrayElement.getArguments()[0];

            if (
              translationArgument &&
              Node.isObjectLiteralExpression(translationArgument)
            ) {
              const translationMap: Record<string, string> = {};

              for (const propertyAssignment of translationArgument.getProperties()) {
                if (!Node.isPropertyAssignment(propertyAssignment)) continue;
                const propertyNameNode = propertyAssignment.getNameNode();
                const rawPropertyName = propertyNameNode.getText();
                const cleanPropertyName = rawPropertyName.replace(
                  /^['"]|['"]$/g,
                  ''
                );
                const propertyValue = propertyAssignment.getInitializer();

                if (propertyValue && Node.isStringLiteral(propertyValue)) {
                  translationMap[cleanPropertyName] =
                    propertyValue.getLiteralValue();
                }
              }

              const updatedTranslationMap = syncNumericSuffixAcrossLocales(
                translationMap,
                effectiveFallbackLocale,
                currentElement
              ) as StrictModeLocaleMap;

              const translationTypeArguments =
                getCallExpressionTypeArgsText(existingArrayElement);
              serializedElementValue = buildTranslationInitializer(
                updatedTranslationMap,
                translationTypeArguments
              );
              requiredImports.add('t');
            }
          }
        }
      }

      if (
        typeof currentElement === 'string' &&
        existingArrayHasTranslation &&
        serializedElementValue &&
        serializedElementValue.startsWith('"')
      ) {
        serializedElementValue = buildTranslationInitializer(
          {
            [effectiveFallbackLocale]: currentElement,
          } as StrictModeLocaleMap,
          existingArrayTypeArguments
        );

        requiredImports.add('t');
      }

      if (serializedElementValue === undefined) {
        hasUnsupportedContent = true;
        break;
      }

      serializedArrayElements.push(serializedElementValue);
    } else if (typeof currentElement === 'object' && currentElement !== null) {
      // Handle nested objects within arrays

      if (
        existingArrayElements &&
        elementIndex < existingArrayElements.length
      ) {
        const existingArrayElement = existingArrayElements[elementIndex];

        if (Node.isObjectLiteralExpression(existingArrayElement)) {
          // Process nested object within array element
          const elementWasChanged = processContentEntries(
            existingArrayElement,
            currentElement as Record<string, unknown>,
            effectiveFallbackLocale,
            requiredImports,
            sourceFile
          );

          if (elementWasChanged) arrayWasChanged = true;

          serializedArrayElements.push(existingArrayElement.getText());
        } else {
          // Element exists but is not an object - serialize normally
          const serializedElementValue = serializeValue(
            currentElement as ContentNode
          );

          if (serializedElementValue === undefined) {
            hasUnsupportedContent = true;
            break;
          }

          serializedArrayElements.push(serializedElementValue);
        }
      } else {
        // New element - serialize it
        const serializedElementValue = serializeValue(
          currentElement as ContentNode
        );

        if (serializedElementValue === undefined) {
          hasUnsupportedContent = true;
          break;
        }

        serializedArrayElements.push(serializedElementValue);
      }

      const elementNodeType = getNodeType(currentElement as ContentNode);

      if (elementNodeType === NodeType.Translation) requiredImports.add('t');
      else if (elementNodeType === NodeType.Enumeration)
        requiredImports.add('enu');
      else if (elementNodeType === NodeType.Condition)
        requiredImports.add('cond');
      else if (elementNodeType === NodeType.Gender)
        requiredImports.add('gender');
      else if (elementNodeType === NodeType.Insertion) {
        requiredImports.add('insert');
        const insertionContent = (currentElement as InsertionContent)[
          NodeType.Insertion
        ];

        if (
          typeof insertionContent === 'object' &&
          insertionContent !== null &&
          getNodeType(insertionContent as ContentNode) === NodeType.Translation
        ) {
          requiredImports.add('t');
        }
      } else if (elementNodeType === NodeType.Markdown) {
        requiredImports.add('md');
        const markdownContent = (currentElement as MarkdownContent)[
          NodeType.Markdown
        ];

        if (
          typeof markdownContent === 'object' &&
          markdownContent !== null &&
          getNodeType(markdownContent as ContentNode) === NodeType.File
        ) {
          requiredImports.add('file');
        }
      } else if (elementNodeType === NodeType.File) requiredImports.add('file');
      else if (elementNodeType === NodeType.Nested) requiredImports.add('nest');
    } else {
      hasUnsupportedContent = true;
      break;
    }
  }

  if (hasUnsupportedContent) {
    return false;
  }

  // If we modified nested objects in place, return the changed status
  if (arrayWasChanged) {
    return true;
  }

  const arrayInitializerText = `[ ${serializedArrayElements.join(', ')} ]`;

  if (!existingPropertyKeys.has(propertyKey)) {
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: arrayInitializerText,
    });
    return true;
  }

  const property = contentObject.getProperty(propertyKey);

  if (property && Node.isPropertyAssignment(property)) {
    const existingSerializedArray = readExistingArraySerialized(
      contentObject,
      propertyKey
    );

    const areArraysEqual =
      existingSerializedArray !== undefined &&
      existingSerializedArray.length === serializedArrayElements.length &&
      existingSerializedArray.every(
        (existingElement, elementIndex) =>
          existingElement === serializedArrayElements[elementIndex]
      );

    if (!areArraysEqual) {
      property.setInitializer(arrayInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes primitive content entries (string, number, boolean, null).
 * Handles simple value types and updates existing translation maps when appropriate.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param primitiveValue - The primitive value to process
 * @param existingPropertyKeys - Set of existing property names
 * @param effectiveFallbackLocale - The fallback locale for translations
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processPrimitiveContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  primitiveValue: string | number | boolean | null,
  existingPropertyKeys: Set<string>,
  effectiveFallbackLocale: string,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  if (
    typeof primitiveValue === 'string' &&
    existingPropertyKeys.has(propertyKey)
  ) {
    const property = contentObject.getProperty(propertyKey);

    // Check if existing value is a non-string-literal (e.g., variable reference)

    if (property && Node.isPropertyAssignment(property)) {
      const propertyInitializer = property.getInitializer();

      // If the existing value is not a string literal or a call expression (like t()),
      // skip updating it to preserve variable references

      if (
        propertyInitializer &&
        !Node.isStringLiteral(propertyInitializer) &&
        !Node.isCallExpression(propertyInitializer)
      ) {
        console.log(
          `Skipping update for key "${propertyKey}" because existing value is not a string literal`
        );
        return false;
      }
    }

    const existingTranslationMap = readExistingTranslationMap(
      contentObject,
      propertyKey
    );

    if (existingTranslationMap) {
      const updatedTranslationMap = {
        ...existingTranslationMap,
        [effectiveFallbackLocale]: primitiveValue,
      } as StrictModeLocaleMap;

      const translationTypeArguments = readExistingTypeArgsForCall(
        contentObject,
        propertyKey,
        't'
      );
      const translationInitializerText = buildTranslationInitializer(
        updatedTranslationMap,
        translationTypeArguments
      );

      requiredImports.add('t');

      if (property && Node.isPropertyAssignment(property)) {
        property.setInitializer(translationInitializerText);
        return true;
      }

      return false;
    }
  }

  if (!existingPropertyKeys.has(propertyKey)) {
    // If the key is not locally present, but exists in a spread source, update that spread source instead
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      // Recurse into the spread target object
      const nestedObjectWasChanged = processPrimitiveContent(
        spreadTargetObject,
        propertyKey,
        primitiveValue,
        getExistingPropertyNames(spreadTargetObject),
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );
      return nestedObjectWasChanged;
    }
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer:
        typeof primitiveValue === 'string'
          ? JSON.stringify(primitiveValue)
          : String(primitiveValue),
    });

    return true;
  }

  const property = contentObject.getProperty(propertyKey);

  if (property && Node.isPropertyAssignment(property)) {
    const propertyInitializer = property.getInitializer();

    // Check if existing value is a non-primitive-literal (e.g., variable reference)
    const isPrimitiveLiteral =
      propertyInitializer &&
      (Node.isStringLiteral(propertyInitializer) ||
        Node.isNumericLiteral(propertyInitializer) ||
        propertyInitializer.getKind() === SyntaxKind.TrueKeyword ||
        propertyInitializer.getKind() === SyntaxKind.FalseKeyword ||
        Node.isNullLiteral(propertyInitializer) ||
        Node.isCallExpression(propertyInitializer));

    if (propertyInitializer && !isPrimitiveLiteral) {
      console.log(
        `Skipping update for key "${propertyKey}" because existing value is not a primitive literal`
      );
      return false;
    }

    const currentInitializerText = propertyInitializer?.getText();
    const desiredInitializerText =
      typeof primitiveValue === 'string'
        ? JSON.stringify(primitiveValue)
        : String(primitiveValue);

    if (currentInitializerText !== desiredInitializerText) {
      property.setInitializer(desiredInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes complex content entries (translation, enumeration, condition, etc.).
 * Routes content to the appropriate specialized processor based on node type.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The complex content node to process
 * @param existingPropertyKeys - Set of existing property names
 * @param effectiveFallbackLocale - The fallback locale for translations
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processComplexContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  effectiveFallbackLocale: string,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const nodeType = getNodeType(contentNode);

  switch (nodeType) {
    case NodeType.Translation:
      return processTranslationContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    case NodeType.Enumeration:
      return processEnumerationContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    case NodeType.Condition:
      return processConditionContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    case NodeType.Gender:
      return processGenderContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    case NodeType.Insertion:
      return processInsertionContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    case NodeType.Markdown:
      return processMarkdownContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );
    case NodeType.File:
      return processFileContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    case NodeType.Nested:
      return processNestedContent(
        contentObject,
        propertyKey,
        contentNode,
        existingPropertyKeys,
        requiredImports,
        sourceFile
      );
    default:
      return false;
  }
};

/**
 * Processes translation content.
 * Handles translation objects with locale keys and string/array values.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The translation content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processTranslationContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const translationMap: Record<string, unknown> =
    (contentNode as TranslationContent)[NodeType.Translation] ?? {};

  // Check if all values are simple types (strings or arrays)
  const areAllValuesStringsOrArrays = Object.values(translationMap).every(
    (translationValue) =>
      typeof translationValue === 'string' || Array.isArray(translationValue)
  );

  // Check if any values are complex content nodes
  const hasComplexContentNodes = Object.values(translationMap).some(
    (translationValue) =>
      typeof translationValue === 'object' &&
      translationValue !== null &&
      !Array.isArray(translationValue) &&
      getNodeType(translationValue as ContentNode) !== NodeType.Text
  );

  // If we have complex content nodes, handle them separately
  if (hasComplexContentNodes && !areAllValuesStringsOrArrays) {
    // If property key is absent locally, try to delegate into a spread source that contains the key
    if (!existingPropertyKeys.has(propertyKey)) {
      const spreadTargetObject = findSpreadTargetObjectForKey(
        contentObject,
        propertyKey,
        sourceFile
      );
      if (spreadTargetObject) {
        return processTranslationContent(
          spreadTargetObject,
          propertyKey,
          contentNode,
          getExistingPropertyNames(spreadTargetObject),
          requiredImports,
          sourceFile
        );
      }
    }

    const translationParts: string[] = [];
    let hasUnsupportedValue = false;

    for (const [localeCode, translationValue] of Object.entries(
      translationMap
    )) {
      const isLocaleCodeValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(
        localeCode
      );
      const formattedLocaleKey = isLocaleCodeValidIdentifier
        ? localeCode
        : JSON.stringify(localeCode);

      // Handle complex content nodes
      if (
        typeof translationValue === 'object' &&
        translationValue !== null &&
        !Array.isArray(translationValue)
      ) {
        const serializedValue = serializeValue(translationValue as ContentNode);
        if (serializedValue === undefined) {
          hasUnsupportedValue = true;
          break;
        }
        translationParts.push(`${formattedLocaleKey}: ${serializedValue}`);

        // Track required imports for nested content
        const nodeType = getNodeType(translationValue as ContentNode);
        if (nodeType === NodeType.Markdown) {
          requiredImports.add('md');
          const markdownContent = (translationValue as MarkdownContent)[
            NodeType.Markdown
          ];
          if (
            typeof markdownContent === 'object' &&
            markdownContent !== null &&
            getNodeType(markdownContent as ContentNode) === NodeType.File
          ) {
            requiredImports.add('file');
          }
        } else if (nodeType === NodeType.File) {
          requiredImports.add('file');
        } else if (nodeType === NodeType.Insertion) {
          requiredImports.add('insert');
        } else if (nodeType === NodeType.Enumeration) {
          requiredImports.add('enu');
        } else if (nodeType === NodeType.Condition) {
          requiredImports.add('cond');
        } else if (nodeType === NodeType.Gender) {
          requiredImports.add('gender');
        } else if (nodeType === NodeType.Nested) {
          requiredImports.add('nest');
        }
      } else if (typeof translationValue === 'string') {
        translationParts.push(
          `${formattedLocaleKey}: ${JSON.stringify(translationValue)}`
        );
      } else if (Array.isArray(translationValue)) {
        const serializedArrayElements = translationValue
          .map((arrayElement) => JSON.stringify(arrayElement))
          .join(', ');
        translationParts.push(
          `${formattedLocaleKey}: [ ${serializedArrayElements} ]`
        );
      }
    }

    if (hasUnsupportedValue) return false;

    const existingTypeArguments = readExistingTypeArgsForCall(
      contentObject,
      propertyKey,
      't'
    );
    const translationInitializerText = `t${existingTypeArguments ?? ''}({ ${translationParts.join(', ')} })`;

    if (!existingPropertyKeys.has(propertyKey)) {
      requiredImports.add('t');

      contentObject.addPropertyAssignment({
        name: propertyKey,
        initializer: translationInitializerText,
      });
      return true;
    }

    const property = contentObject.getProperty(propertyKey);
    if (property && Node.isPropertyAssignment(property)) {
      const currentInitializer = property.getInitializer()?.getText();
      if (currentInitializer !== translationInitializerText) {
        requiredImports.add('t');
        property.setInitializer(translationInitializerText);
        return true;
      }
    }

    return false;
  }

  // Original logic for simple string/array translations
  if (!areAllValuesStringsOrArrays) return false;

  // If property key is absent locally, try to delegate into a spread source that contains the key
  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processTranslationContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
  }

  const translationParts: string[] = [];

  for (const [localeCode, translationValue] of Object.entries(translationMap)) {
    const isLocaleCodeValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(
      localeCode
    );
    const formattedLocaleKey = isLocaleCodeValidIdentifier
      ? localeCode
      : JSON.stringify(localeCode);

    if (typeof translationValue === 'string') {
      translationParts.push(
        `${formattedLocaleKey}: ${JSON.stringify(translationValue)}`
      );
    } else if (Array.isArray(translationValue)) {
      const serializedArrayElements = translationValue
        .map((arrayElement) => JSON.stringify(arrayElement))
        .join(', ');
      translationParts.push(
        `${formattedLocaleKey}: [ ${serializedArrayElements} ]`
      );
    }
  }
  const existingTypeArguments = readExistingTypeArgsForCall(
    contentObject,
    propertyKey,
    't'
  );
  const translationInitializerText = `t${existingTypeArguments ?? ''}({ ${translationParts.join(', ')} })`;

  if (!existingPropertyKeys.has(propertyKey)) {
    requiredImports.add('t');

    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: translationInitializerText,
    });
    return true;
  }

  const existingTranslationMap = readExistingTranslationMap(
    contentObject,
    propertyKey
  );

  if (!areTranslationsEqual(translationMap, existingTranslationMap)) {
    requiredImports.add('t');
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(translationInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes enumeration content.
 * Handles enumeration objects with key-value string pairs.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The enumeration content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processEnumerationContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const enumerationMap: EnumerationContent[NodeType.Enumeration] = (
    contentNode as EnumerationContent
  )[NodeType.Enumeration];

  if (
    !Object.values(enumerationMap).every(
      (enumerationValue) => typeof enumerationValue === 'string'
    )
  )
    return false;
  const enumerationInitializerText =
    buildEnumerationInitializer(enumerationMap);

  if (!enumerationInitializerText) return false;

  if (!existingPropertyKeys.has(propertyKey)) {
    // Delegate into spread source if available
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processEnumerationContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
    requiredImports.add('enu');
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: enumerationInitializerText,
    });
    return true;
  }
  const existingEnumerationMap = readExistingMapFromCall(
    contentObject,
    propertyKey,
    'enu'
  );

  if (!areStringMapsEqual(enumerationMap, existingEnumerationMap)) {
    requiredImports.add('enu');
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(enumerationInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes condition content.
 * Handles condition objects with key-value string pairs.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The condition content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processConditionContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const conditionMap: ConditionContent[NodeType.Condition] = (
    contentNode as ConditionContent
  )[NodeType.Condition];

  // Check if condition values are simple strings (old format)
  const hasSimpleStringValues = Object.values(conditionMap).every(
    (conditionValue) => typeof conditionValue === 'string'
  );

  if (hasSimpleStringValues) {
    // Handle simple string conditions (old behavior)
    const conditionInitializerText = buildConditionInitializer(conditionMap);

    if (!conditionInitializerText) return false;

    if (!existingPropertyKeys.has(propertyKey)) {
      const spreadTargetObject = findSpreadTargetObjectForKey(
        contentObject,
        propertyKey,
        sourceFile
      );
      if (spreadTargetObject) {
        return processConditionContent(
          spreadTargetObject,
          propertyKey,
          contentNode,
          getExistingPropertyNames(spreadTargetObject),
          requiredImports,
          sourceFile
        );
      }
      requiredImports.add('cond');
      contentObject.addPropertyAssignment({
        name: propertyKey,
        initializer: conditionInitializerText,
      });
      return true;
    }
    const existingConditionMap = readExistingMapFromCall(
      contentObject,
      propertyKey,
      'cond'
    );

    if (!areStringMapsEqual(conditionMap, existingConditionMap)) {
      requiredImports.add('cond');
      const property = contentObject.getProperty(propertyKey);

      if (property && Node.isPropertyAssignment(property)) {
        property.setInitializer(conditionInitializerText);
        return true;
      }
    }

    return false;
  }

  // Handle nested content nodes within conditions (new behavior)
  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processConditionContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
    // Property doesn't exist, we can't process nested content
    return false;
  }

  // Get the existing cond() call
  const property = contentObject.getProperty(propertyKey);
  if (!property || !Node.isPropertyAssignment(property)) return false;

  const propertyInitializer = property.getInitializer();
  if (!propertyInitializer || !Node.isCallExpression(propertyInitializer))
    return false;

  const callExpression = propertyInitializer.getExpression();
  if (!Node.isIdentifier(callExpression) || callExpression.getText() !== 'cond')
    return false;

  const condArgument = propertyInitializer.getArguments()[0];
  if (!condArgument || !Node.isObjectLiteralExpression(condArgument))
    return false;

  requiredImports.add('cond');

  // Process each condition branch (true, false, etc.)
  let hasModifications = false;
  for (const [conditionKey, conditionValue] of Object.entries(conditionMap)) {
    const nodeType = getNodeType(conditionValue as ContentNode);

    if (!nodeType) continue;

    // Find the property for this condition key in the cond() argument
    // Handle both regular identifiers and keywords like 'true'/'false'
    let condProperty = condArgument.getProperty(conditionKey);
    // If not found directly, try with stringifyKey which handles special cases
    if (!condProperty) {
      condProperty = condArgument.getProperty(stringifyKey(conditionKey));
    }
    if (!condProperty || !Node.isPropertyAssignment(condProperty)) continue;

    const condValueInitializer = condProperty.getInitializer();
    if (!condValueInitializer) continue;

    // Handle different content node types within the condition
    if (nodeType === NodeType.Translation) {
      if (!Node.isCallExpression(condValueInitializer)) continue;

      const tCallExpression = condValueInitializer.getExpression();
      if (
        !Node.isIdentifier(tCallExpression) ||
        tCallExpression.getText() !== 't'
      )
        continue;

      const tArgument = condValueInitializer.getArguments()[0];
      if (!tArgument || !Node.isObjectLiteralExpression(tArgument)) continue;

      // Process the translation object
      const translationContent = conditionValue as TranslationContent;
      const translationMap = translationContent[NodeType.Translation];

      // Skip if translation map is invalid
      if (!translationMap || typeof translationMap !== 'object') continue;

      // Read existing translations from the t() argument
      const existingTranslationMap: Record<string, string | string[]> = {};
      for (const propertyAssignment of tArgument.getProperties()) {
        if (!Node.isPropertyAssignment(propertyAssignment)) continue;

        const propertyNameNode = propertyAssignment.getNameNode();
        const rawPropertyName = propertyNameNode.getText();
        const cleanPropertyName = rawPropertyName.replace(/^['"]|['"]$/g, '');
        const valueInitializer = propertyAssignment.getInitializer();

        if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
          existingTranslationMap[cleanPropertyName] =
            valueInitializer.getLiteralValue();
        } else if (
          valueInitializer &&
          Node.isArrayLiteralExpression(valueInitializer)
        ) {
          const stringArray: string[] = [];
          for (const arrayElement of valueInitializer.getElements()) {
            if (Node.isStringLiteral(arrayElement)) {
              stringArray.push(arrayElement.getLiteralValue());
            }
          }
          existingTranslationMap[cleanPropertyName] = stringArray;
        }
      }

      const areEqual = areTranslationsEqual(
        translationMap,
        existingTranslationMap
      );

      if (!areEqual) {
        requiredImports.add('t');

        // Update the translation object
        for (const [locale, localeValue] of Object.entries(translationMap)) {
          // Format locale key properly for property lookup
          const isLocaleCodeValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(
            locale
          );
          const formattedLocaleKey = isLocaleCodeValidIdentifier
            ? locale
            : JSON.stringify(locale);

          // Try to find the property with both the raw locale and formatted key
          let existingProperty = tArgument.getProperty(locale);
          if (!existingProperty && !isLocaleCodeValidIdentifier) {
            // Try with quotes if locale has special characters
            existingProperty = tArgument.getProperty(JSON.stringify(locale));
          }

          if (existingProperty && Node.isPropertyAssignment(existingProperty)) {
            const currentValue = existingProperty.getInitializer();
            const newValue = Array.isArray(localeValue)
              ? `[${localeValue.map((v) => JSON.stringify(v)).join(', ')}]`
              : JSON.stringify(localeValue);

            if (currentValue?.getText() !== newValue) {
              existingProperty.setInitializer(newValue);
              hasModifications = true;
            }
          } else if (!existingProperty) {
            // Add new locale
            const newValue = Array.isArray(localeValue)
              ? `[${localeValue.map((v) => JSON.stringify(v)).join(', ')}]`
              : JSON.stringify(localeValue);

            tArgument.addPropertyAssignment({
              name: formattedLocaleKey,
              initializer: newValue,
            });
            hasModifications = true;
          }
        }
      }
    }
    // Add more handlers for other node types if needed
  }

  return hasModifications;
};

/**
 * Processes gender content.
 * Handles gender objects with key-value string pairs.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The gender content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processGenderContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const genderMap: GenderContent[NodeType.Gender] = (
    contentNode as GenderContent
  )[NodeType.Gender];

  if (
    !Object.values(genderMap).every(
      (genderValue) => typeof genderValue === 'string'
    )
  )
    return false;
  const genderInitializerText = buildGenderInitializer(genderMap);

  if (!genderInitializerText) return false;

  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processGenderContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
    requiredImports.add('gender');
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: genderInitializerText,
    });
    return true;
  }
  const existingGenderMap = readExistingMapFromCall(
    contentObject,
    propertyKey,
    'gender'
  );

  if (!areStringMapsEqual(genderMap, existingGenderMap)) {
    requiredImports.add('gender');
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(genderInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes insertion content.
 * Handles insertion objects with string or translation content.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The insertion content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processInsertionContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const insertionContent: InsertionContent[NodeType.Insertion] = (
    contentNode as InsertionContent
  )[NodeType.Insertion];
  const insertionInitializerText = buildInsertionInitializer(insertionContent);

  if (!insertionInitializerText) return false;

  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processInsertionContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
    requiredImports.add('insert');

    if (
      typeof insertionContent === 'object' &&
      insertionContent !== null &&
      getNodeType(insertionContent as ContentNode) === NodeType.Translation
    ) {
      requiredImports.add('t');
    }
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: insertionInitializerText,
    });
    return true;
  }
  const existingInsertion = readExistingInsertion(contentObject, propertyKey);
  const isInsertionSame =
    (typeof insertionContent === 'string' &&
      existingInsertion?.kind === 'string' &&
      existingInsertion.value === insertionContent) ||
    (typeof insertionContent === 'object' &&
      insertionContent !== null &&
      getNodeType(insertionContent as ContentNode) === NodeType.Translation &&
      existingInsertion?.kind === 'translation' &&
      areStringMapsEqual(
        (insertionContent as TranslationContent)[NodeType.Translation] ?? {},
        existingInsertion.map
      ));

  if (!isInsertionSame) {
    requiredImports.add('insert');

    if (
      typeof insertionContent === 'object' &&
      insertionContent !== null &&
      getNodeType(insertionContent as ContentNode) === NodeType.Translation
    ) {
      requiredImports.add('t');
    }
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(insertionInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes markdown content.
 * Handles markdown objects with string, translation, or file content.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The markdown content node
 * @param existingPropertyKeys - Set of existing property names
 * @param effectiveFallbackLocale - The fallback locale for translations
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processMarkdownContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  effectiveFallbackLocale: string,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const markdownContent: MarkdownContent[NodeType.Markdown] = (
    contentNode as MarkdownContent
  )[NodeType.Markdown];
  const markdownInitializerText = buildMarkdownInitializer(markdownContent);

  if (!markdownInitializerText) return false;

  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processMarkdownContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );
    }
    requiredImports.add('md');
    const markdownNodeType = getNodeType(markdownContent as ContentNode);

    if (markdownNodeType === NodeType.File) {
      requiredImports.add('file');
    } else if (markdownNodeType === NodeType.Translation) {
      requiredImports.add('t');
    }
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: markdownInitializerText,
    });
    return true;
  }
  const markdownNodeType = getNodeType(markdownContent as ContentNode);
  const existingSimpleMarkdown = readExistingMarkdown(
    contentObject,
    propertyKey
  );
  const existingMarkdownTranslationMap = readExistingMarkdownTranslationMap(
    contentObject,
    propertyKey
  );
  const existingTranslationTypeArguments = readExistingTypeArgsForCall(
    contentObject,
    propertyKey,
    't'
  );

  if (
    typeof markdownContent === 'string' &&
    existingMarkdownTranslationMap &&
    effectiveFallbackLocale
  ) {
    const updatedTranslationMap = {
      ...existingMarkdownTranslationMap,
      [effectiveFallbackLocale]: markdownContent,
    } as StrictModeLocaleMap;
    requiredImports.add('md');
    requiredImports.add('t');
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(
        `md(${buildTranslationInitializer(updatedTranslationMap, existingTranslationTypeArguments)})`
      );
      return true;
    }
    return false;
  }

  if (markdownNodeType === NodeType.Translation) {
    const markdownTranslationMap = (markdownContent as TranslationContent)[
      NodeType.Translation
    ] as StrictModeLocaleMap;
    const areAllValuesStrings = Object.values(markdownTranslationMap).every(
      (translationValue) => typeof translationValue === 'string'
    );

    if (!areAllValuesStrings) return false;
    const areTranslationMapsEqual = areStringMapsEqual(
      markdownTranslationMap,
      existingMarkdownTranslationMap
    );

    if (!areTranslationMapsEqual) {
      requiredImports.add('md');
      requiredImports.add('t');
      const property = contentObject.getProperty(propertyKey);

      if (property && Node.isPropertyAssignment(property)) {
        property.setInitializer(
          `md(${buildTranslationInitializer(markdownTranslationMap, existingTranslationTypeArguments)})`
        );
        return true;
      }
    }
    return false;
  }

  const isSimpleMarkdownSame =
    (typeof markdownContent === 'string' &&
      existingSimpleMarkdown?.kind === 'string' &&
      existingSimpleMarkdown.value === markdownContent) ||
    (markdownNodeType === NodeType.File &&
      existingSimpleMarkdown?.kind === 'file' &&
      existingSimpleMarkdown.path ===
        (markdownContent as FileContent)[NodeType.File]);

  if (!isSimpleMarkdownSame) {
    requiredImports.add('md');

    if (markdownNodeType === NodeType.File) {
      requiredImports.add('file');
    }
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(markdownInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes file content.
 * Handles file objects with file path references.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The file content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processFileContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const filePath: FileContent[NodeType.File] = (contentNode as FileContent)[
    NodeType.File
  ];
  const fileInitializerText = buildFileInitializer(filePath);

  if (!fileInitializerText) return false;

  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processFileContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
    requiredImports.add('file');
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: fileInitializerText,
    });
    return true;
  }
  const existingFilePath = readExistingFilePath(contentObject, propertyKey);

  if (existingFilePath !== filePath) {
    requiredImports.add('file');
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(fileInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes nested content.
 * Handles nested objects with dictionary key and optional path references.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param contentNode - The nested content node
 * @param existingPropertyKeys - Set of existing property names
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processNestedContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  contentNode: ContentNode,
  existingPropertyKeys: Set<string>,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  const nestedContent: NestedContent[NodeType.Nested] = (
    contentNode as NestedContent
  )[NodeType.Nested];
  const nestedInitializerText = buildNestedInitializer(nestedContent);

  if (!nestedInitializerText) return false;

  if (!existingPropertyKeys.has(propertyKey)) {
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processNestedContent(
        spreadTargetObject,
        propertyKey,
        contentNode,
        getExistingPropertyNames(spreadTargetObject),
        requiredImports,
        sourceFile
      );
    }
    requiredImports.add('nest');
    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: nestedInitializerText,
    });
    return true;
  }
  const existingNestedContent = readExistingNest(contentObject, propertyKey);
  const isNestedContentSame =
    !!nestedContent &&
    existingNestedContent?.dictionaryKey === nestedContent.dictionaryKey &&
    existingNestedContent?.path === nestedContent.path;

  if (!isNestedContentSame) {
    requiredImports.add('nest');
    const property = contentObject.getProperty(propertyKey);

    if (property && Node.isPropertyAssignment(property)) {
      property.setInitializer(nestedInitializerText);
      return true;
    }
  }

  return false;
};

/**
 * Processes nested object content.
 * Handles nested objects within content structures.
 *
 * @param contentObject - The object containing the property
 * @param propertyKey - The key of the property to process
 * @param nestedObjectValue - The nested object value to process
 * @param _existingPropertyKeys - Set of existing property names (unused)
 * @param effectiveFallbackLocale - The fallback locale for translations
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if the content was modified
 */
const processNestedObjectContent = (
  contentObject: ObjectLiteralExpression,
  propertyKey: string,
  nestedObjectValue: Record<string, unknown>,
  _existingPropertyKeys: Set<string>,
  effectiveFallbackLocale: string,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  let childObject: ObjectLiteralExpression | undefined;
  const existingProperty = contentObject.getProperty(propertyKey);

  if (existingProperty && Node.isPropertyAssignment(existingProperty)) {
    childObject = existingProperty.getInitializerIfKind(
      SyntaxKind.ObjectLiteralExpression
    );
  }

  // If property is shorthand or an identifier referencing another object, resolve it
  if (!childObject) {
    const shorthandProperty = contentObject.getProperty(propertyKey);
    if (
      shorthandProperty &&
      Node.isShorthandPropertyAssignment(shorthandProperty)
    ) {
      childObject = resolveNameToObjectLiteral(
        contentObject.getSourceFile(),
        propertyKey
      );
    } else if (
      existingProperty &&
      Node.isPropertyAssignment(existingProperty)
    ) {
      const propertyInitializer = existingProperty.getInitializer();
      if (propertyInitializer) {
        if (Node.isIdentifier(propertyInitializer)) {
          childObject = resolveNameToObjectLiteral(
            sourceFile,
            propertyInitializer.getText()
          );
        } else if (Node.isPropertyAccessExpression(propertyInitializer)) {
          childObject = resolveExpressionToObjectLiteral(
            sourceFile,
            propertyInitializer
          );
        }
      }
    }
  }

  if (!childObject) {
    // If property key not local, try route into a spread that already defines it (including nested object/property access like planDetails.free)
    const spreadTargetObject = findSpreadTargetObjectForKey(
      contentObject,
      propertyKey,
      sourceFile
    );
    if (spreadTargetObject) {
      return processNestedObjectContent(
        spreadTargetObject,
        propertyKey,
        nestedObjectValue,
        getExistingPropertyNames(spreadTargetObject),
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );
    }

    contentObject.addPropertyAssignment({
      name: propertyKey,
      initializer: '{ }',
    });
    const newProperty = contentObject.getProperty(propertyKey);

    if (newProperty && Node.isPropertyAssignment(newProperty)) {
      childObject = newProperty.getInitializerIfKind(
        SyntaxKind.ObjectLiteralExpression
      );
    }
  }

  if (childObject) {
    return processContentEntries(
      childObject,
      nestedObjectValue,
      effectiveFallbackLocale,
      requiredImports,
      sourceFile
    );
  }

  return false;
};

/**
 * Processes content entries in a dictionary object.
 * Routes different content types to appropriate processors.
 *
 * @param contentObject - The object containing the content
 * @param dictionaryContent - The dictionary content to process
 * @param effectiveFallbackLocale - The fallback locale for translations
 * @param requiredImports - Set to track required imports
 * @param sourceFile - The source file being processed
 * @returns True if any content was modified
 */
const processContentEntries = (
  contentObject: ObjectLiteralExpression,
  dictionaryContent: Record<string, unknown>,
  effectiveFallbackLocale: string,
  requiredImports: Set<string>,
  sourceFile: SourceFile
): boolean => {
  let contentWasChanged = false;

  const existingPropertyKeys = getExistingPropertyNames(contentObject);

  for (const [propertyKey, propertyValue] of Object.entries(
    dictionaryContent
  )) {
    if (Array.isArray(propertyValue)) {
      const arrayWasChanged = processArrayContent(
        contentObject,
        propertyKey,
        propertyValue,
        existingPropertyKeys,
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );

      if (arrayWasChanged) contentWasChanged = true;
      continue;
    }

    if (
      typeof propertyValue === 'string' ||
      typeof propertyValue === 'number' ||
      typeof propertyValue === 'boolean' ||
      propertyValue === null
    ) {
      const primitiveWasChanged = processPrimitiveContent(
        contentObject,
        propertyKey,
        propertyValue as string | number | boolean | null,
        existingPropertyKeys,
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );

      if (primitiveWasChanged) contentWasChanged = true;
      continue;
    }

    // Check if it's a complex content node
    const nodeType = getNodeType(propertyValue as ContentNode);

    if (
      nodeType !== NodeType.Text &&
      nodeType !== NodeType.Number &&
      nodeType !== NodeType.Boolean &&
      nodeType !== NodeType.Null
    ) {
      const complexContentWasChanged = processComplexContent(
        contentObject,
        propertyKey,
        propertyValue as ContentNode,
        existingPropertyKeys,
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );

      if (complexContentWasChanged) {
        contentWasChanged = true;
        continue; // Only skip nested handling if we actually processed a complex node
      }
      // Fall through to nested object handling when not a recognized complex node
    }

    // Handle nested objects

    if (
      propertyValue &&
      typeof propertyValue === 'object' &&
      !Array.isArray(propertyValue) &&
      !(propertyValue as any).nodeType
    ) {
      const nestedObjectWasChanged = processNestedObjectContent(
        contentObject,
        propertyKey,
        propertyValue as Record<string, unknown>,
        existingPropertyKeys,
        effectiveFallbackLocale,
        requiredImports,
        sourceFile
      );

      if (nestedObjectWasChanged) contentWasChanged = true;
    }
  }

  return contentWasChanged;
};

type ExistingInsertionContent =
  | { kind: 'string'; value: string }
  | { kind: 'translation'; map: Record<string, string> };

const readExistingInsertion = (
  contentObject: ObjectLiteralExpression,
  propName: string
): ExistingInsertionContent | undefined => {
  const prop = contentObject.getProperty(propName);

  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;

  const init = prop.getInitializer();

  if (!init || !Node.isCallExpression(init)) return undefined;

  const exp = init.getExpression();

  if (!Node.isIdentifier(exp) || exp.getText() !== 'insert') return undefined;

  const argument = init.getArguments()[0];

  if (!argument) return undefined;

  if (Node.isStringLiteral(argument)) {
    return { kind: 'string', value: argument.getLiteralValue() };
  }

  if (Node.isCallExpression(argument)) {
    const argumentExpression = argument.getExpression();

    if (
      Node.isIdentifier(argumentExpression) &&
      argumentExpression.getText() === 't'
    ) {
      const translationArgument = argument.getArguments()[0];

      if (
        translationArgument &&
        Node.isObjectLiteralExpression(translationArgument)
      ) {
        const map: Record<string, string> = {};

        for (const propertyAssignment of translationArgument.getProperties()) {
          if (!Node.isPropertyAssignment(propertyAssignment)) continue;

          const nameNode = propertyAssignment.getNameNode();
          const rawName = nameNode.getText();
          const name = rawName.replace(/^['"]|['"]$/g, '');
          const valueInitializer = propertyAssignment.getInitializer();

          if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
            map[name] = valueInitializer.getLiteralValue();
          }
        }

        return { kind: 'translation', map };
      }
    }
  }

  return;
};

type ExistingMarkdownContent =
  | { kind: 'string'; value: string }
  | { kind: 'file'; path: string };

const readExistingMarkdown = (
  contentObject: ObjectLiteralExpression,
  propName: string
): ExistingMarkdownContent | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();

  if (!initializer) return undefined;

  // Pattern 1: md("...") or md(file("...")) or md(t({...}))

  if (Node.isCallExpression(initializer)) {
    const expression = initializer.getExpression();

    if (!Node.isIdentifier(expression)) return undefined;

    if (expression.getText() === 'md') {
      const argument = initializer.getArguments()[0];

      if (!argument) return undefined;

      if (Node.isStringLiteral(argument)) {
        return { kind: 'string', value: argument.getLiteralValue() };
      }

      if (Node.isCallExpression(argument)) {
        const argumentExpression = argument.getExpression();

        if (
          Node.isIdentifier(argumentExpression) &&
          argumentExpression.getText() === 'file'
        ) {
          const fileArgument = argument.getArguments()[0];

          if (fileArgument && Node.isStringLiteral(fileArgument)) {
            return { kind: 'file', path: fileArgument.getLiteralValue() };
          }
        }
      }
    }
  }

  return;
};

const readExistingFilePath = (
  contentObject: ObjectLiteralExpression,
  propName: string
): string | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();

  if (!initializer || !Node.isCallExpression(initializer)) return undefined;

  const expression = initializer.getExpression();

  if (!Node.isIdentifier(expression) || expression.getText() !== 'file')
    return undefined;

  const argument = initializer.getArguments()[0];

  if (argument && Node.isStringLiteral(argument))
    return argument.getLiteralValue();

  return;
};

// Read an existing translation map stored either as md(t({...})) or t({ en: md("..."), fr: md("...") })
const readExistingMarkdownTranslationMap = (
  contentObject: ObjectLiteralExpression,
  propName: string
): Record<string, string> | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();

  if (!initializer) return undefined;

  // Case A: md(t({...}))

  if (Node.isCallExpression(initializer)) {
    const exp = initializer.getExpression();

    if (Node.isIdentifier(exp) && exp.getText() === 'md') {
      const arg = initializer.getArguments()[0];

      if (arg && Node.isCallExpression(arg)) {
        const tExp = arg.getExpression();

        if (Node.isIdentifier(tExp) && tExp.getText() === 't') {
          const tArg = arg.getArguments()[0];

          if (tArg && Node.isObjectLiteralExpression(tArg)) {
            const map: Record<string, string> = {};

            for (const prop of tArg.getProperties()) {
              if (!Node.isPropertyAssignment(prop)) continue;
              const nameNode = prop.getNameNode();
              const rawName = nameNode.getText();
              const name = rawName.replace(/^['"]|['"]$/g, '');
              const valueInit = prop.getInitializer();

              if (valueInit && Node.isStringLiteral(valueInit)) {
                map[name] = valueInit.getLiteralValue();
              } else {
                return undefined;
              }
            }
            return map;
          }
        }
      }
    }
  }

  // Case B: t({ en: md("..."), fr: md("...") })

  if (Node.isCallExpression(initializer)) {
    const exp = initializer.getExpression();

    if (Node.isIdentifier(exp) && exp.getText() === 't') {
      const tArg = initializer.getArguments()[0];

      if (tArg && Node.isObjectLiteralExpression(tArg)) {
        const map: Record<string, string> = {};

        for (const prop of tArg.getProperties()) {
          if (!Node.isPropertyAssignment(prop)) continue;
          const nameNode = prop.getNameNode();
          const rawName = nameNode.getText();
          const name = rawName.replace(/^['"]|['"]$/g, '');
          const valueInit = prop.getInitializer();

          if (
            valueInit &&
            Node.isCallExpression(valueInit) &&
            Node.isIdentifier(valueInit.getExpression()) &&
            valueInit.getExpression().getText() === 'md'
          ) {
            const mdArg = valueInit.getArguments()[0];

            if (mdArg && Node.isStringLiteral(mdArg)) {
              map[name] = mdArg.getLiteralValue();
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        }
        return map;
      }
    }
  }

  return;
};

const readExistingNest = (
  contentObject: ObjectLiteralExpression,
  propName: string
): { dictionaryKey: string; path?: string } | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  let initializer = property.getInitializer();

  if (!initializer) return undefined;

  // Unwrap type assertions and parentheses
  // Keep drilling until we reach a CallExpression or cannot unwrap further
  let safetyCounter = 0;
  while (safetyCounter++ < 5) {
    if (Node.isCallExpression(initializer)) break;
    // AsExpression, TypeAssertion, ParenthesizedExpression expose getExpression
    const anyInitializer = initializer as unknown as {
      getExpression?: () => unknown;
    };
    const nextExpression = anyInitializer.getExpression?.();

    if (
      nextExpression &&
      typeof nextExpression === 'object' &&
      nextExpression !== initializer
    ) {
      initializer = nextExpression as any;
      continue;
    }
    break;
  }

  if (!Node.isCallExpression(initializer)) return undefined;

  const expression = initializer.getExpression();

  if (!Node.isIdentifier(expression) || expression.getText() !== 'nest')
    return undefined;

  const [firstArgument, secondArgument] = initializer.getArguments();

  if (!firstArgument || !Node.isStringLiteral(firstArgument)) return undefined;

  const dictionaryKey = firstArgument.getLiteralValue();
  let path: string | undefined;

  if (secondArgument && Node.isStringLiteral(secondArgument))
    path = secondArgument.getLiteralValue();

  return { dictionaryKey, path };
};

// Safely unwrap common wrapper nodes (satisfies/as/parenthesized) to reach the underlying ObjectLiteralExpression
const unwrapToObjectLiteral = (
  node: unknown
): ObjectLiteralExpression | undefined => {
  if (!node || typeof node !== 'object') return undefined;

  let current = node as any;
  let safetyCounter = 0;
  while (safetyCounter++ < 8) {
    if (Node.isObjectLiteralExpression(current)) return current;

    const next = current?.getExpression?.();

    if (next && typeof next === 'object' && next !== current) {
      current = next;
      continue;
    }
    break;
  }

  return;
};

// Resolve an identifier/shorthand property name to the object literal of its variable initializer
const resolveNameToObjectLiteral = (
  sourceFile: SourceFile,
  name: string
): ObjectLiteralExpression | undefined => {
  // Try to find a variable declaration in the same file
  const varDecl = sourceFile.getVariableDeclaration(name);
  if (varDecl) {
    const init = varDecl.getInitializer();
    const obj = unwrapToObjectLiteral(init);
    if (obj) return obj;
  }

  // Fallback via symbol resolution
  const identifier = sourceFile.getDescendants().find((n) => {
    return Node.isIdentifier(n) && n.getText() === name;
  });
  const decl = identifier?.getSymbol()?.getDeclarations()?.[0];
  if (decl && Node.isVariableDeclaration(decl)) {
    const obj = unwrapToObjectLiteral(decl.getInitializer());
    if (obj) return obj;
  }
  return undefined;
};

// Resolve an arbitrary expression to an object literal if it refers to one (identifier or property access)
const resolveExpressionToObjectLiteral = (
  sourceFile: SourceFile,
  expr: import('ts-morph').Expression
): ObjectLiteralExpression | undefined => {
  if (Node.isIdentifier(expr)) {
    return resolveNameToObjectLiteral(sourceFile, expr.getText());
  }

  if (Node.isPropertyAccessExpression(expr)) {
    // Resolve the left side first (could be identifier or nested property access)
    const leftResolved = resolveExpressionToObjectLiteral(
      sourceFile,
      expr.getExpression()
    );
    if (!leftResolved) return undefined;
    const propName = expr.getName();
    const prop = leftResolved.getProperty(propName);
    if (prop && Node.isPropertyAssignment(prop)) {
      const init = prop.getInitializer();
      const obj = unwrapToObjectLiteral(init);
      if (obj) return obj;
      // Support aliasing to another identifier: const x = planDetails.free; then use x
      if (init && Node.isIdentifier(init)) {
        return resolveNameToObjectLiteral(sourceFile, init.getText());
      }
    }
  }
  return undefined;
};

// Find spread source objects for a given object literal, in declaration order
const getSpreadSourceObjects = (
  contentObject: ObjectLiteralExpression,
  sourceFile: SourceFile
): ObjectLiteralExpression[] => {
  const spreads: ObjectLiteralExpression[] = [];
  for (const prop of contentObject.getProperties()) {
    if (Node.isSpreadAssignment(prop)) {
      const expr = prop.getExpression();
      const resolved = resolveExpressionToObjectLiteral(sourceFile, expr);
      if (resolved) spreads.push(resolved);
    }
  }
  return spreads;
};

// Find the spread source object (prefer the last one) that contains a given key
const findSpreadTargetObjectForKey = (
  contentObject: ObjectLiteralExpression,
  key: string,
  sourceFile: SourceFile
): ObjectLiteralExpression | undefined => {
  const spreads = getSpreadSourceObjects(contentObject, sourceFile);
  for (let i = spreads.length - 1; i >= 0; i--) {
    const spreadObj = spreads[i];
    const prop = spreadObj.getProperty(key);
    if (prop && Node.isPropertyAssignment(prop)) {
      return spreadObj;
    }
  }
  return undefined;
};

const readExistingArraySerialized = (
  contentObject: ObjectLiteralExpression,
  propName: string
): string[] | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();

  if (!initializer || !Node.isArrayLiteralExpression(initializer))
    return undefined;

  const serialized: string[] = [];

  for (const element of initializer.getElements()) {
    if (Node.isStringLiteral(element)) {
      serialized.push(JSON.stringify(element.getLiteralValue()));
      continue;
    }

    if (Node.isNumericLiteral(element)) {
      serialized.push(element.getText());
      continue;
    }

    if (
      element.getKind() === SyntaxKind.TrueKeyword ||
      element.getKind() === SyntaxKind.FalseKeyword
    ) {
      serialized.push(element.getText());
      continue;
    }

    if (Node.isNullLiteral(element)) {
      serialized.push('null');
      continue;
    }

    if (Node.isCallExpression(element)) {
      const expression = element.getExpression();

      if (Node.isIdentifier(expression) && expression.getText() === 't') {
        const argument = element.getArguments()[0];

        if (argument && Node.isObjectLiteralExpression(argument)) {
          const map: any = {};

          for (const propertyAssignment of argument.getProperties()) {
            if (!Node.isPropertyAssignment(propertyAssignment))
              return undefined;

            const nameNode = propertyAssignment.getNameNode();
            const rawName = nameNode.getText();
            const name = rawName.replace(/^['"]|['"]$/g, '');
            const valueInitializer = propertyAssignment.getInitializer();

            if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
              map[name] = valueInitializer.getLiteralValue();
            } else {
              return undefined;
            }
          }
          serialized.push(buildTranslationInitializer(map));
          continue;
        }
      }
    }

    return undefined;
  }

  return serialized;
};

const serializeValue = (value: ContentNode): string | undefined => {
  const nodeType = getNodeType(value);

  if (nodeType === NodeType.Text) return JSON.stringify(value);

  if (nodeType === NodeType.Number || nodeType === NodeType.Boolean)
    return String(value);

  if (nodeType === NodeType.Null) return 'null';

  if (nodeType === NodeType.Translation) {
    const translations: TranslationContent[NodeType.Translation] =
      (value as TranslationContent)[NodeType.Translation] ?? {};
    const allStrings = Object.values(translations).every(
      (v) => typeof v === 'string'
    );

    if (!allStrings) return undefined;

    return buildTranslationInitializer(translations);
  }

  if (nodeType === NodeType.Enumeration) {
    const map: EnumerationContent[NodeType.Enumeration] = (
      value as EnumerationContent
    )[NodeType.Enumeration];

    const initializer = buildEnumerationInitializer(map);

    return initializer;
  }

  if (nodeType === NodeType.Condition) {
    const map: ConditionContent[NodeType.Condition] = (
      value as ConditionContent
    )[NodeType.Condition];

    const initializer = buildConditionInitializer(map);

    return initializer;
  }

  if (nodeType === NodeType.Gender) {
    const map: GenderContent[NodeType.Gender] = (value as GenderContent)[
      NodeType.Gender
    ];

    const initializer = buildGenderInitializer(map);

    return initializer;
  }

  if (nodeType === NodeType.Insertion) {
    const content: InsertionContent[NodeType.Insertion] = (
      value as InsertionContent
    )[NodeType.Insertion];

    return buildInsertionInitializer(content);
  }

  if (nodeType === NodeType.Markdown) {
    const content: MarkdownContent[NodeType.Markdown] = (
      value as MarkdownContent
    )[NodeType.Markdown];

    return buildMarkdownInitializer(content);
  }

  if (nodeType === NodeType.File) {
    const path: FileContent[NodeType.File] = (value as FileContent)[
      NodeType.File
    ];

    return buildFileInitializer(path);
  }

  if (nodeType === NodeType.Nested) {
    const content: NestedContent[NodeType.Nested] = (value as NestedContent)[
      NodeType.Nested
    ];

    return buildNestedInitializer(content);
  }

  return;
};

/**
 * Gets the existing imports from @intlayer/core in the source file
 */
const getExistingIntlayerImports = (sourceFile: SourceFile): Set<string> => {
  const imported = new Set<string>();

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (moduleSpecifier === 'intlayer') {
      const namedImports = importDecl.getNamedImports();

      for (const namedImport of namedImports) {
        imported.add(namedImport.getName());
      }
    }

    if (moduleSpecifier === 'intlayer/file') {
      const namedImports = importDecl.getNamedImports();

      for (const namedImport of namedImports) {
        const alias = namedImport.getAliasNode();
        imported.add(alias ? alias.getText() : namedImport.getName());
      }
    }
  }

  return imported;
};

/**
 * Adds missing imports to the source file
 */
const addMissingImports = (
  sourceFile: SourceFile,
  requiredImports: Set<string>
): boolean => {
  if (requiredImports.size === 0) return false;

  const existingImports = getExistingIntlayerImports(sourceFile);
  const missingImports = [...requiredImports].filter(
    (imp) => !existingImports.has(imp)
  );

  if (missingImports.length === 0) return false;

  // Separate 'file' from other imports
  const hasMissingFile = missingImports.includes('file');
  const otherMissingImports = missingImports.filter((imp) => imp !== 'file');

  // Find or create @intlayer/core import

  if (otherMissingImports.length > 0) {
    const coreImport = sourceFile
      .getImportDeclarations()
      .find((imp) => imp.getModuleSpecifierValue() === 'intlayer');

    if (coreImport) {
      // Add to existing import
      const existingNamedImports = coreImport
        .getNamedImports()
        .map((ni) => ni.getName());
      const allImports = [
        ...new Set([...existingNamedImports, ...otherMissingImports]),
      ].sort();

      coreImport.removeNamedImports();
      coreImport.addNamedImports(allImports.map((name) => ({ name })));
    } else {
      // Create new import at the top
      sourceFile.insertImportDeclaration(0, {
        moduleSpecifier: 'intlayer',
        namedImports: otherMissingImports.sort().map((name) => ({ name })),
      });
    }
  }

  // Handle file import separately with alias

  if (hasMissingFile) {
    const fileImport = sourceFile
      .getImportDeclarations()
      .find((imp) => imp.getModuleSpecifierValue() === 'intlayer/file');

    if (!fileImport) {
      // Find the position to insert (after @intlayer/core import if it exists)
      const coreImportIndex = sourceFile
        .getImportDeclarations()
        .findIndex((imp) => imp.getModuleSpecifierValue() === 'intlayer');

      const insertIndex = coreImportIndex >= 0 ? coreImportIndex + 1 : 0;

      sourceFile.insertImportDeclaration(insertIndex, {
        moduleSpecifier: 'intlayer/file',
        namedImports: [{ name: 'file' }],
      });
    }
  }

  return true;
};

/**
 * Detect whether the current source file is written in CommonJS style.
 * Prefers ESM when import/export syntax is present; otherwise detects CJS via require/module.exports.
 */
const isCommonJS = (sourceFile: SourceFile): boolean => {
  // Prefer ESM if any ESM import/export is present
  if (sourceFile.getImportDeclarations().length > 0) return false;
  if (sourceFile.getExportDeclarations().length > 0) return false;
  if (sourceFile.getExportAssignments().length > 0) return false;

  // Detect classic CJS markers
  for (const statement of sourceFile.getStatements()) {
    if (!Node.isExpressionStatement(statement)) continue;
    const expression = statement.getExpression();

    if (!Node.isBinaryExpression(expression)) continue;
    const leftSide = expression.getLeft();

    if (!Node.isPropertyAccessExpression(leftSide)) continue;
    const leftExpression = leftSide.getExpression();
    const leftName = leftSide.getName();
    const isModuleExports =
      Node.isIdentifier(leftExpression) &&
      leftExpression.getText() === 'module' &&
      leftName === 'exports';
    const isExportsDefault =
      Node.isIdentifier(leftExpression) &&
      leftExpression.getText() === 'exports';

    if (isModuleExports || isExportsDefault) return true;
  }

  const hasRequire = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .some((call) => {
      const exp = call.getExpression();
      return Node.isIdentifier(exp) && exp.getText() === 'require';
    });

  return hasRequire;
};

/**
 * Adds missing CommonJS requires for intlayer helpers.
 * - Core helpers (t, md, insert, enu, cond, gender, nest) come from require('intlayer') via destructuring
 * - file helper comes from require('intlayer/file') via destructuring
 * Existing destructured requires are respected to avoid duplicates.
 */
const addMissingRequires = (
  sourceFile: SourceFile,
  requiredImports: Set<string>
): boolean => {
  if (requiredImports.size === 0) return false;

  const existingCoreNames = new Set<string>();
  let hasFileHelper = false;

  for (const varDecl of sourceFile.getVariableDeclarations()) {
    const init = varDecl.getInitializer();

    if (!init || !Node.isCallExpression(init)) continue;
    const callee = init.getExpression();

    if (!Node.isIdentifier(callee) || callee.getText() !== 'require') continue;
    const arg = init.getArguments()[0];

    if (!arg || !Node.isStringLiteral(arg)) continue;
    const spec = arg.getLiteralValue();
    const nameNode = varDecl.getNameNode();

    if (spec === 'intlayer') {
      if (Node.isObjectBindingPattern(nameNode)) {
        for (const el of nameNode.getElements()) {
          existingCoreNames.add(el.getNameNode().getText());
        }
      }
    }

    if (spec === 'intlayer/file') {
      if (Node.isObjectBindingPattern(nameNode)) {
        for (const el of nameNode.getElements()) {
          if (el.getNameNode().getText() === 'file') hasFileHelper = true;
        }
      } else if (Node.isIdentifier(nameNode) && nameNode.getText() === 'file') {
        hasFileHelper = true;
      }
    }
  }

  const requiredList = Array.from(requiredImports);
  const missingCore = requiredList
    .filter((n) => n !== 'file')
    .filter((n) => !existingCoreNames.has(n));
  const needsFile = requiredImports.has('file') && !hasFileHelper;

  if (missingCore.length === 0 && !needsFile) return false;

  // Insert after directive prologue (e.g., 'use strict') if present
  let insertIndex = 0;
  const statements = sourceFile.getStatements();
  for (const st of statements) {
    if (Node.isExpressionStatement(st)) {
      const expr = st.getExpression();

      if (Node.isStringLiteral(expr)) {
        insertIndex += 1;
        continue;
      }
    }
    break;
  }

  const lines: string[] = [];
  if (missingCore.length > 0) {
    const sorted = Array.from(new Set(missingCore)).sort();
    lines.push(`const { ${sorted.join(', ')} } = require('intlayer');`);
  }
  if (needsFile) {
    lines.push("const { file } = require('intlayer/file');");
  }

  if (lines.length > 0) {
    sourceFile.insertStatements(insertIndex, lines.join('\n'));
    return true;
  }

  return false;
};

/**
 * Serializes a metadata value to its string representation for code generation
 * Handles: boolean, number, string, and array of strings
 */
const serializeMetadataValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map((item) => JSON.stringify(item)).join(', ')}]`;
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }
  return JSON.stringify(value);
};

/**
 * Updates a single property in the root object if the value has changed
 */
const updateMetadataProperty = (
  rootObject: ObjectLiteralExpression,
  propertyName: string,
  value: unknown
): boolean => {
  const property = rootObject.getProperty(propertyName);
  const serializedValue = serializeMetadataValue(value);

  if (property && Node.isPropertyAssignment(property)) {
    const currentValue = property.getInitializer()?.getText();

    if (currentValue !== serializedValue) {
      property.setInitializer(serializedValue);
      return true;
    }
  } else if (!property) {
    rootObject.addPropertyAssignment({
      name: propertyName,
      initializer: serializedValue,
    });
    return true;
  }

  return false;
};

/**
 * Updates dictionary metadata properties in the root object
 * Supports: id, locale, filled, fill, title, description, tags, version, priority, live
 * and any future fields that may be added
 */
const updateDictionaryMetadata = (
  rootObject: ObjectLiteralExpression,
  dictionary: Dictionary
): boolean => {
  let changed = false;

  // List of metadata properties to update (excluding 'key' and 'content')
  const metadataProperties: (keyof Dictionary)[] = [
    'id',
    'locale',
    'filled',
    'fill',
    'title',
    'description',
    'tags',
    'version',
    'priority',
    'live',
  ];

  for (const prop of metadataProperties) {
    const value = dictionary[prop];

    if (value !== undefined) {
      if (updateMetadataProperty(rootObject, prop as string, value)) {
        changed = true;
      }
    }
  }

  return changed;
};

/**
 * Locates the root dictionary object in the source file
 */
const findRootDictionaryObject = (
  sourceFile: SourceFile
): ObjectLiteralExpression | undefined => {
  // Try to find via export assignment
  const exportAssignment = sourceFile.getExportAssignment((_) => true);

  if (exportAssignment) {
    const expression = exportAssignment.getExpression();

    if (Node.isIdentifier(expression)) {
      const declarationFromSymbol = expression
        .getSymbol()
        ?.getDeclarations()?.[0];
      const declarationByName =
        declarationFromSymbol ??
        sourceFile.getVariableDeclaration(expression.getText());

      if (declarationByName && Node.isVariableDeclaration(declarationByName)) {
        const initializerAny = declarationByName.getInitializer();
        const objectLiteral = unwrapToObjectLiteral(initializerAny);

        if (objectLiteral) return objectLiteral;
      }
    } else {
      // Support wrapped default exports like: export default ({ ... } as const)
      // or: export default ({ ... } satisfies Dictionary)
      const objectLiteral = unwrapToObjectLiteral(expression);

      if (objectLiteral) return objectLiteral;
    }
  }

  // Fallback: find a variable of type Dictionary
  const variableDeclaration = sourceFile.getVariableDeclaration((variable) => {
    try {
      const typeText = variable.getType().getText();
      return (
        typeText.includes('Dictionary') ||
        variable.getName() === 'content' ||
        variable.getName().toLowerCase().includes('dictionary')
      );
    } catch {
      return variable.getName() === 'content';
    }
  });

  if (variableDeclaration) {
    const objectLiteral = unwrapToObjectLiteral(
      variableDeclaration.getInitializer()
    );

    if (objectLiteral) return objectLiteral;
  }

  // Fallback: handle CommonJS patterns

  for (const statement of sourceFile.getStatements()) {
    if (!Node.isExpressionStatement(statement)) continue;

    const expression = statement.getExpression();

    if (!Node.isBinaryExpression(expression)) continue;

    const operator = expression.getOperatorToken();

    if (operator.getText() !== '=') continue;

    const leftSide = expression.getLeft();

    if (!Node.isPropertyAccessExpression(leftSide)) continue;

    const leftExpression = leftSide.getExpression();
    const leftName = leftSide.getName();
    const isModuleExports =
      Node.isIdentifier(leftExpression) &&
      leftExpression.getText() === 'module' &&
      leftName === 'exports';
    const isExportsDefault =
      Node.isIdentifier(leftExpression) &&
      leftExpression.getText() === 'exports' &&
      leftName === 'default';

    if (!isModuleExports && !isExportsDefault) continue;

    const rightSide = expression.getRight();

    if (Node.isObjectLiteralExpression(rightSide)) {
      return rightSide;
    }

    if (Node.isIdentifier(rightSide)) {
      const declaration = rightSide.getSymbol()?.getDeclarations()?.[0];

      if (declaration && Node.isVariableDeclaration(declaration)) {
        const objectLiteral = unwrapToObjectLiteral(
          declaration.getInitializer()
        );

        if (objectLiteral) return objectLiteral;
      }
    }
  }

  return;
};

/**
 * Updates a JavaScript/TypeScript file based on the provided dictionary.
 * It targets a specific dictionary object within the file and updates its
 * metadata (title, description, tags) and content entries.
 *
 * This function now supports inserting translation keys into nested objects
 * within arrays. For example, if you have:
 * ```
 * content: [
 *   { question: t({ en: '...', fr: '...' }) }
 * ]
 * ```
 *
 * You can add a new locale (e.g., 'pl') by providing a dictionary with:
 * ```
 * {
 *   content: [
 *     { question: { [NodeType.Translation]: { en: '...', fr: '...', pl: '...' } } }
 *   ]
 * }
 * ```
 *
 * The function will:
 * 1. Detect the existing array structure
 * 2. Navigate into each array element (if it's an object)
 * 3. Recursively process nested properties
 * 4. Update translation maps while preserving existing locales
 */
export const transformJSFile = async (
  fileContent: string,
  dictionary: Dictionary,
  fallbackLocale?: Locale
): Promise<string> => {
  try {
    // If no dictionary provided, nothing to transform

    if (!dictionary || typeof dictionary !== 'object') {
      return fileContent;
    }

    const project = new Project({
      useInMemoryFileSystem: true,
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: true,
      compilerOptions: {
        allowJs: true,
        jsx: ts.JsxEmit.Preserve,
      },
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        quoteKind: QuoteKind.Double, // More safe for JSON.stringify compatibility
        newLineKind: NewLineKind.LineFeed,
      },
    });

    const sourceFile = project.createSourceFile('file.tsx', fileContent, {
      overwrite: true,
    });

    // Locate the root dictionary object
    const rootObject = findRootDictionaryObject(sourceFile);

    if (!rootObject) return fileContent;

    let changed = false;
    const requiredImports = new Set<string>();

    // Update dictionary metadata (title, description, tags)
    const metadataChanged = updateDictionaryMetadata(rootObject, dictionary);

    if (metadataChanged) changed = true;

    // Update content if provided

    if (dictionary.content) {
      const contentProperty = rootObject.getProperty('content');
      let contentObject: ObjectLiteralExpression | undefined;
      let isContentArrayInSource = false;

      if (contentProperty && Node.isPropertyAssignment(contentProperty)) {
        contentObject = contentProperty.getInitializerIfKind(
          SyntaxKind.ObjectLiteralExpression
        );
        // Detect if the source file defines content as an array
        isContentArrayInSource = !!contentProperty.getInitializerIfKind(
          SyntaxKind.ArrayLiteralExpression
        );
      }

      const effectiveFallbackLocale: string =
        (fallbackLocale as unknown as string) ?? 'en';

      if (contentObject && !Array.isArray(dictionary.content)) {
        // Existing behavior when content is an object
        const dictContent: Record<string, unknown> =
          (dictionary.content as unknown as Record<string, unknown>) ?? {};

        const contentChanged = processContentEntries(
          contentObject,
          dictContent,
          effectiveFallbackLocale,
          requiredImports,
          sourceFile
        );

        if (contentChanged) changed = true;
      } else if (Array.isArray(dictionary.content) && isContentArrayInSource) {
        // New behavior: content is an array in both the dictionary and the source file
        const dictArrayContent: unknown[] =
          (dictionary.content as unknown[]) ?? [];

        const contentChanged = processArrayContent(
          rootObject,
          'content',
          dictArrayContent,
          getExistingPropertyNames(rootObject),
          effectiveFallbackLocale,
          requiredImports,
          sourceFile
        );

        if (contentChanged) changed = true;
      }
    }

    if (!changed) return fileContent;

    // Add any missing imports/requires before returning the transformed content
    const useCJS = isCommonJS(sourceFile);
    const importsAdded = useCJS
      ? addMissingRequires(sourceFile, requiredImports)
      : addMissingImports(sourceFile, requiredImports);

    if (importsAdded || changed) {
      return sourceFile.getFullText();
    }

    return fileContent;
  } catch {
    // Fail-safe: return original content on any unexpected parsing issue
    return fileContent;
  }
};
