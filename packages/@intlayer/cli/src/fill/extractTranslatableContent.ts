export type ExtractedContentProps = {
  index: number;
  path: (string | number)[];
  value: string;
  replacement?: Record<string, string>;
};

export type ExtractedContentResult = {
  extractedContent: ExtractedContentProps[];
  translatableDictionary: Record<number, string>;
};

export const extractTranslatableContent = (
  content: any,
  currentPath: (string | number)[] = [],
  state = {
    currentIndex: 1,
    extractedContent: [] as ExtractedContentProps[],
    translatableDictionary: {} as Record<number, string>,
  }
): ExtractedContentResult => {
  if (typeof content === 'string') {
    const regex = /[{]+.*?[}]+/g;
    const replacement: Record<string, string> = {};
    let varIndex = 1;

    const modifiedContent = content.replace(regex, (matchStr) => {
      const placeholder = `<${varIndex}>`;
      replacement[placeholder] = matchStr;
      varIndex++;
      return placeholder;
    });

    // Only extract strings that contain at least one letter or number outside of placeholders.
    // This avoids extracting strings that are only spaces, special characters, or just variables.
    const contentWithoutPlaceholders = modifiedContent.replace(/<\\d+>/g, '');
    if (/[\\p{L}\\p{N}]/u.test(contentWithoutPlaceholders)) {
      state.extractedContent.push({
        index: state.currentIndex,
        path: currentPath,
        value: modifiedContent,
        replacement:
          Object.keys(replacement).length > 0 ? replacement : undefined,
      });
      state.translatableDictionary[state.currentIndex] = modifiedContent;
      state.currentIndex++;
    }
  } else if (Array.isArray(content)) {
    content.forEach((item, index) => {
      extractTranslatableContent(item, [...currentPath, index], state);
    });
  } else if (typeof content === 'object' && content !== null) {
    for (const key in content) {
      if (Object.hasOwn(content, key)) {
        extractTranslatableContent(content[key], [...currentPath, key], state);
      }
    }
  }

  return {
    extractedContent: state.extractedContent,
    translatableDictionary: state.translatableDictionary,
  };
};

export const reinsertTranslatedContent = (
  baseContent: any,
  extractedContentProps: ExtractedContentProps[],
  translatedDictionary: Record<number, string>
): any => {
  const result = structuredClone(baseContent);

  for (const { index, path, replacement } of extractedContentProps) {
    let translatedValue = translatedDictionary[index];

    if (translatedValue !== undefined) {
      if (replacement) {
        for (const [placeholder, originalVar] of Object.entries(replacement)) {
          translatedValue = translatedValue.replace(placeholder, originalVar);
        }
      }

      let current = result;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = translatedValue;
    }
  }

  return result;
};
