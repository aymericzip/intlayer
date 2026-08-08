import { createHash } from 'node:crypto';
import intlayerAngularSkill from '../../../../.agents/skills/intlayer-angular/SKILL.md';
import intlayerAstroSkill from '../../../../.agents/skills/intlayer-astro/SKILL.md';
import intlayerCliSkill from '../../../../.agents/skills/intlayer-cli/SKILL.md';
import intlayerCompilerSkill from '../../../../.agents/skills/intlayer-compiler/SKILL.md';
import intlayerConfigSkill from '../../../../.agents/skills/intlayer-config/SKILL.md';
import intlayerContentSkill from '../../../../.agents/skills/intlayer-content/SKILL.md';
import intlayerNextJsSkill from '../../../../.agents/skills/intlayer-next-js/SKILL.md';
import intlayerPreactSkill from '../../../../.agents/skills/intlayer-preact/SKILL.md';
import intlayerReactSkill from '../../../../.agents/skills/intlayer-react/SKILL.md';
import intlayerRemoteContentSkill from '../../../../.agents/skills/intlayer-remote-content/SKILL.md';
import intlayerSolidSkill from '../../../../.agents/skills/intlayer-solid/SKILL.md';
import intlayerSvelteSkill from '../../../../.agents/skills/intlayer-svelte/SKILL.md';
import intlayerUsageSkill from '../../../../.agents/skills/intlayer-usage/SKILL.md';
import intlayerVueSkill from '../../../../.agents/skills/intlayer-vue/SKILL.md';

/**
 * A single agent skill published under `/.well-known/agent-skills/`, as
 * described by the Agent Skills Discovery RFC v0.2.0.
 *
 * @see https://github.com/cloudflare/agent-skills-discovery-rfc
 */
export type AgentSkill = {
  /** Canonical skill identifier, taken from the SKILL.md `name` front matter. */
  readonly name: string;
  /** Short capability summary, taken from the SKILL.md `description` front matter. */
  readonly description: string;
  /** Raw SKILL.md document served verbatim to agents. */
  readonly content: string;
  /** SHA-256 of {@link content}, formatted as `sha256:{hex}` per the RFC. */
  readonly digest: string;
};

/**
 * Every SKILL.md shipped from the repository's `.agents/skills` directory.
 *
 * Inlined at build time rather than read from disk so the documents survive the
 * `output: 'standalone'` build, which does not trace `.agents/`.
 */
const SKILL_DOCUMENTS: readonly string[] = [
  intlayerAngularSkill,
  intlayerAstroSkill,
  intlayerCliSkill,
  intlayerCompilerSkill,
  intlayerConfigSkill,
  intlayerContentSkill,
  intlayerNextJsSkill,
  intlayerPreactSkill,
  intlayerReactSkill,
  intlayerRemoteContentSkill,
  intlayerSolidSkill,
  intlayerSvelteSkill,
  intlayerUsageSkill,
  intlayerVueSkill,
];

const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Reads a top-level scalar field from a SKILL.md YAML front matter block.
 *
 * Only column-zero keys match, so nested entries such as the `metadata.author`
 * field cannot shadow the top-level `name` and `description` fields.
 *
 * @param document - Full SKILL.md source.
 * @param field - Front matter key to read.
 * @returns The trimmed, unquoted value, or `undefined` when absent.
 */
const readFrontMatterField = (
  document: string,
  field: string
): string | undefined => {
  const frontMatter = document.match(FRONT_MATTER_PATTERN)?.[1];

  if (!frontMatter) return undefined;

  const value = frontMatter.match(
    new RegExp(String.raw`^${field}:[ \t]*(.+)$`, 'm')
  )?.[1];

  return value?.trim().replace(/^(["'])([\s\S]*)\1$/, '$2');
};

/**
 * Computes the RFC-formatted SHA-256 digest of a skill document.
 *
 * @param document - Full SKILL.md source.
 * @returns Digest as `sha256:{lowercase hex}`.
 */
const getSkillDigest = (document: string): string =>
  `sha256:${createHash('sha256').update(document, 'utf8').digest('hex')}`;

/**
 * All publishable agent skills, keyed by their front matter `name`.
 *
 * Computed once at module load: the documents are build-time constants, so the
 * digests never change for the lifetime of a deployment.
 */
export const agentSkills: readonly AgentSkill[] = SKILL_DOCUMENTS.flatMap(
  (document) => {
    const name = readFrontMatterField(document, 'name');
    const description = readFrontMatterField(document, 'description');

    // A skill without an identity or a summary cannot be advertised, and a
    // malformed digest is worse than an absent entry.
    if (!name || !description) return [];

    return [
      {
        name,
        description,
        content: document,
        digest: getSkillDigest(document),
      },
    ];
  }
);

/**
 * Looks up a published skill by its canonical name.
 *
 * @param name - Skill identifier as advertised in the discovery index.
 * @returns The matching skill, or `undefined` when it is not published.
 */
export const getAgentSkillByName = (name: string): AgentSkill | undefined =>
  agentSkills.find((skill) => skill.name === name);
