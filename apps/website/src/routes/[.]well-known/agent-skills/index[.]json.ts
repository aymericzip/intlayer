import {
  Website_Domain,
  WellKnown_AgentSkills_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { agentSkills } from '~/utils/agentSkills';

/** Schema the discovery index validates against (Agent Skills Discovery v0.2.0). */
const AGENT_SKILLS_SCHEMA =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

export const Route = createFileRoute('/.well-known/agent-skills/index.json')({
  server: {
    handlers: {
      GET: () => {
        const index = {
          $schema: AGENT_SKILLS_SCHEMA,
          skills: agentSkills.map(({ name, description, digest }) => ({
            name,
            // `skill-md` marks a single SKILL.md document, not an archive.
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
      },
    },
  },
});
