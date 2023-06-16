import React from "react";
import Head from "next/head";
import { Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();
  const metaContent =
    "1~45의 숫자중에 6개의 번호를 무작위로 만듭니다. 1~45에서 제외할 번호를 선택할 수 있습니다. 만들어진 숫자 조합이 과거 1등 당첨번호중에 있었는지 확인할 수 있습니다.";

  const navStyle = {
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
      src: "./explanation1.png",
      alt: "사용설명1",
      contents: ["숫자를 클릭해 제외할 번호를 선택합니다."],
    },
    {
      id: 2,
      imgClass: "w750",
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
      src: "./explanation3.png",
      alt: "사용설명3",
      contents: [
        "선택한 숫자를 제외한 무작위 6개의 숫자 조합을 생성합니다.",
        "생성된 숫자 조합의 홀수, 짝수비율을 알려줍니다.",
        "복사 버튼을 누르면 해당하는 숫자 6개가 복사됩니다.",
      ],
    },
  ];

  const moveProductionPage = () => {
    router.push("/production");
  };

  return (
    <>
      <Head>
        <title>로또 번호 랜덤 생성기</title>
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
              <img className={ex.imgClass} src={ex.src} alt={ex.alt} />
              <Divider />
            </React.Fragment>
          );
        })}

        <div className="flex-center">
          <Button
            style={navStyle}
            name="시작하기"
            onClick={() => moveProductionPage()}
          />
        </div>
        <style jsx>{`
          .main {
            display: flex;
            flex-direction: column;
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
            @media screen and (max-width: 700px) {
              width: 300px;
              height: auto;
            }
          }
          .w500 {
            width: 500px;
            height: auto;

            @media screen and (max-width: 700px) {
              width: 250px;
              height: auto;
            }
          }
          .w100 {
            width: 100%;
          }
          .flex-center {
            display: flex;
            width: 100%;
            justify-content: center;
          }
          .ex-list {
            margin-bottom: 5px;
          }
        `}</style>
      </main>
    </>
  );
}
