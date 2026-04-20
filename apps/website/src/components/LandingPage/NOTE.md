**gt-react** / **gt-next**

I was not able to test gt-react / gt-next. The libraries are not functional and break the application.

- I was not able to test the app reactivity.
- Translations are not rendered; I get the error `Error: <T> used on the client-side outside of <GTProvider>`, which seems to be a bug in the library.
- While implementing **gt-tanstack-start-react**, I also came across an [issue](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) with the library: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, which was making the application break. After reporting this issue, the maintainer fixed it within 24 hours.
- This library requires a dependency on the General Translation server for translation. Even a single translation attempt returned an error: `Quota Exceeded, please upgrade your plan`. The risk of vendor lock-in is high.
- These libraries use an anti-pattern through the `initializeGT()` function, blocking the bundle from tree-shaking cleanly.
- For nextjs implementation, the library blocks static rendering of Next.js pages.

**Lingo.dev**

- Heavy dependency on the lingo.dev server to generate the translations. Even if they include a more generous free tier than General Translation, the risk of vendor lock-in is high.
- The setup was not straightforward. I had to reverse engineer their code and force overwriting an environment variable to make it work.
- Their CLI is buggy and used to rewrite the config file each time I used it.
- The compiler was missing almost 40% of the translated content. I had to rewrite all `.map` into flat component blocks to make it work.
- I met reactivity issues with the library. On locale change I had to force rerendering of the provider to make it work.
- On rebuild it used to randomly remove all generated translations without any reason.

**next-translate**

- For Next.js applications, this library was a great discovery; the approach is extremely well thought out and easy to implement, and the results are impressive. The gain in comparison to other libraries using `t()` syntax is significant, such as **next-intl** or **next-i18next**.
- This library uses a build transformation approach with `react-translate-plugin`: it rewrites your pages and inserts content retrieval using `getStaticProps` or `getServerSideProps` via a Webpack / Turbopack loader. The result is that you never fetch content from other locales.
- For namespacing, picking namespaces at the config level is also well thought out: you can define namespaces for each page or route. It makes maintenance much easier than the main alternatives, such as **next-intl** or **next-i18next**.
- This library supports both Webpack and Turbopack, client and server components, and the Pages and App Router.
- Even if that solution is >6 years old, the library is still actively maintained.
- There is no website and no online documentation; they are only available on GitHub. I like finding great libraries and fixing problems in a clean way, without extra marketing layers.
- All constants are transformed into functions, leading to an anti-pattern. Syntax such as `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` introduces unnecessary complexity and leads to JavaScript execution overhead.
- The library blocks static rendering of Next.js pages.

**Tolgee**

- The implementation was difficult to get working, especially because the library does not provide type safety. To detect wrong keys, I had to manually rewrite the type-safety logic and reuse my own implementation of the `getTranslation` function.
- This library uses a build transformation approach with `react-translate-plugin`: it rewrites your pages and inserts content retrieval using `getStaticProps` or `getServerSideProps`. The result is that you never fetch content from other locales.
- This library supports both Webpack and Turbopack, client and server components, and the Pages and App Router.
- Even if that solution is >6 years old, the library is still actively maintained.
- There is no website and no online documentation; they are only available on GitHub.
- On tanstack start I also met reactivity issues with the library. On locale change I had to force the rerendering of the provider to make it work. I had to subcribe to the locale change event to make it work when loading the page in another locale.
- For nextjs implementation, the library blocks static rendering of Next.js pages.
- I also met issues with the DevTools provided by the library. It used to log errors in the server side console.

**next-intl** / **use-intl** / **next-i18next** / **react-i18next** / **next-international**

- Same pros and cons for all these libraries that use a `t()` function syntax.
- Optimizations are possible but extremely time consuming. Good practices are not clearly highlighted, and it may be easy for agents or junior developers to harm application performance through bad practices. Especially when using namespacing plus dynamic loading, maintaining type safety, and knowing exactly which namespace should be included on which page is a nightmare.
- All these libraries offer a similar approach, well connected with the React reactivity system. But `next-intl` offers additional features, such as middleware support, formatters, etc.
- The message formats diverge between libraries. `next-intl` uses the ICU MessageFormat format, while `i18next` uses its own format.
- **next-intl** is a much lighter solution than **i18next**, but remains heavy and poorly optimized.
- **next-intl** used to block static rendering of Next.js pages. It provides a fix function named `setRequestLocale()`, that was not easy to understand the cause of the issue or how to fix it. This issue seems to have been solved and no longer blocks static rendering for centralized content such as `en.json` / `fr.json` / `es.json` / etc. Note that it still blocks static rendering when content is scoped into namespaces such as `en/shared.json` / `fr/shared.json` / `es/shared.json` / etc.
- Both solutions do not offer a way to translate synchronous server components such as design-system navbar, footer, etc. As a result, all components have to be translated on the client side.
- All constants are transformed into functions, leading to an anti-pattern. Syntax such as `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` introduces unnecessary complexity and leads to JavaScript execution overhead.
- **next-international** includes a custom `scopedT()` function that allows you to translate content in a specific namespace which make the refactoring process harder for optimization purpose. But because there is no way to split the jsons in namespaces, this function is quite useless. It only improves the DX, but has no impact on the bundle size.

**Lingui**

- Reasonable performance and impact, with good respect for best practices.
- Implementation is complex for functions that are not page components, like in Next.js `generateMetadata`. You have to create a new i18n instance, pick the messages to load, then translate them.
- The flow can be a bit complex to understand on first implementation.
- Confusing syntax, e.g. `t()`, `t''`, `i18n.t()`, `<Trans>`. Knowing which practices to use in the application is not intuitive.

**Wuchale**

- Great approach trying to automate the extraction and translation process without any `t()` function syntax.
- Svelte-first solution. The React adaptation of the library is not as mature as the Svelte version. The React application reactivity did not work. I had to force rerendering of the provider on locale change using a custom `isMounted()` state/effect to make it work.
- Uses an anti-pattern for the initialization function to make it load before the router is initialized.

**Paraglide**

- Reasonable performance and impact. Great solution to keep the app as reactive as possible.
- But for applications including multiple locales, Paraglide includes all messages in the bundle. There is no way to dynamically load the messages. Even if they promote `tree-shaking` optimization, the library is mainly moving the bundling problem somewhere else. A future improvement for dynamic loading seems impossible given the library architecture. Using dynamic loading would lead to thousands of requests to the server.
- Complex flow using JSON declaration files as the source of truth, plus generation of the message files at build time, then manual imports in each component.
- All constants are transformed into functions, leading to an anti-pattern. Syntax such as `import * as m from '@/messages'` + `<>{m.myContent()}</>` introduces unnecessary complexity and leads to JavaScript execution overhead.
- In comparison of other solution that use a react context to retrieve in a efficient way the current locale to render the content, Paraglide will read for each content node imported the locale from the localeStorage / cookie etc. It leads to execution of unnecessary logic.

**react-intl**

- Performant implementation, made by the Format.js team.
- Confusing DX using the `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` introduces unnecessary complexity, leads to JavaScript execution overhead, and connect the global i18n instance to the all components node.
