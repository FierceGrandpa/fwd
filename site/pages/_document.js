import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

import { site } from 'data';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru" dir="ltr">
        <Head>
          <meta charSet="utf-8" />

          <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet" />

          <title>{site.seo.title}</title>

          <meta name="description" content={site.seo.description} />
          <meta name="keywords" content={site.seo.keywords} />

          <meta name="author" content={site.author} />

          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <meta name="theme-color" content="#ff6400" />

          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
