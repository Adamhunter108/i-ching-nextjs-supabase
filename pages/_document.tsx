import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth bg-black antialiased">
        <Head 
        >
            <meta charSet="utf-8" />
            <link rel="icon" type="image/ico" href="/favicon.ico" />
            <meta name="robots" content="index, follow" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#000000" />

                {/* OPEN GRAPH */}
            <meta property="og:site_name" content="I Ching: the Book of Changes" key="ogsitename" />
            <meta property="og:title" content="I Ching: the Book of Changes" key="og:title" />
            <meta property="og:description" content="Consult the Book of Changes with an I Ching reading and save and share your readings." key="ogdesc" />
            <meta property="og:url" content="https://www.bookofchanges.app" key="ogurl" />
            <meta property="og:image" content="https://www.bookofchanges.app/icon-192x192.png" key="ogimage" />
            <meta property="og:type" content="web-app" />

            <link rel="canonical" href="https://www.bookofchanges.app/" />

                {/* FAVICONS  */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />

                {/* GOOGLE FONT CDN */}
            <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400&display=swap" rel="stylesheet" />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
