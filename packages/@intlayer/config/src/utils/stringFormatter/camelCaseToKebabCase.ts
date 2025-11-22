/**
 * Convert a string to kebab-case
 * e.g. "MyNewComponent" => "my-new-component"
 */
export const camelCaseToKebabCase = (str: string): string => {
  // Split on transition from lower->upper: "MyNewComponent" => ["My", "New", "Component"]
  // Then lowercase each chunk and join by "-"
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
};
