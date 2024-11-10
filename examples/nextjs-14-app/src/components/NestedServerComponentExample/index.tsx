/**
 * Break if this parent component is marked as "use client"
 */

import type { FC } from 'react';
import { ClientWrapper } from './ClientWrapper';
import { NestedServerComponent } from './NestedServerComponent';

export const NestedServerComponentExample: FC = () => (
  <ClientWrapper>
    {/**
     * Server component works if wrapped in a client component via children prop.
     */}
    <NestedServerComponent />
  </ClientWrapper>
);
