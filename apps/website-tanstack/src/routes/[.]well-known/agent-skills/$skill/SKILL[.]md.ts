import { createFileRoute } from '@tanstack/react-router';
import { getAgentSkillByName } from '~/utils/agentSkills';

export const Route = createFileRoute(
  '/.well-known/agent-skills/$skill/SKILL.md'
)({
  server: {
    handlers: {
      /**
       * Serves a single SKILL.md document referenced by the discovery index.
       *
       * The body is byte-identical to the file the index hashed, so an agent
       * that verifies the advertised `sha256:` digest against this response
       * succeeds.
       */
      GET: ({ params }) => {
        const skill = getAgentSkillByName(params.skill);

        if (!skill) {
          return new Response(`Unknown skill: ${params.skill}\n`, {
            status: 404,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        }

        return new Response(skill.content, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff',
            ETag: `"${skill.digest.replace('sha256:', '')}"`,
          },
        });
      },
    },
  },
});
