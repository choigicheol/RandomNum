import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import React from "react";
import db from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
// Add a new document in collection "cities"
import numbersContext from "../components/context/ResultContext";
import ResultList from "@/components/ResultList";
import Button from "@/components/Button";
import { ResultProps } from "@/src/interface/interface";
export interface Find {
  [key: string]: string[];
}

function Search({ result }: ResultProps) {
  const { numbers } = useContext(numbersContext);
  const [searchId, setSearchId] = useState<number[]>([]);
  const [findDrwNo, setFindDrwNo] = useState<Find>({});

  const find = (idx: number) => {
    return Object.keys(result).filter(
      (el) => result[el].join("") === numbers[idx].join("")
    );
  };

  const search = (idx: number) => {
    const copy = [...searchId, idx];
    setSearchId(copy);
    const result = { ...findDrwNo };
    result[idx] = find(idx);
    setFindDrwNo(result);
    console.log(result);
    setTimeout(() => {
      const completeFind = [...searchId];
      completeFind.splice(completeFind.indexOf(idx), 1);
      setSearchId(completeFind);
    }, 1000);
  };

  const allSearchStyle = {
    width: "60px",
    height: "30px",
    fontColor: "#ffffff",
    backgroundColor: "#d01919",
    fontSize: "12px",
    borderRadius: "5px",
  };

  const allSearch = () => {
    setSearchId(numbers.map((el, idx) => idx));
    setTimeout(() => {
      const result = { ...findDrwNo };
      numbers.forEach((el, idx) => {
        result[idx] = find(idx);
      });
      setFindDrwNo(result);

      numbers.forEach((el, idx) => {
        setTimeout(() => {
          const completeFind = [...searchId];
          completeFind.splice(completeFind.indexOf(idx), 1);
          setSearchId(completeFind);
        }, idx * 1000);
      });
    }, 1500);
  };
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
      <div className="flex-center">
        <h2>
          생성한 번호가 과거 1등 당첨번호중에 있는지 확인 해 볼 수 있습니다.
        </h2>
        {numbers.length > 0 && (
          <Button
            style={allSearchStyle}
            name="전체 검색"
            onClick={() => allSearch()}
          ></Button>
        )}
        <ResultList
          numbers={numbers}
          isSearch={true}
          search={search}
          searchId={searchId}
          findDrwNo={findDrwNo}
        />
      </div>
      <style jsx>{`
        .flex-center {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ref = doc(db, "firstNums", "data");
  let res = await getDoc(ref);
  return {
    props: {
      result: res.data(),
    },
  };
};

export default Search;
