declare module '*.md' {
  /**
   * Raw markdown file content, injected at build time by the
   * `raw-markdown-plugin` declared in `vite.config.ts`.
   */
  const content: string;
  export default content;
}
