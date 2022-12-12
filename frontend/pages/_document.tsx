import Document, { DocumentContext, DocumentInitialProps, Html, Main, NextScript, Head } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link
            href='https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'
            rel='stylesheet'
          />
          <link rel="stylesheet" href="/fonts/Browallia-New.css" />
          <link rel="stylesheet" href="/print.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument