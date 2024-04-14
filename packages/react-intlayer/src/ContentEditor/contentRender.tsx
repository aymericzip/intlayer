import { ContentEditor } from './ContentEditor';

export const contentRender = (content: string) => {
  const isEditable = process.env.NODE_ENV === 'development';

  if (isEditable && ContentEditor) {
    return (<ContentEditor>{content}</ContentEditor>) as unknown as string;
  }

  return content;
};
