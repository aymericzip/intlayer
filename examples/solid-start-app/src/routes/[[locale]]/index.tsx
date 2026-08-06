import { Meta, Title } from '@solidjs/meta';
import { useIntlayer } from 'solid-intlayer';
import Counter from '~/components/Counter';

export default function Home() {
  const content = useIntlayer('home-page');

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
