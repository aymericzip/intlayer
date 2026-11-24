/** Value of the picker entry that leaves the current setup step. */
export const SKIP_VALUE = '__skip__';

/** Type of {@link SKIP_VALUE}, to widen the value type of a picker. */
export type SkipValue = typeof SKIP_VALUE;

/** Suffix of free-text prompts: Esc cancels a prompt, which skips the step. */
export const SKIP_KEY_HINT = 'Esc to skip';

/** Picker entry offered by a skippable setup step. */
export type SkipOption = {
  value: SkipValue;
  label: string;
  hint: string;
};

/**
 * Builds the "Skip for now" picker entry of a setup step.
 *
 * @param command - Command that runs the step later.
 */
export const getSkipOption = (command: string): SkipOption => ({
  value: SKIP_VALUE,
  label: 'Skip for now',
  hint: `run \`${command}\` later`,
});

/**
 * Line printed when a setup step is skipped.
 *
 * @param stepLabel - Name of the step, e.g. `AI translation`.
 * @param command - Command that runs the step later.
 */
export const getSkippedMessage = (stepLabel: string, command: string): string =>
  `${stepLabel} skipped. Run \`${command}\` to set it up later.`;

/**
 * Whether a prompt answer leaves the step: the skip entry, or the cancel
 * symbol returned on Esc / Ctrl+C.
 */
export const isSkipAnswer = <Answer>(
  answer: Answer | SkipValue | symbol
): answer is SkipValue | symbol =>
  answer === SKIP_VALUE || typeof answer === 'symbol';
