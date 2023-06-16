import Head from "next/head";
import React from "react";

function Search() {
  return (
    <>
      <Head>
        <title>로또 번호 랜덤 생성</title>
        <meta
          name="description"
          content={
            "생성한 로또 번호가 과거 1등 당첨번호중에 있었는지 확인 해 볼 수 있습니다."
          }
        ></meta>
      </Head>
      <div className="flexCenter">준비 중</div>
      <style jsx>{`
        .flexCenter {
          display: flex;
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </>
  );
}

export default Search;
