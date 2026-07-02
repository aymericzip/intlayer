// Pure AST utilities re-exported as a stable sub-path so consumers (e.g. the
// VS Code extension host) can import individual helpers without importing the
// LSP server entry point (which starts a connection and calls listen()).

export {
  ALL_CALLERS,
  BASE_CALLERS,
  CALLERS_BY_NAME,
  type CallerDescriptor,
  type CallerResultShape,
  type CallerValueSource,
  COMPAT_CALLERS,
  getPositionalKeyCallerNames,
  isCallerActive,
} from './callers';
export {
  buildCallerWithKeyPattern,
  buildKeyUsagePatterns,
  getCallerNamesAlternation,
} from './callers/patterns';
export {
  escapeRegularExpression,
  findFieldRangesInFile,
  offsetToRange,
} from './findFieldInFile';
export { findKeyAtOffset } from './findKeyAtOffset';
export {
  findContentFieldAtOffset,
  findKeyInContentFile,
} from './findKeyInContentFile';
export { findTCallAtOffset } from './findTCallAtOffset';
export { findUsageFieldAtOffset } from './findUsageFieldAtOffset';
export {
  buildParentMap,
  getFirstStringArg,
  getObjectPropertyNode,
  getObjectPropertyString,
  getPropertyKeyName,
  getStaticStringValue,
  getStringArgAt,
  isStringLiteralNode,
  nodeContainsOffset,
  nodeEnd,
  nodeStart,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';
export {
  type CallerVariableBinding,
  collectCallerBindings,
  collectMessageUsages,
  collectNamespaceReferences,
  findMessageUsageAtOffset,
  type MessageUsage,
  type MessageUsageKind,
  matchCallNamespace,
  type NamespaceReference,
} from './usageAnalyzer';
