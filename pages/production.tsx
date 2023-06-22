import { useContext } from "react";
import NumList from "@/components/NumList";
import ResultList from "@/components/ResultList";
import Head from "next/head";
import { Divider } from "semantic-ui-react";

export default function Production() {
  return (
    <>
      <Head>
        <title>로또번호 생성 | 번호생성기</title>
        <meta
          name="description"
          content="제외할 번호를 선택하고 나머지 숫자들에서 랜덤하게 로또번호를 생성 할 수 있습니다."
        ></meta>
      </Head>
      <main className="main">
        <NumList />
        <Divider />
        <ResultList />
      </main>
      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
