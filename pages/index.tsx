import { PropsWithChildren } from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// import Pricing from '@/components/Pricing';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
import { Product } from 'types';
import { PageMeta } from 'types';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';

interface Props {
  products: Product[];
}

interface Props extends PropsWithChildren {
  meta?: PageMeta;
}

export default function PricingPage({ products, meta: pageMeta }: Props) {

  const router = useRouter();
  const meta = {
    title: 'I Ching: Book of Changes',
    description: 'Consult the Book of Changes with an I Ching reading and save and share your readings.',
    ...pageMeta
  };
  return (
    <div>
        <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
      </Head>
      <Nav />
      <Hero />
    </div>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
    revalidate: 60
  };
}
