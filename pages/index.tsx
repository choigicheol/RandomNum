import Head from "next/head";

export default function Home() {
  const metaContent =
    "로또 번호에서 제외할 번호를 선택하고 나머지 숫자들에서 랜덤하게 6개의 숫자를 얻을 수 있습니다.";

  return (
    <>
      <Head>
        <title>로또 번호 랜덤 생성</title>
        <meta name="description" content={metaContent}></meta>
      </Head>
      <main className="main">{"메인화면"}</main>
      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
