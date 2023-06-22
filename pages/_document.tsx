import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="./favicon.ico" />
          <meta property="og:title" content="로또번호 생성" />
          <meta property="og:url" content="https://random-num.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="./ogImage.png" />
          <meta
            property="og:description"
            content="제외하고 싶은 숫자를 빼고 로또 번호를 랜덤으로 생성할 수 있습니다."
          />
          <meta
            name="google-site-verification"
            content="FtkcTgXFFwQdrE8MJ-fJJ9AAzAuXCeJVLgLSnEH9x3o"
          />
          <meta
            name="naver-site-verification"
            content="31c53d3ef48c280516db203ac501ba0a74874760"
          />
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
