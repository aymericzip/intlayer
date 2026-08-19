import { agentSkills, getAgentSkillByName } from '@utils/agentSkills';

type RouteContext = {
  params: Promise<{ skill: string }>;
};

/**
 * Pre-renders one route per published skill, so the documents are served from
 * the cache rather than rebuilt per request.
 *
 * @returns The `skill` segment for every published skill.
 */
export const generateStaticParams = (): { skill: string }[] =>
  agentSkills.map(({ name }) => ({ skill: name }));

/**
 * Serves a single SKILL.md document referenced by the discovery index.
 *
 * The body is byte-identical to the file the index hashed, so an agent that
 * verifies the advertised `sha256:` digest against this response succeeds.
 *
 * @returns `text/markdown` SKILL.md, or 404 when the skill is not published.
 */
export const GET = async (
  _request: Request,
  context: RouteContext
): Promise<Response> => {
  const { skill: skillName } = await context.params;
  const skill = getAgentSkillByName(skillName);

  if (!skill) {
    return new Response(`Unknown skill: ${skillName}\n`, {
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
};
