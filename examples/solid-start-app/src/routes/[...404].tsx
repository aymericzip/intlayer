import { Title } from '@solidjs/meta';
import { HttpStatusCode } from '@solidjs/start';
import { useIntlayer } from 'solid-intlayer';
import { LocalizedLink } from '~/components/LocalizedLink';

export default function NotFound() {
  const content = useIntlayer('not-found-page');

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
