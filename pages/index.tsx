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
  // return <Pricing products={products} />;

  const router = useRouter();
  const meta = {
    title: 'I Ching: Book of Changes',
    description: 'Consult the Book of Changes, get a daily I Ching hexagram and reading.',
    cardImage: '/og.png',
    ...pageMeta
  };
  return (
    <div>
        <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        {/* <meta
          property="og:url"
          content={`https://subscription-starter.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} /> */}
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
