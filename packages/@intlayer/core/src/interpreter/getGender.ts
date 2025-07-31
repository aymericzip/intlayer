import type { Gender, GenderContentStates } from '../transpiler/gender/gender';

type GederEntry = Gender | 'm' | 'f';

const getGenderEntry = (gender: GederEntry): Gender => {
  if (gender === 'm' || gender === 'male') return 'male';
  if (gender === 'f' || gender === 'female') return 'female';
  return 'fallback';
};

/**
 * Allow to pick a content based on a gender.
 *
 * Usage:
 *
 * ```ts
 * const content = getGender({
 *  'true': 'The gender is validated',
 *  'false': 'The gender is not validated',
 * }, true);
 * // 'The gender is validated'
 * ```
 *
 * The last key provided will be used as the fallback value.
 *
 * ```ts
 * const content = getGender({
 *  'false': 'The gender is not validated',
 *  'true': 'The gender is validated',
 * }, undefined);
 * // 'The gender is validated'
 */
export const getGender = <Content>(
  genderContent: GenderContentStates<Content>,
  gender: GederEntry
): Content => {
  const stateList = Object.keys(genderContent);

  const fallbackState = stateList[
    stateList.length - 1
  ] as keyof typeof genderContent;

  const genderEntry = getGenderEntry(gender);

  // Default or error handling if no keys match
  return (
    genderContent[genderEntry as keyof typeof genderContent] ??
    genderContent['fallback'] ??
    (genderContent[fallbackState] as Content)
  );
};
