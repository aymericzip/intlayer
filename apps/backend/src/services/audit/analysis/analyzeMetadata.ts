export const analyzeMetadata = ($: any) => {
  const canonical = $("link[rel='canonical']").attr('href');
  const hasCanonicalTag = Boolean(canonical);

  return {
    hasCanonicalTag,
  };
};
