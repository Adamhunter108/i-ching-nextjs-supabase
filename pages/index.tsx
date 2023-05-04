import { PropsWithChildren } from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageMeta } from 'types';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';


interface Props extends PropsWithChildren {
  meta?: PageMeta;
}

export default function HomePage({ meta: pageMeta }: Props) {

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

// Don't need getStaticProps() right now
// export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {

//   return {
//     props: {
      
//     },
//     revalidate: 60
//   };
// }
