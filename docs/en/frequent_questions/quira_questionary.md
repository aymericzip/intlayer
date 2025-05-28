**Product & Vision**

- In 1–2 sentences, how would you describe what your company does today?

  Intlayer is a suite of tools designed to rethink internationalization and content management for SaaS applications.
  It synchronizes locale content declarations from your codebase with external content from your CMS, transforming your app into a CMS.
  It also provides AI-powered features to audit, translate, and optimize your content, helping you boost user conversion and deliver a more effective user experience.

- What long-term problem are you aiming to solve?

Intlayer focuses on several segments:

    - JavaScript internationalization (i18n)
        - Description: JavaScript internationalization (i18n) involves adapting software applications to different languages and regions without engineering changes. It focuses on externalizing content from the codebase, allowing non-developers to manage and edit content, and improving scalability and maintainability in large projects.
        - Competitors:
            - [i18next](https://www.i18next.com/) (historical reference)
            - [next-i18next](https://github.com/i18next/next-i18next) (React / NextJS)
            - [next-intl](https://next-intl.dev/) (more modern, NextJS)
            - [vue-i18n](https://vue-i18n.intlify.dev/) (for Vue.js)
        - Problems:
            1 - Static content in codebase
                - Detail: Unlike CMS, content is not editable by non-developers
                - Solution: Enable content externalization

            2 - Limited scalability
                - Detail: For each component created, developers must search through all content declaration files to make modifications. There's no built-in system for rebuilding changed key-values, etc.
                - Solution: Offer more flexibility in content declaration, particularly by adopting a 1 component = 1 content declaration file approach. This simplifies component duplication, deletion without polluting dictionaries, etc.

            3 - Poor maintainability in large projects
               - Details: In large projects, we often encounter duplicated content, unused but still imported into the client bundle. Also, when modifications are made, the current practice is to regenerate all translations at each build, which can be costly.
               - Solution: Provide a way to automate translation management. Offer automatic purging of unused content on a page and consolidate identical content.
        - Business potential: 0.5/5
            While this segment may not be highly lucrative, it presents a valuable opportunity to build a reputation. The area is currently underfunded, providing ample space for innovative solutions to challenge existing competitors.

    - Localization (l10n) platforms
        - Description: Localization (l10n) refers to the process of adapting a product or content to a specific locale or market. In this context, l10n platforms are solutions that allow the declaration of translations for content. They involve integrating with API, providing a visual editor, etc.
        - Competitors:
            - [Locize](https://locize.com/i18next.html)
            - [Lokalise](https://lokalise.com/)
            - [Localizejs](https://localise.biz/)
            - [Phrase](https://phrase.com/fr/)
            - [Crowdin](https://crowdin.com/)
            - [Qetzal](https://www.getquetzal.com/) (YC 2024)
        - Problems:
            1 - No instant updates
                - Details: If a content writer updates application content, the application needs to be rebuilt to update the content.
                - Solution: Better integration with bundlers and hot updates for remotely edited content.

            2 - Dependency on underlying technology
                - Details: Each l10n technology is limited by underlying technologies (i18n solutions listed above), which restricts the implementation of additional features not covered by JSON formatting, ICU MessageFormat, such as markdown interpretation, remote content retrieval, etc.
                - Solution: Propose a technology that can cover the entire technical stack.

            3 - No visual editor
                - Details: Many of these solutions focus on the content itself without offering a clear interface for content modification. The risk of error is therefore present, especially since a visual editor can be complicated to integrate.
                - Solution: Provide a visual editor.

            4 - Target client
                - Details: All these solutions target enterprises, which creates a barrier for public communication (dev community). However, it's often developers who enable the adoption of these solutions.
                - Solution: Implement a marketing strategy similar to Vercel's with their hosting solution and Next.js. This solution must be plug and play and speak to developers.

            5 - Open-source
                - Details: Many of these solutions are not open-source. Being open-source is a key selection criterion for developers.
                - Solution: Provide an open-source solution
        - Business potential: 1.5/5
            Many competitors, and l10n solution implementation might be avoided in 2025 through automatic content translation via AI.

    - Headless CMS
        - Description: A Headless CMS is a back-end content management system that makes content accessible via an API for display on any device, without a built-in front-end or presentation layer. It aims to provide better multilingual support by integrating internationalization solutions.
        - Competitors:
            - [Sanity](https://www.sanity.io/)
            - [Strapi](https://strapi.io/)
            - [Contentful](https://www.contentful.com/)
        - Problems:
            1 - Poor multilingual support
                - Details: Multilingual content management is not the core of Headless CMS. Often, we end up implementing an i18n solution + a headless CMS, making the application complicated to maintain.
                - Solution: Provide an internationalization solution that allows externalizing all or part of the application content
        - Business potential: 3/5


    - A/B Testing (content variant testing)
        - Description: A/B Testing involves comparing two versions of a content against each other to determine which one performs better. It focuses on providing multilingual support, automatic variant generation, and personalized content customization based on user data.
        - Competitors:
            - [Firebase](https://firebase.google.com/docs/ab-testing) (multilingual possible)
            - [VWO](https://vwo.com/)
            - [Optimizely](https://www.optimizely.com/)
        - Problems:
            1 - Poor multilingual support
                - Details: Multilingual content management must mainly be done manually. However, different approaches can be used to sell the same product depending on the user's language.
                - Solution: Provide a solution enabling A/B testing on multilingual content, managed independently.
            2 - Automatic variant generation
               - Details: While these solutions attempt to embrace AI, few solutions today enable clear and automatic strategies for generating effective content variants.
               - Solution: Implement a way to quickly manage and iterate on content variants.
            3 - Personalized content customization
               - Details: Relevant A/B testing incorporates user data (e.g., age, gender, location) to better target user profiles and improve conversion. However, none of these solutions allow such refined targeting.
               - Solution: Design A/B testing as customizable and adaptable based on user data.
        - Business potential: 4/5

    - SEO Optimization
        - Description: SEO Optimization involves improving the visibility and ranking of a website or a web page in a search engine's unpaid results. It focuses on optimizing content, keywords, and website structure to enhance search engine performance and user experience.
        - Competitors:
            - [SurferSEO](https://surferseo.com/)
            - [Semrush](https://www.semrush.com/projects/)
        - Problems:
            1 - Gap between analysis tools and change implementation
               - Details: While some tools allow observation of SEO trends, page analysis, competitor keywords, etc., other tools enable content administration. Changes must be implemented manually, which can represent a significant workload.
               - Solution: Implement a system that, through trend data acquisition, enables automatic writing/adaptation of pages.

- What's the long-term vision, what would success look like in 5 to 10 years?
  In 5 to 10 years, similar to how Tailwind CSS became the reference for styling, ShadCN UI for UI kit, or Next.js for web development, Intlayer aims to become the reference for content management in the web development world.

- Who are your main competitors (open-source or not)? Are they free or paid?
  [described earlier]
  -> i18n competitors: free
  -> l10n solution, headless CMS, A/B testing platform, SEO tools: freemium

- How do you differentiate from your competitors now?
  Intlayer's idea is to take the best from each previously mentioned segment and integrate it through a turnkey tool addressing all content management issues for SaaS applications. Intlayer revisits the problem from the ground up, integrating new consensus regarding web development paradigms in 2025.
  The main limitation of competitors is technical constraint: it's impossible to implement A/B testing or hot-update application content while respecting standards established 10 years ago by i18next.
  Intlayer rethinks local and remote content management by reconstructing technical stack control from bundling to content externalization.

- How do you see your product evolving to stay ahead?
  The strategy consists of attacking the market in the order previously described.

  - The first objective is to make a name by bringing innovations to a sector where technical difficulty is high, few financial resources are present, and little changes has been introduced in the last 10 years: JavaScript i18n solutions.

  - Current state:
    -- Tools now available on Vite, React, Vue, Nextjs, Express.js, Lynx, React Native. Tested and approved by several thousand developers.

  - The next steps will be:
    -- June: Release of automatic content translation management tool
    -- July: Release of visual editor (free), competing with l10n tools
    -- September: CMS release
    -- Q4 2024 - Q1 2025: Release of versioning / A/B testing features
    -- 2025: Release of content-based search and chat features

- If you weren't working with Quira, what would your goals for the next 6 months be?
  With or without Quira, the objective in 6 months is to gain social proof to unlock partnerships / visibility and new opportunities.

- How does working with Quira change the previous answer?
  I think that Quira can help us accelerate and obtain this social proof and accelerate as a long term partner.

**Current State**

- What have you built so far? (Feel free to share links: GitHub, demos, docs, etc.)

  - [Official website](https://intlayer.org)
  - [Official doc](https://intlayer.org/doc)
  - [Github repo](https://github.com/aymericzip/intlayer)
  - Backend (destined to be eventually self-hosted)
  - Self-hosted visual editor to interact with your content
    - [Playground](https://intlayer.org/playground)
  - [CMS](https://intlayer.org/dashboard)
  - Smart AI assistant that answers user questions related to Intlayer, collects user questions, bugs, etc.
    - [Playground](https://intlayer.org/doc/chat)
  - NPM packages:

    - intlayer
      - Package to declare content on all kinds of applications
      - [npm](https://www.npmjs.com/package/intlayer)
    - react-intlayer
      - To use Intlayer on a React application
      - [npm](https://www.npmjs.com/package/react-intlayer)
    - next-intlayer
      - To use Intlayer on a Next.js application
      - [npm](https://www.npmjs.com/package/next-intlayer)
    - vue-intlayer
      - To use Intlayer on a Vue application
      - [npm](https://www.npmjs.com/package/vue-intlayer)
    - solid-intlayer (WIP)
      - To use Intlayer on a Solid.js application
      - [npm](https://www.npmjs.com/package/solid-intlayer)
    - express-intlayer
      - To use Intlayer on an express.js backend
      - [npm](https://www.npmjs.com/package/express-intlayer)
    - svelte-intlayer (WIP)
      - To use Intlayer on a Svelte application
      - [npm](https://www.npmjs.com/package/svelte-intlayer)
    - preact-intlayer (WIP)
      - To use Intlayer on a Preact application
      - [npm](https://www.npmjs.com/package/preact-intlayer)
    - angular-intlayer (WIP)
      - To use Intlayer on an Angular application
      - [npm](https://www.npmjs.com/package/angular-intlayer)
    - react-scripts-intlayer
      - To use Intlayer with the original 'React Create App' React application
      - [npm](https://www.npmjs.com/package/react-scripts-intlayer)
    - vite-intlayer
      - Tools that integrate plugins for intlayer to work with Vite bundler
      - [npm](https://www.npmjs.com/package/vite-intlayer)
    - react-native-intlayer
      - Tools that integrate plugins for intlayer to work with Metro bundler
      - [npm](https://www.npmjs.com/package/react-native-intlayer)
    - lynx-intlayer
      - Tools that integrate plugins for intlayer to work with Lynx bundler
      - [npm](https://www.npmjs.com/package/lynx-intlayer)
    - intlayer-editor
      - Package that includes the free visual editor to interact with the codebase
      - [npm](https://www.npmjs.com/package/intlayer-editor)
    - @intlayer/config
      - Cross-platform tool to manage and share intlayer configuration
      - [npm](https://www.npmjs.com/package/@intlayer/config)
    - @intlayer/dictionaries-entry / @intlayer/unmerged-dictionaries-entry
      - Tools that allow bundling optimization on all Bundlers as Vite / Webpack / Turbopack / etc
      - [npm](https://www.npmjs.com/package/@intlayer/dictionaries-entry)
      - [npm](https://www.npmjs.com/package/@intlayer/unmerged-dictionaries-entry)
    - @intlayer/core
      - Tools to share core intlayer functionalities across all frameworks
      - [npm](https://www.npmjs.com/package/@intlayer/core)
    - @intlayer/chokidar
      - Tools watch Intlayer dictionaries and interact with file system
      - [npm](https://www.npmjs.com/package/@intlayer/chokidar)
    - @intlayer/webpack
      - Tools that integrate plugins for intlayer to work with WebPack bundler
      - [npm](https://www.npmjs.com/package/@intlayer/webpack)
    - @intlayer/editor
      - Cross-platform tool to manage and share intlayer editor core functions
      - [npm](https://www.npmjs.com/package/@intlayer/editor)
    - @intlayer/babel
      - Tools that optimize bundling of dictionaries for Vite and Webpack based applications
      - [npm](https://www.npmjs.com/package/@intlayer/babel)
    - @intlayer/swc (WIP)
      - Tools that optimize bundling of dictionaries for Next.js applications
      - [npm](https://www.npmjs.com/package/@intlayer/swc)
    - @intlayer/api
      - API SDK to interact with backend
      - [npm](https://www.npmjs.com/package/@intlayer/api)
    - @intlayer/editor-react
      - Share editor functions across intlayer CMS / Visual editor and React client
      - [npm](https://www.npmjs.com/package/@intlayer/editor-react)
    - @intlayer/design-system
      - Share design elements between CMS and Visual editor
      - [npm](https://www.npmjs.com/package/@intlayer/design-system)
    - @intlayer/backend
      - Export backend types and will eventually offer backend as standalone in the future
      - [npm](https://www.npmjs.com/package/@intlayer/backend)
    - intlayer-cli / @intlayer/api
      - To use Intlayer using CLI
      - [npm](https://www.npmjs.com/package/intlayer-cli)
      - [npm](https://www.npmjs.com/package/@intlayer/cli)

  - VS code extension
    - [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)
    - [GitHub repo](https://github.com/aymericzip/intlayer-vs-code-extension)

- What parts of the product are live or testable right now?

  - i18n solution -> testable and stable
  - visual editor -> testable as alpha
  - CMS -> testable as alpha
  - A/B testing -> WIP
  - SEO -> Not started

- Where would you place your current stage?

  - Still building
  - Alpha
  - Public beta
  - Live with users

  => All together

- Is the product free or paid? If free:

  - Do you plan to monetize it? How?

    - Yes as described earlier.

      - i18n tooling: 100% free
      - Visual editor: 100% free
      - CMS:

        - free:
          - 1 project
          - 100 MB storage
          - visual editor
          - 1 user
        - premium:
          - all from free
          - 500 MB storage
          - 10 projects
          - AI content generation
        - enterprise:
          - all from premium
          - unlimited projects
          - unlimited users
          - A/B testing
          - SEO optimization

      - AI use: X tokens included + extra usage

  - Why do you believe people/companies would eventually pay?
    - Content management for an application is a common problem that could be optimized. Companies already pay for l10n solutions, and CMS, and sometimes both simultaneously.
    - Optimization of landing pages or product descriptions can lead to better conversion.

- If paid:
  - Why are users currently willing to pay?
- What are the biggest challenges you're facing right now?
  - We're facing a social proof problem. The solution is now stable and appreciated by users. We should get more GitHub stars, contributors, downloads, and followers to gain legitimacy.
  - And like other early-stage companies, we're facing common problems in accelerating, specializing, etc.

**Users**

- How do you define a user? _(a developer, a project, a company, etc)_

  - A developer
  - How many users do you currently have?

  - i18n tools (free): 5,000 - 25,000 (estimated)
  - CMS - free plan (will be released in September): 31 registered users / 4 active users
  - CMS - paid plan (will be released in September): 0 users

- How do you define an "active user"?

  - i18n tools (free): People who use the tool to internationalize their applications.
  - CMS: People who interacted with the dictionaries during the last 30 days.

- Who is your ideal target user right now? _(e.g. solo developer, growth PM, startup team, AI agent)_

  - Solo developer, startup team

- What have you tried so far to reach or onboard them? What has / hasn't worked?

  - SEO (principal source of acquisition)
  - Script that lists new competitors' users and contacts them using LinkedIn / Email
    - [Repo (private)](https://github.com/aymericzip/fetch-competitors)
  - Release:
    - [Product Hunt](https://www.producthunt.com/products/intlayer)
    - [Hacker News](https://news.ycombinator.com/submitted?id=aypineau)
  - Social network communication:
    - [Reddit](https://www.reddit.com/user/aymericzip/)
    - [YouTube videos](https://www.youtube.com/@intlayer)
    - [LinkeIn](https://www.linkedin.com/company/intlayerorg)
    - [X](https://x.com/Intlayer183096)
    - [Instagram](https://www.instagram.com/intlayer_org/)
    - [Facebook](https://www.facebook.com/intlayer)
    - [TikTok](https://www.tiktok.com/@intlayer?is_from_webapp=1&sender_device=pc)
  - Blog posts:
    - EN
      - [daily.dev](https://dev.to/aypineau)
      - [medium](https://medium.com/@ay.pineau)
      - [hackernoon](https://hackernoon.com/u/aymericzip)
      - [geeksforgeeks](https://write.geeksforgeeks.org/community/post/2547)
    - RU
      - [habr](https://habr.com/en/users/aymericzip/articles/)
    - JA
      - [zenn](https://qiita.com/aymericzip)
      - [qiita](https://zenn.dev/aymericzip)
    - KO
      - [okky](https://okky.kr/users/193364/articles)
      - [velog](https://velog.io/@aymericzip/posts).
    - PT
      - [DIO](https://www.dio.me/users/ay_pineau)

**AI**

- Is there an AI-powered version of what you're building?
  - Many additional tools are probably attempting to integrate AI. However, AI is not implemented in the commonly use packages.
  - l10n & CMS: Yes, there is a widespread effort to implement AI.
- How does your strategy shift if AIs begin writing most of the code?
  Intlayer rides the AI wave, enabling better AI assistance for i18n and content management purposes for both developers and non-developers.
  Intlayer will also implement MCP server to manage operations such as pulling and pushing external dictionaries.

**Funding & Team**

- Are you working on this full-time?
- How big is your team today?
- How are you funding the project right now?
  The team currently consists of 4 members, including two full-time members and two part-time members recently onboarded.

  [Aymeric PINEAU](https://www.linkedin.com/in/aymericpineau/)
  -- Founder - Software Engineer (full time)

  [Aurélia Bret](https://www.linkedin.com/in/aureliabret/)
  -- Co-founder - Growth, Business Development, Product manager (full time)

  [Mathis Derenne](https://www.linkedin.com/in/mathis-derenne/)
  -- Part-time contributor on AI topic
  -- Study apprenticeship as Student M1 in data science & machine learning, and data engineer and scientist at CoSpirit Groupe

  [Marine Henriot](https://www.linkedin.com/in/marine-henriot-17184480/)
  -- Part-time contributor on Community Manager, Graphic design, UX/UI
  -- Graphic / Web designer freelance

- Are you planning to apply for a grant or raise an investment round in the next 6–12 months?
  -- We are likely to pursue funding as it is crucial for our growth. However, our primary focus will remain on deliverability, and gaining credibility before shifting attention to fundraising. We will also be discerning about the terms and conditions.

- How committed are you to the project?
  - Just testing the waters
  - Definitely committed for a few years [X]
  - This is my life's mission

**Open Source**

- Why did you decide to make your product open source?

  - In the web development community, open source is the standard approach. It was a clear choice for us. To protect against competitive misuse, our code is licensed under the Apache II license, except for the VSCode extension, which is under the MIT license. Currently, the CMS is part of the open-source repository, but we may consider eventually transitioning to private code in the future.

- Are you actively looking to attract contributors?

  - Yes.

- What have you done so far to bring in contributors? What has or hasn't worked?
  - We unsuccessfully onboarded Fiverr workers (Skills, cost mismatch)
  - Listed some issues on Github well described
  - Listed issues on [Up for grabs](https://up-for-grabs.net/#/)
  - Included a Contributing.md
  - Added sufficient documentation on the Code and doc registry
  - Implemented AI assistant that can help retrieve related docs
- What kinds of issues or contributions would you like to see?
  - Adaptation of intlayer for Angular / Svelte / Preact / Solid
  - Getting more feedback and eventual bug details
