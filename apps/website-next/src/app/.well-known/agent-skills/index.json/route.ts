import {
  Website_Domain,
  WellKnown_AgentSkills_Path,
} from '@intlayer/design-system/routes';
import { agentSkills } from '@utils/agentSkills';

/** Schema the discovery index validates against (Agent Skills Discovery v0.2.0). */
const AGENT_SKILLS_SCHEMA =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

type AgentSkillEntry = {
  readonly name: string;
  /** `skill-md` marks a single SKILL.md document, as opposed to an `archive`. */
  readonly type: 'skill-md';
  readonly description: string;
  readonly url: string;
  /** SHA-256 of the referenced document, formatted `sha256:{hex}`. */
  readonly digest: string;
};

type AgentSkillsIndex = {
  readonly $schema: string;
  readonly skills: readonly AgentSkillEntry[];
};

/**
 * Serves the agent skills discovery index, letting agents enumerate and verify
 * every Intlayer skill without cloning the repository.
 *
 * @returns `application/json` discovery index.
 */
export const GET = (): Response => {
  const index: AgentSkillsIndex = {
    $schema: AGENT_SKILLS_SCHEMA,
    skills: agentSkills.map(({ name, description, digest }) => ({
      name,
      type: 'skill-md',
      description,
      url: `https://${Website_Domain}${WellKnown_AgentSkills_Path}/${name}/SKILL.md`,
      digest,
    })),
  };

  return new Response(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
