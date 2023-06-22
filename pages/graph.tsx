import React, { useState, useEffect } from "react";
import db from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { ResultProps } from "@/src/interface/interface";
import GraphBar from "@/components/GraphBar";
import Head from "next/head";

interface numObjData {
  [key: number]: number;
}

function Graph({ result }: ResultProps) {
  const keyArr = Array.from({ length: 45 }, (_, index) => index + 1);
  const [total, setTotal] = useState<numObjData>({});
  const [totalCount, setTotalCount] = useState<number>(0);

  const [start, setStart] = useState<string>("1");
  const [end, setEnd] = useState<string>("");

  useEffect(() => {
    const lastResult = Object.keys(result);
    setEnd(lastResult[lastResult.length - 1]);
  }, [result]);

  const handleButton = (e: any) => {
    e.preventDefault();
    const numObj: numObjData = {};
    const resultKeyArr = Object.keys(result);
    const lastKey = Number(resultKeyArr[resultKeyArr.length - 1]);
    let count = parseInt(start);
    while (result[count] && count <= parseInt(end)) {
      result[count].map((num) => {
        if (numObj[num]) numObj[num]++;
        else numObj[num] = 1;
      });
      count++;
    }
    setTotal(numObj);
    if (parseInt(start) < 0) setStart("1");
    if (parseInt(end) > lastKey) setEnd(lastKey.toString());
    const diff = parseInt(end) - parseInt(start) + 1;
    setTotalCount(diff);
  };

  const inputHandle = (e: any) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);

    // Update the state with the formatted value
    if (e.target.name === "start") {
      setStart(numericValue.toString());
    } else {
      setEnd(numericValue.toString());
    }
  };

  return (
    <div>
      <Head>
        <title>로또 번호 생성</title>
        <meta
          name="description"
          content={
            "특정 회차 기간동안 번호별로 1등 당첨번호 등장 횟수를 알려줍니다."
          }
        ></meta>
      </Head>
      <div className="input-box">
        <div>시작</div>
        <input
          value={start}
          type="number"
          name="start"
          onChange={(e) => inputHandle(e)}
        />
        <div>종료</div>
        <input
          value={end}
          type="number"
          name="end"
          onChange={(e) => inputHandle(e)}
        />
        <button onClick={(e) => handleButton(e)}>검색</button>
      </div>
      {total &&
        keyArr.map((keyValue) => (
          <GraphBar
            key={keyValue}
            keyValue={keyValue}
            width={`${(total[keyValue] / totalCount) * 100 || 0}%`}
            count={total[keyValue]}
          />
        ))}
      <style jsx>{`
        .input-box {
          display: flex;
          align-items: center;
          width: 100%;
          height: 50px;
        }
        .input-box input {
          width: 100px;
          height: 30px;
          margin-right: 20px;
        }
        .input-box div {
          margin-right: 10px;
        }
        .input-box button {
          background-color: #2185d0;
          color: #ffffff;
          border: none;
          width: 50px;
          height: 30px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Graph;

export const getServerSideProps: GetServerSideProps = async () => {
  const ref = doc(db, "firstNums", "data");
  let res = await getDoc(ref);
  return {
    props: {
      result: res.data(),
    },
  };
};
