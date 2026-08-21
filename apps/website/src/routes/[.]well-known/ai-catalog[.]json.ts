import {
  AuthMd_Path,
  LlmsTxt_Path,
  Website_Doc_Root,
  Website_Domain,
  WellKnown_AgentSkills_Path,
  WellKnown_ApiCatalog_Path,
  WellKnown_McpServerCard_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { type AgentSkill, agentSkills } from '~/utils/agentSkills';

/**
 * Version of the Agentic Resource Discovery catalog format this document
 * follows, in `Major.Minor` form.
 */
const SPEC_VERSION = '1.0';

/**
 * A single capability advertised to agents and registries.
 *
 * The specification requires exactly one of `url` and `data`; every Intlayer
 * capability is a document served over HTTPS, so the type only models `url` and
 * the rule holds by construction.
 *
 * @see https://agenticresourcediscovery.org/
 */
type CatalogEntry = {
  /** `urn:air:{publisher}:{namespace}:{name}`, stable across deployments. */
  readonly identifier: `urn:air:${typeof Website_Domain}:${string}:${string}`;
  /** Human-readable capability name. */
  readonly displayName: string;
  /** IANA media type of the artifact `url` resolves to. */
  readonly type: string;
  /** Absolute URL of the artifact. */
  readonly url: string;
  /** Short summary shown to a human reviewing a registry listing. */
  readonly description: string;
  /**
   * Natural-language utterances this capability answers. Registries embed them
   * to rank the entry semantically, so the specification asks for two to five.
   */
  readonly representativeQueries: readonly [string, string, ...string[]];
  /** Keywords a registry may filter on. */
  readonly tags?: readonly string[];
};

/** Builds an absolute website URL from a root-relative path. */
const getWebsiteUrl = (path: string): string =>
  `https://${Website_Domain}${path}`;

/**
 * Catalog metadata for each published agent skill, keyed by its SKILL.md
 * `name` front matter.
 *
 * Hand-written rather than derived: the front matter `description` is phrased
 * for a coding agent deciding whether to load the document, while these queries
 * are phrased the way a developer asks the question in the first place, which
 * is what a registry embeds.
 */
const SKILL_CATALOG_METADATA: Readonly<
  Record<
    string,
    {
      readonly displayName: string;
      readonly representativeQueries: readonly [string, string, ...string[]];
    }
  >
> = {
  'intlayer-angular': {
    displayName: 'Intlayer for Angular',
    representativeQueries: [
      'set up internationalization in an Angular application',
      'translate an Angular component with Intlayer',
      'register the Intlayer providers in an Angular app',
    ],
  },
  'intlayer-astro': {
    displayName: 'Intlayer for Astro',
    representativeQueries: [
      'add multilingual content to an Astro site',
      'read Intlayer content from an Astro component',
      'handle server-side translated content in Astro',
    ],
  },
  'intlayer-cli': {
    displayName: 'Intlayer CLI',
    representativeQueries: [
      'build my Intlayer dictionaries from the command line',
      'audit which translations are missing in my project',
      'fill and push translations with the intlayer CLI',
    ],
  },
  'intlayer-compiler': {
    displayName: 'Intlayer Compiler',
    representativeQueries: [
      'extract translations from my components automatically',
      'use Intlayer without writing content declaration files by hand',
      'configure the Intlayer compiler in my build tool',
    ],
  },
  'intlayer-config': {
    displayName: 'Intlayer Configuration',
    representativeQueries: [
      'configure which locales my application supports',
      'create an intlayer.config.ts file',
      'change where Intlayer writes its generated dictionaries',
    ],
  },
  'intlayer-content': {
    displayName: 'Intlayer Content Declaration',
    representativeQueries: [
      'write a pluralized translation with Intlayer',
      'embed markdown inside a translated content file',
      'declare conditional or nested content per locale',
    ],
  },
  'intlayer-next-js': {
    displayName: 'Intlayer for Next.js',
    representativeQueries: [
      'set up internationalization in a Next.js App Router project',
      'translate a Next.js server component',
      'add localized routing to a Next.js application',
    ],
  },
  'intlayer-preact': {
    displayName: 'Intlayer for Preact',
    representativeQueries: [
      'set up internationalization in a Preact application',
      'translate a Preact component with Intlayer',
      'use the useIntlayer hook in Preact',
    ],
  },
  'intlayer-react': {
    displayName: 'Intlayer for React',
    representativeQueries: [
      'set up internationalization in a React application',
      'translate a React component with Intlayer',
      'read translations with the useIntlayer hook',
    ],
  },
  'intlayer-remote-content': {
    displayName: 'Intlayer Remote Content and CMS',
    representativeQueries: [
      'fetch translations from the Intlayer CMS at runtime',
      'let non-developers edit content without redeploying the app',
      'load remote dictionaries on the server',
    ],
  },
  'intlayer-solid': {
    displayName: 'Intlayer for SolidJS',
    representativeQueries: [
      'set up internationalization in a SolidJS application',
      'translate a Solid component with Intlayer',
      'use the useIntlayer hook in Solid',
    ],
  },
  'intlayer-svelte': {
    displayName: 'Intlayer for Svelte and SvelteKit',
    representativeQueries: [
      'set up internationalization in a SvelteKit application',
      'translate a Svelte component with Intlayer',
      'read an Intlayer store in Svelte',
    ],
  },
  'intlayer-usage': {
    displayName: 'Intlayer Getting Started',
    representativeQueries: [
      'get started with Intlayer in an existing project',
      'where do I declare Intlayer content files',
      'how does Intlayer structure a multilingual project',
    ],
  },
  'intlayer-vue': {
    displayName: 'Intlayer for Vue and Nuxt',
    representativeQueries: [
      'set up internationalization in a Vue or Nuxt application',
      'translate a Vue component with Intlayer',
      'use the useIntlayer composable in Vue',
    ],
  },
};

/**
 * Derives catalog metadata for a skill that predates or postdates
 * {@link SKILL_CATALOG_METADATA}, so a newly published skill is still
 * discoverable — with weaker queries — instead of being dropped.
 *
 * @param skill - Skill missing a hand-written catalog entry.
 */
const getFallbackSkillMetadata = (
  skill: AgentSkill
): (typeof SKILL_CATALOG_METADATA)[string] => ({
  displayName: skill.name,
  representativeQueries: [
    `how do I use Intlayer for ${skill.name.replace(/^intlayer-/, '').replace(/-/g, ' ')}`,
    // First sentence of the front matter summary, which states what the skill does.
    skill.description.split('. ')[0]?.trim() ?? skill.description,
  ],
});

/** Turns every published agent skill into a catalog entry. */
const getSkillEntries = (): readonly CatalogEntry[] =>
  agentSkills.map((skill) => {
    const { displayName, representativeQueries } =
      SKILL_CATALOG_METADATA[skill.name] ?? getFallbackSkillMetadata(skill);

    return {
      identifier: `urn:air:${Website_Domain}:skill:${skill.name}`,
      displayName,
      // A single SKILL.md document, not an archive.
      type: 'application/agent-skills+md',
      url: getWebsiteUrl(
        `${WellKnown_AgentSkills_Path}/${skill.name}/SKILL.md`
      ),
      description: skill.description,
      representativeQueries,
      tags: ['i18n', 'intlayer', 'agent-skill'],
    };
  });

/**
 * Capabilities that are not agent skills: the MCP server, the API linkset and
 * the two documents describing the API to an agent.
 */
const STATIC_ENTRIES: readonly CatalogEntry[] = [
  {
    identifier: `urn:air:${Website_Domain}:mcp:intlayer`,
    displayName: 'Intlayer MCP Server',
    type: 'application/mcp-server-card+json',
    url: getWebsiteUrl(WellKnown_McpServerCard_Path),
    description:
      'Remote MCP server exposing Intlayer as tools: search the documentation, run CLI commands such as dictionary builds and translation fills, and manage CMS projects, environments and dictionaries.',
    representativeQueries: [
      'connect my IDE agent to the Intlayer MCP server',
      'search the Intlayer documentation from an MCP client',
      'run an Intlayer translation fill from an agent',
      'manage Intlayer CMS projects and dictionaries programmatically',
    ],
    tags: ['mcp', 'i18n', 'intlayer', 'tools'],
  },
  {
    identifier: `urn:air:${Website_Domain}:api:catalog`,
    displayName: 'Intlayer API Catalog',
    type: 'application/linkset+json',
    url: getWebsiteUrl(WellKnown_ApiCatalog_Path),
    description:
      'RFC 9727 API catalog linking every Intlayer API an agent may call, with its documentation, health and OAuth metadata.',
    representativeQueries: [
      'which APIs does Intlayer expose to agents',
      'where is the Intlayer REST API base URL',
      'find the Intlayer API health and documentation endpoints',
    ],
    tags: ['api', 'intlayer', 'linkset'],
  },
  {
    identifier: `urn:air:${Website_Domain}:api:auth-guide`,
    displayName: 'Intlayer API Authentication Guide',
    type: 'text/markdown',
    url: getWebsiteUrl(AuthMd_Path),
    description:
      'Machine-readable auth.md describing the OAuth 2.0 client_credentials flow an agent uses to call the Intlayer API with a project access key.',
    representativeQueries: [
      'how does an agent authenticate against the Intlayer API',
      'get an OAuth access token for Intlayer',
      'create an access key to call Intlayer programmatically',
    ],
    tags: ['auth', 'oauth2', 'api', 'intlayer'],
  },
  {
    identifier: `urn:air:${Website_Domain}:doc:llms-txt`,
    displayName: 'Intlayer Documentation Index for Agents',
    type: 'text/plain',
    url: getWebsiteUrl(LlmsTxt_Path),
    description:
      'llms.txt index listing every Intlayer documentation page in Markdown form, for retrieval and grounding.',
    representativeQueries: [
      'where is the Intlayer documentation in markdown',
      'list every Intlayer documentation page',
      'what is Intlayer and which frameworks does it support',
    ],
    tags: ['documentation', 'llms-txt', 'intlayer'],
  },
];

/**
 * Agentic Resource Discovery capability manifest.
 *
 * `host.identifier` is the site's HTTPS origin rather than a `did:web:` value:
 * the specification accepts either, and Intlayer publishes no DID document, so
 * advertising a DID that cannot be resolved would be worse for agents than an
 * identifier that dereferences.
 *
 * @see https://agenticresourcediscovery.org/
 * @see https://github.com/ards-project/ard-spec
 */
const getAiCatalog = () => ({
  specVersion: SPEC_VERSION,
  host: {
    displayName: 'Intlayer',
    identifier: `https://${Website_Domain}`,
    documentationUrl: Website_Doc_Root,
    logoUrl: getWebsiteUrl('/logo.svg'),
  },
  entries: [...STATIC_ENTRIES, ...getSkillEntries()],
});

export const Route = createFileRoute('/.well-known/ai-catalog.json')({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify(getAiCatalog(), null, 2), {
          status: 200,
          headers: {
            // The registry scanner requires a plain JSON media type here, not
            // the `application/ai-catalog+json` artifact type.
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff',
          },
        }),
    },
  },
});
