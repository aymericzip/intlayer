export const useMarkdown = () => {
  const renderMarkdown = (content: string): string => {
    // Basic markdown rendering - in a real implementation, you'd use a markdown parser
    return content;
  };

  return {
    renderMarkdown,
  };
};
