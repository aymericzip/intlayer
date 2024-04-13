export const contentRender = async (content: string) => {
  const isEditable = process.env.NODE_ENV === 'development';

  const { ContentEditor } = await import('./index');

  if (isEditable && ContentEditor) {
    return (<ContentEditor>{content}</ContentEditor>) as unknown as string;
  }

  return content;
};
