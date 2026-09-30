/**
 * Resolves a command-line value against its allowed choices, ignoring case.
 *
 * @param value - Raw value passed on the command line.
 * @param choices - Accepted values, in their canonical spelling.
 * @param optionName - Option name used in the error message (e.g. `--platform`).
 * @returns The matching choice, in its canonical spelling.
 * @throws When the value matches none of the choices.
 */
export const parseChoice = <Choice extends string>(
  value: string,
  choices: readonly Choice[],
  optionName: string
): Choice => {
  const normalizedValue = value.trim().toLowerCase();
  const choice = choices.find(
    (candidate) => candidate.toLowerCase() === normalizedValue
  );

  if (!choice) {
    throw new Error(
      `Invalid ${optionName} value "${value}". Expected one of: ${choices.join(', ')}.`
    );
  }

  return choice;
};
