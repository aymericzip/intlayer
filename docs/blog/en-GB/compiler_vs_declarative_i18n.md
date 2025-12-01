---
createdAt: 2025-11-24
updatedAt: 2025-11-24
title: Compiler vs. Declarative i18n
description: Exploring the architectural trade-offs between "magic" compiler-based internationalisation and explicit declarative content management.
keywords:
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
  - i18n
  - Compiler
  - Declarative
slugs:
  - blog
  - compiler-vs-declarative-i18n
---

# The Case for and Against Compiler-Based i18n

If you have been building web applications for more than a decade, you know that Internationalisation (i18n) has always been a friction point. It is often the task no one wants to do—extracting strings, managing JSON files, and worrying about pluralisation rules.

Recently, a new wave of **"Compiler-based" i18n tools** has emerged, promising to make this pain disappear. The pitch is seductive: **Just write text in your components, and let the build tool handle the rest.** No keys, no imports, just magic.

But as with all abstractions in software engineering, magic comes with a price.

In this blog post, we will explore the shift from declarative libraries to compiler-based approaches, the hidden architectural debts they introduce, and why the "boring" way might still be the best way for professional applications.

## Table of Contents

<TOC/>

## A Brief History of Internationalisation

To understand where we are, we must look back at where we started.

Around 2011–2012, the JavaScript landscape was vastly different. Bundlers as we know them (Webpack, Vite) didn't exist or were in their infancy. We were gluing scripts together in the browser. In this era, libraries like **i18next** were born.

They solved the problem the only way possible at the time: **Runtime Dictionaries**. You loaded a massive JSON object into memory, and a function looked up keys on the fly. It was reliable, explicit, and worked everywhere.

Fast forward to today. We have powerful compilers (SWC, Rust-based bundlers) that can parse Abstract Syntax Trees (AST) in milliseconds. This power gave birth to a new idea: _Why are we manually managing keys? Why can't the compiler just see the text "Hello World" and swap it out for us?_

Thus, Compiler-based i18n was born.

> **Example of compiler-based i18n:**
>
> - Paraglide (Tree-shaken modules that compile each message to a tiny ESM function so bundlers can drop unused locales and keys automatically. You import messages as functions instead of doing string-key lookups.)
> - LinguiJS (Macro-to-function compiler that rewrites message macros like `<Trans>` into plain JS function calls at build time. You get ICU/MessageFormat syntax with a very small runtime footprint.)
> - Lingo.dev (Focuses on automating the localisation pipeline by injecting translated content directly during the build of your React application. It can auto-generate translations using AI and integrate directly into CI/CD.)
> - Wuchale (Svelte-first preprocessor that extracts inline text in .svelte files and compiles it into zero-wrapper translation functions. It avoids string keys, and separates the content extraction logic completely from the main application runtime.)
> - Intlayer (Compiler / Extract CLI that parses your components, generates typed dictionaries, and can optionally rewrite code to use explicit Intlayer content. The goal is to use the compiler for velocity while keeping a declarative, framework-agnostic core.)

