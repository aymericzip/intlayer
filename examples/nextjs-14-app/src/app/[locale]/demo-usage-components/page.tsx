import { ClientComponentExample } from '@components/ClientComponentExample';
import { LocaleSwitcher } from '@components/LangSwitcherDropDown';
import { NestedServerComponentExample } from '@components/NestedServerComponentExample';
import { ServerComponentExample } from '@components/ServerComponentExample';
import type { Next14PageIntlayer } from 'next-intlayer';

const PageDemoUsageComponents: Next14PageIntlayer = () => {
  return (
    <>
      <main className="m-auto flex size-screen max-w-xl flex-col items-center justify-center gap-8 p-20">
        <ClientComponentExample />
        <ServerComponentExample />
        <NestedServerComponentExample />
      </main>
      <div className="absolute right-5 bottom-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
};
export default PageDemoUsageComponents;
