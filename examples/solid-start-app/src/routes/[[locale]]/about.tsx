import { Meta, Title } from '@solidjs/meta';
import { useIntlayer } from 'solid-intlayer';

export default function About() {
  const content = useIntlayer('about-page');

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </main>
  );
}