> **Example of declarative i18n:**
>
> - i18next / react-i18next / next-i18next (The mature industry standard using runtime JSON dictionaries and an extensive plugin ecosystem)
> - react-intl (Part of the FormatJS library, focusing on standard ICU message syntax and strict data formatting)
> - next-intl (Optimised specifically for Next.js with integration for the App Router and React Server Components)
> - vue-i18n / @nuxt/i18n (The standard Vue ecosystem solution offering component-level translation blocks and tight reactivity integration)
> - svelte-i18n (A lightweight wrapper around Svelte stores for reactive, runtime translations)
> - angular-translate (The legacy dynamic translation library relying on runtime key lookups rather than build-time merging)
> - angular-i18n (Angular's native, ahead-of-time approach merging XLIFF files directly into templates during the build)
> - Tolgee (Combines declarative code with an in-context SDK for "click-to-translate" editing directly in the UI)
> - Intlayer (Per-component approach, using content declarations files enabling native tree-shaking and TypeScript validation)

## The Intlayer Compiler

Although **Intlayer** is a solution that fundamentally encourages a **declarative approach** to your content, it includes a compiler to help speed up development or facilitate rapid prototyping.

The Intlayer compiler traverses the AST (Abstract Syntax Tree) of your React, Vue, or Svelte components, as well as other JavaScript/TypeScript files. Its role is to detect hardcoded strings and extract them into dedicated `.content` declarations.

> For more details, check out the documentation: [Intlayer Compiler Docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md)

## The Allure of the Compiler (The "Magic" Approach)

There is a reason this new approach is trending. For a developer, the experience feels incredible.

### 1. Speed and "Flow"

When you are in the zone, stopping to think of a semantic variable name (`home_hero_title_v2`) breaks your flow. With a compiler approach, you type `<p>Welcome back</p>` and keep moving. The friction is zero.

### 2. The Legacy Rescue Mission

Imagine inheriting a massive codebase with 5,000 components and zero translations. Retrofitting this with a manual key-based system is a months-long nightmare. A compiler-based tool acts as a rescue strategy, instantly extracting thousands of strings without you needing to touch a single file manually.

### 3. The AI Era

This is a modern benefit we shouldn't overlook. AI coding assistants (like Copilot or ChatGPT) naturally generate standard JSX/HTML. They don't know your specific translation key schema.

- **Declarative:** You have to rewrite the AI's output to replace text with keys.
- **Compiler:** You copy-paste the AI's code, and it just works.

## The Reality Check: Why "Magic" is Dangerous

While the "magic" is appealing, the abstraction leaks. Relying on a build tool to understand human intent introduces architectural fragility.

### Heuristic Fragility (The Guessing Game)

The compiler has to guess what is content and what is code. This leads to edge cases where you end up "fighting" the tool.

Consider these scenarios:

- Does `<span className="active"></span>` get extracted? (It's a string, but likely a class).
- Does `<span status="pending"></span>` get extracted? (It's a prop value).
- Does `<span>{"Hello World"}</span>` get extracted? (It's a JS expression).
- Does `<span>Hello {name}. How are you?</span>` get extracted? (Interpolation is complex).
- Does `<span aria-label="Image of cat"></span>` get extracted? (Accessibility attributes need translation).
- Does `<span data-testid="my-element"></span>` get extracted? (Test IDs should NOT be translated).
- Does `<MyComponent errorMessage="An error occurred" />` get extracted?
- Does `<p>This is a paragraph{" "}\n containing multiple lines</p>` get extracted?
- Does `<p>{getStatusMessage()}</p>` function result get extracted?
- Does `<div>{isLoading ? "The page is loading" : <MyComponent/>} </div>` get extracted?
- Does a product ID like `<span>AX-99</span>` get extracted?

You inevitably end up adding specific comments (like `// ignore-translation`, or specific props like `data-compiler-ignore="true"`) to prevent it from breaking your application logic.

### How does Intlayer handle this complexity?

Intlayer uses a mixed approach to detect if a field should be extracted for translation, attempting to minimise false positives:

1.  **AST Analysis:** It checks the element type (e.g., distinguishing between a `reactNode`, a `label`, or a `title` prop).
2.  **Pattern Recognition:** It detects if the string is capitalised or includes spaces, suggesting it is likely human-readable text rather than a code identifier.

### The Dynamic Data Hard Limit

Compiler extraction relies on **static analysis**. It must see the literal string in your code to generate a stable ID.
If your API returns an error code string like `server_error`, you cannot translate it with a compiler because the compiler doesn't know that string exists at build time. You are forced to build a secondary "runtime-only" system just for dynamic data.

### Lack of chunking

Certain compilers don't chunk translations per page. If your compiler generates a large JSON file per language (e.g., `./lang/en.json`, `./lang/fr.json`, etc.), you'll likely end up loading content from all your pages for a single visited page. Also, each component using your content will probably be hydrated with far more content than necessary, potentially causing performance issues.

Also be careful about loading your translations dynamically. If this isn't done, you'll load content for all languages in addition to the current one.

> To illustrate the problem, consider a site with 10 pages and 10 languages (all 100% unique). You would load content for 99 additional pages (10 × 10 - 1).

### "Chunk Explosion" and Network Waterfalls

To solve the chunking problem, some solutions offer chunking per component, or even per key. Yet the problem is only partially resolved. The selling point for these solutions is often to say "Your content is tree-shaken."

Indeed, if you load content statically, your solution will tree-shake unused content, but you'll still end up with content from all languages loaded with your application.

So why not load it dynamically? Yes, in that case you'll load more than the necessary content, but it's not without trade-offs.

Loading content dynamically isolates each piece of content in its own chunk, which will only be loaded when the component is rendered. This means you'll make one HTTP request per text block. 1,000 text blocks on your page? → 1,000 HTTP requests to your servers. And to limit the damage and optimise your application's first render time, you'll need to insert multiple Suspense boundaries or Skeleton Loaders.

> Note: Even with Next.js and SSR, your components will still be hydrated after loading, so the HTTP requests will still be made.

The solution? Adopting a solution that allows you to declare scoped content declarations, as `i18next`, `next-intl`, or `intlayer` does.

> Note: `i18next` and `next-intl` require you to manage your namespace / messages imports manually for each page to optimise your bundle size. You should use a bundle analyser like `rollup-plugin-visualizer` (vite), `@next/bundle-analyser` (next.js), or `webpack-bundle-analyser` (React CRA / Angular / etc) to detect if you are polluting your bundle with unused translations.

### Runtime Performance Overhead

To make translations reactive (so they update instantly when you switch languages), the compiler often injects state management hooks into every component.

- **The Cost:** If you render a list of 5,000 items, you are initialising 5,000 `useState` and `useEffect` hooks solely for text. React must identify and re-render all 5,000 consumers simultaneously. This causes a massive "Main Thread" block, freezing the UI during the switch. This consumes memory and CPU cycles that declarative libraries (which typically use a single Context provider) save.

> Note that the issue is similar for frameworks other than React.

## The Trap: Vendor Lock-in

Be careful to choose an i18n solution that allows extraction or migration of translation keys.

In the case of a declarative library, your source code explicitly contains your translation intent: these are your keys, and you control them. If you want to change libraries, you generally just need to update the import.

With a compiler approach, your source code might just be plain English text, with no trace of translation logic: everything is hidden in the build tool configuration. If that plugin becomes unmaintained or you want to change solutions, you could get stuck. There’s no easy way to “eject”: there are no usable keys in your code, and you might need to re-generate all your translations for a new library.

Some solutions also offer translation generation services. No more credits? No more translations.

Compilers often hash the text (e.g., `"Hello World"` -> `x7f2a`). Your translation files look like `{ "x7f2a": "Hola Mundo" }`. The Trap: If you switch libraries, the new library sees `"Hello World"` and looks for that key. It won't find it because your translation file is full of hashes (`x7f2a`).

### Platform Lock-in

By choosing a compiler-based approach, you lock yourself into the underlying platform. For example, certain compilers are not available for all bundlers (such as Vite, Turbopack, or Metro). This can make future migrations difficult, and you may need to adopt multiple solutions to cover all your applications.

## The Other Side: Risks of the Declarative Approach

To be fair, the traditional declarative way isn't perfect either. It has its own set of "footguns."

1.  **Namespace Hell:** You often have to manually manage which JSON files to load (`common.json`, `dashboard.json`, `footer.json`). If you forget one, the user sees raw keys.
2.  **Over-fetching:** Without careful configuration, it is very easy to accidentally load _all_ your translation keys for _all_ pages on the initial load, bloating your bundle size.
3.  **Sync Drift:** It is common for keys to remain in the JSON file long after the component using them has been deleted. Your translation files grow indefinitely, filled with "zombie keys."

## The Intlayer Middle Ground

This is where tools like **Intlayer** are trying to innovate. Intlayer understands that while compilers are powerful, implicit magic is dangerous.

Intlayer offers a mixed approach, allowing you to benefit from the advantages of both approaches: declarative content management, also compatible with its compiler to save development time.

And even if you don't use the Intlayer compiler, Intlayer offers a `transform` command (also accessible using the VSCode extension). Instead of just doing magic in the hidden build step, it can actually **rewrite your component code**. It scans your text and replaces it with explicit content declarations in your codebase.

This gives you the best of both worlds:

1.  **Granularity:** You keep your translations close to your components (improving modularity and tree-shaking).
2.  **Safety:** The translation becomes explicit code, not hidden build-time magic.
3.  **No Lock-in:** Since the code is transformed into a declarative structure within your repo, you can easily press tab, or use your IDE's copilot, to generate your content declarations, you aren't hiding logic in a webpack plugin.

## Conclusion

So, which should you choose?

**If you are building an MVP, or want to move quickly:**
The compiler-based approach is a valid choice. It allows you to move incredibly fast. You don't need to worry about file structures or keys. You just build. The technical debt is a problem for "Future You."

**If you are a Junior Developer, or don’t care about optimisation:**
If you want the least manual management, a compiler-based approach is likely best. You won’t need to handle keys or translation files yourself—just write text, and the compiler automates the rest. This reduces setup effort and common i18n mistakes tied to manual steps.

**If you are internationalising an existing project that already includes thousands of components to refactor:**
A compiler-based approach can be a pragmatic choice here. The initial extraction phase can save weeks or months of manual work. However, consider using a tool like Intlayer's `transform` command, which can extract strings and convert them into explicit declarative content declarations. This gives you the speed of automation while maintaining the safety and portability of a declarative approach. You get the best of both worlds: rapid initial migration without long-term architectural debt.

**If you are building a Professional, Enterprise-Grade Application:**
Magic is generally a bad idea. You need control.

- You need to handle dynamic data from backends.
- You need to ensure performance on low-end devices (avoiding hook explosions).
- You need to ensure you aren't locked into a specific build tool forever.

For professional apps, **Declarative Content Management** (such as Intlayer or established libraries) remains the gold standard. It separates your concerns, keeps your architecture clean, and ensures that your application's ability to support multiple languages isn't dependent on a "black box" compiler guessing your intentions.
