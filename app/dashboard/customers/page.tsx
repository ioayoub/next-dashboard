import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  const customers: FormattedCustomersTable[] =
    await fetchFilteredCustomers(query);

  //TODO : Change skeleton here

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    </div>
  );
}
