import React, { useContext } from "react";
import Head from "next/head";
import { Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import WindowWidthContext from "@/components/context/WindowWidthContext";

export default function Home() {
  const { windowWidth } = useContext(WindowWidthContext);
  const router = useRouter();
  const metaContent =
    "제외할 번호를 선택해 로또 번호를 랜덤으로 생성합니다. 특정 기간 동안 번호별 등장 횟수를 알려줍니다.";

  const moveBtnStyle = {
    width: "150px",
    height: "40px",
    fontColor: "rgba(255,255,255,.9)",
    backgroundColor: "#1b1c1d",
    fontSize: "16px",
    borderRadius: "5px",
  };

  const mainExplanations = [
    "제외한 숫자가 당첨번호일 확률이 있기 때문에 숫자를 제외한다고 해서 확률이 올라가지는 않습니다.",
    "당첨 확률은 로또 판매점에서 자동을 구매하는것과 같습니다.",
    "내키지 않는 번호조합을 거를 수 있게 하기 위해 만들었습니다.",
    "예를 들어 '이번주엔 40번대 번호가 나오지 않을거같다' 라면 40번대를 제외하고 랜덤으로 번호를 생성할 수 있습니다.",
    "혹은 좋아하지않는 숫자를 제외할 때 사용하시면 좋겠습니다.",
  ];

  const subExplanations = [
    {
      id: 1,
      imgClass: "w750",
      mobileImgClass: "w300",
      src: "./explanation1.png",
      alt: "사용설명1",
      contents: ["숫자를 클릭해 제외할 번호를 선택합니다."],
    },
    {
      id: 2,
      imgClass: "w750",
      mobileImgClass: "w300",
      src: "./explanation2.png",
      alt: "사용설명2",
      contents: [
        "체크박스를 이용해 해당하는 줄 전체를 선택 할 수 있습니다.",
        "제외할 숫자 선택이 끝나면 번호생성 버튼을 누릅니다.",
      ],
    },
    {
      id: 3,
      imgClass: "w500",
      mobileImgClass: "w250",
      src: "./explanation3.png",
      alt: "사용설명3",
      contents: [
        "선택한 숫자를 제외한 무작위 6개의 숫자 조합을 생성합니다.",
        "생성된 숫자 조합의 홀수, 짝수비율을 알려줍니다.",
        "복사 버튼을 누르면 해당하는 숫자 6개가 복사됩니다.",
      ],
    },
    {
      id: 4,
      imgClass: "w500",
      mobileImgClass: "w250",
      src: "./explanation4.png",
      alt: "사용설명4",
      contents: [
        "랜덤으로 생성한 번호를 전회차 1등비교 페이지에서 일치여부를 확인할 수 있습니다.",
        "검색버튼을 누르면 전체 회차 1등 번호와 일치여부를 검색합니다.",
        "일치하는 회차가 있다면 000회 와 같이 해당하는 회차를 알려줍니다.",
        "일치하는 회차가 없다면 x로 나타납니다.",
      ],
    },
    {
      id: 5,
      imgClass: "w500",
      mobileImgClass: "w250",
      src: "./explanation5.png",
      alt: "사용설명5",
      contents: [
        "특정 회차동안 번호별로 1등 당첨번호에 등장한 횟수를 알려줍니다.",
        "시작회차, 종료회차를 입력하고 검색을 누르면 해당 기간동안의 결과를 그래프로 보여줍니다.",
      ],
    },
  ];

  const moveProductionPage = () => {
    router.push("/production");
  };

  return (
    <>
      <Head>
        <title>로또 번호 생성</title>
        <meta name="description" content={metaContent}></meta>
      </Head>
      <main className="main">
        <h1>이용하기전에</h1>
        <div>
          <ul>
            {mainExplanations.map((ex, idx) => (
              <li className="ex-list" key={idx}>
                {ex}
              </li>
            ))}
          </ul>
        </div>
        <Divider />
        {subExplanations.map((ex) => {
          return (
            <React.Fragment key={ex.id}>
              <div className="explanation">
                <ul className="w100">
                  {ex.contents.map((text, idx) => (
                    <li className="ex-list" key={idx}>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="image-container">
                <img
                  className={
                    windowWidth >= 700 ? ex.imgClass : ex.mobileImgClass
                  }
                  src={ex.src}
                  alt={ex.alt}
                />
              </div>
              <Divider />
            </React.Fragment>
          );
        })}

        <div className="flex-center">
          <Button
            style={moveBtnStyle}
            name="시작하기"
            onClick={() => moveProductionPage()}
          />
        </div>
        <style jsx>{`
          .main {
            display: flex;
            flex-direction: column;
            width: 100%;
            /* align-items: center; */
          }
          .explanation {
            display: flex;
            justify-content: center;
            width: 100%;
          }
          .w750 {
            width: 750px;
            height: auto;
          }
          .w300 {
            width: 300px;
            height: auto;
          }
          .w500 {
            width: 500px;
            height: auto;
          }
          .w250 {
            width: 250px;
            height: auto;
          }
          .w100 {
            width: 100%;
            height: auto;
          }
          .flex-center {
            display: flex;
            width: 100%;
            justify-content: center;
          }
          .ex-list {
            margin-bottom: 5px;
          }
          .image-container {
            display: flex;
            width: 100%;
            justify-content: center;
          }
        `}</style>
      </main>
    </>
  );
}
