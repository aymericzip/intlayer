declare module '*.md' {
  /**
   * Raw markdown file content, injected at build time by the `asset/source`
   * webpack rule (and the equivalent Turbopack `raw-loader` rule) declared in
   * `next.config.ts`.
   */
  const content: string;
  export default content;
}
