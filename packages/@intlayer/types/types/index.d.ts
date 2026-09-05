declare module 'intlayer' {
  interface __DictionaryRegistry {
    test: {};
  }

  interface __DeclaredLocalesRegistry {
    en: 1;
  }

  interface __RequiredLocalesRegistry {}

  interface __StrictModeRegistry {
    mode: 'inclusive';
  }

  interface __SchemaRegistry {
    test: {};
  }

  interface __EditorRegistry {
    enabled: false;
  }

  // Left empty so the `Resolved*` routing types exercise their fallback
  // branches, the way an ungenerated project sees them.
  interface __RoutingRegistry {}
}
