import type { CreatePortalSessionResult } from '@intlayer/backend';
import {
  useCreatePortalSession,
  useGetInvoices,
  useGetPaymentMethod,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { CreditCard, Info } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDate } from 'react-intlayer/format';
import type Stripe from 'stripe';
import { Link } from '#components/Link/Link.tsx';

type BillingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const BillingModal: FC<BillingModalProps> = ({ isOpen, onClose }) => {
  const { billingModal } = useIntlayer('organization-plan');
  const { data: invoicesResponse, isLoading: isLoadingInvoices } =
    useGetInvoices({ enabled: isOpen });
  const invoices = invoicesResponse?.data;

  const { data: paymentMethodResponse, isLoading: isLoadingPaymentMethod } =
    useGetPaymentMethod({ enabled: isOpen });
  const paymentMethod = paymentMethodResponse?.data;

  const dateFormatter = useDate();

  const {
    mutate: handleUpdatePaymentMethod,
    isPending: isUpdatingPaymentMethod,
  } = useCreatePortalSession();

  const onUpdatePaymentMethod = () =>
    handleUpdatePaymentMethod(undefined, {
      onSuccess: (response: CreatePortalSessionResult | undefined) => {
        if (response?.data?.url) {
          window.location.href = response.data.url;
        }
      },
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      transparency="xs"
      padding="lg"
      title={billingModal.title.value}
      hasCloseButton
      isScrollable
    >
      <div className="flex flex-col gap-10">
        {/* Payment Section */}
        <section>
          <div className="flex items-start justify-between gap-lg">
            <h3 className="font-semibold text-text text-xl">
              {billingModal.paymentTitle}
            </h3>
          </div>
          <div className="divide-y divide-neutral pt-sm">
            <div className="flex w-full flex-row items-center justify-between gap-x-8 gap-y-3 py-4">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center text-neutral-400">
                  <CreditCard size={24} />
                </div>
                {isLoadingPaymentMethod ? (
                  <Loader className="ml-2 size-5" />
                ) : paymentMethod ? (
                  <p className="text-sm text-text">
                    {paymentMethod.card?.brand.charAt(0).toUpperCase() +
                      paymentMethod.card?.brand.slice(1)}{' '}
                    • • • • {paymentMethod.card?.last4}
                  </p>
                ) : (
                  <p className="text-neutral-400 text-sm">
                    {billingModal.noPaymentMethod}
                  </p>
                )}
              </div>
              <Button
                label={billingModal.updateButton.value}
                variant="default"
                color="text"
                size="sm"
                onClick={onUpdatePaymentMethod}
                isLoading={isUpdatingPaymentMethod}
              >
                {billingModal.updateButton}
              </Button>
            </div>
          </div>
        </section>

        {/* Invoices Section */}
        <section className="overflow-hidden">
          <div className="flex items-start justify-between gap-lg">
            <h3 className="font-semibold text-text text-xl">
              {billingModal.invoicesTitle}
            </h3>
          </div>
          <table className="w-full border-collapse pt-sm" aria-label="Invoices">
            <thead>
              <tr className="text-left">
                <th className="py-2 font-medium text-sm text-text">
                  {billingModal.dateHeader}
                </th>
                <th className="py-2 font-medium text-sm text-text">
                  {billingModal.totalHeader}
                </th>
                <th className="py-2 font-medium text-sm text-text">
                  {billingModal.statusHeader}
                </th>
                <th className="py-2 font-medium text-sm text-text">
                  {billingModal.actionsHeader}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-neutral/50">
              {isLoadingInvoices ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-neutral">
                    {billingModal.loadingInvoices}
                  </td>
                </tr>
              ) : !invoices || invoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-neutral">
                    {billingModal.noInvoices}
                  </td>
                </tr>
              ) : (
                invoices.map((invoice: Stripe.Invoice) => (
                  <tr key={invoice.id}>
                    <td className="truncate py-2 text-sm text-text">
                      {dateFormatter(invoice.created * 1000)}
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-1 text-sm text-text">
                        {(invoice.total / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: invoice.currency,
                        })}
                        <Info size={12} className="ml-2 text-neutral" />
                      </div>
                    </td>
                    <td className="py-2 text-sm text-text">
                      {invoice.status
                        ? invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)
                        : 'Unknown'}
                    </td>
                    <td className="py-2">
                      <Link
                        to={invoice.hosted_invoice_url ?? '#'}
                        target="_blank"
                        label={billingModal.viewLink.value}
                        rel="noopener noreferrer"
                        color="text"
                        className="text-sm"
                      >
                        {billingModal.viewLink}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </Modal>
  );
};
