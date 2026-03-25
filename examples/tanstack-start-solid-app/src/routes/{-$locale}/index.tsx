import { createFileRoute } from '@tanstack/solid-router';
import { useIntlayer } from 'solid-intlayer';

export const Route = createFileRoute('/{-$locale}/')({ component: App });

function App() {
  const content = useIntlayer('index-page');

  const features = () =>
    [
      [
        content().features.typeSafeRouting.title,
        content().features.typeSafeRouting.desc,
      ],
      [
        content().features.serverFunctions.title,
        content().features.serverFunctions.desc,
      ],
      [content().features.streaming.title, content().features.streaming.desc],
      [content().features.tailwind.title, content().features.tailwind.desc],
    ] as const;

  return (
    <main class="page-wrap px-4 pt-14 pb-8">
      <section class="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div class="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div class="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p class="island-kicker mb-3">{content().kicker}</p>
        <h1 class="display-title mb-5 max-w-3xl font-bold text-4xl text-[var(--sea-ink)] leading-[1.02] tracking-tight sm:text-6xl">
          {content().heroTitle}
        </h1>
        <p class="mb-8 max-w-2xl text-[var(--sea-ink-soft)] text-base sm:text-lg">
          {content().heroDesc}
        </p>
        <div class="flex flex-wrap gap-3">
          <a
            href="/about"
            class="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 font-semibold text-[var(--lagoon-deep)] text-sm no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            {content().aboutLink}
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 font-semibold text-[var(--sea-ink)] text-sm no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            {content().routerGuide}
          </a>
        </div>
      </section>

      <section class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features().map(([title, desc], index) => (
          <article
            class="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ 'animation-delay': `${index * 90 + 80}ms` }}
          >
            <h2 class="mb-2 font-semibold text-[var(--sea-ink)] text-base">
              {title}
            </h2>
            <p class="m-0 text-[var(--sea-ink-soft)] text-sm">{desc}</p>
          </article>
        ))}
      </section>

      <section class="island-shell mt-8 rounded-2xl p-6">
        <p class="island-kicker mb-2">{content().quickStart.kicker}</p>
        <ul class="m-0 list-disc space-y-2 pl-5 text-[var(--sea-ink-soft)] text-sm">
          <li>{content().quickStart.editIndex}</li>
          <li>{content().quickStart.editHeader}</li>
          <li>{content().quickStart.editRoutes}</li>
        </ul>
      </section>
    </main>
  );
}
