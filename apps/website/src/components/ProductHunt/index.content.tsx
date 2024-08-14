import { t, type DeclarationContent } from 'intlayer';
import React from 'react';

const productHuntContent: DeclarationContent = {
  id: 'product-hunt',
  title: 'Product Hunt',
  content: t({
    en: (
      <>
        Intlayer Launches This <strong>Friday, August 16th</strong> on{' '}
        <strong className="underline">Product Hunt</strong>
      </>
    ),
    fr: (
      <>
        Intlayer lance cette <strong>vendredi 16 août</strong> sur{' '}
        <strong className="underline">Product Hunt</strong>
      </>
    ),
    es: (
      <>
        Intlayer lanza esta <strong>viernes 16 agosto</strong> en{' '}
        <strong className="underline">Product Hunt</strong>
      </>
    ),
  }),
  details: t({
    en: 'Visit us on Product Hunt and show your support with an upvote. Your feedback is invaluable!',
    fr: 'Visitez-nous sur Product Hunt et montrez votre soutien avec un upvote. Votre feedback est inaliénable !',
    es: 'Visite con nosotros en Product Hunt y muestre su apoyo con un upvote. ¡Su feedback es inalcanzable!',
  }),
};

export default productHuntContent;
