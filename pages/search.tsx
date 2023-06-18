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

export interface Find {
  [key: string]: string[];
}

function Search({ result }: any) {
  const { numbers } = useContext(numbersContext);
  const [searchId, setSearchId] = useState<number[]>([]);
  const [findDrwNo, setFindDrwNo] = useState<Find>({});

  const find = (idx: number) => {
    return Object.keys(result).filter(
      (el: string) => result[el].join("") === numbers[idx].join("")
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

// import Head from "next/head";
// import { useEffect } from "react";
// import React from "react";
// import db from "../firebaseConfig";
// import * as XLSX from "xlsx";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// // Add a new document in collection "cities"

// function Search() {
//   const readExcel = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(file);
//     fileReader.onload = async (e) => {
//       if (!e.target) return;
//       const bufferArray = e.target.result;
//       const fileInformation = XLSX.read(bufferArray, {
//         type: "buffer",
//         cellText: false,
//         cellDates: true,
//       });
//       const sheetName = fileInformation.SheetNames[0];
//       const rawData = fileInformation.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(rawData);
//       try {
//         for (let i = 0; i < data.length; i++) {
//           const {
//             drwNo,
//             date,
//             drwNo1,
//             drwNo2,
//             drwNo3,
//             drwNo4,
//             drwNo5,
//             drwNo6,
//           } = data[i];
//           await setDoc(
//             doc(db, "firstNums", "data"),
//             {
//               [drwNo]: [drwNo1, drwNo2, drwNo3, drwNo4, drwNo5, drwNo6],
//             },
//             { merge: true }
//           );
//         }
//       } catch (error) {
//         console.error("Error posting data to Firestore:", error);
//       }
//     };
//   };

//   const handleExcelFileChange = (e) => {
//     if (!e.target.files) return;
//     const file = e.target.files[0];
//     readExcel(file);
//   };

//   return (
//     <>
//       <Head>
//         <title>로또 번호 랜덤 생성</title>
//         <meta
//           name="description"
//           content={
//             "생성한 로또 번호가 과거 1등 당첨번호중에 있었는지 확인 해 볼 수 있습니다."
//           }
//         ></meta>
//       </Head>
//       <div className="flex-center">
//         <input type="file" onChange={(e) => handleExcelFileChange(e)}></input>
//         준비 중
//       </div>
//       <style jsx>{`
//         .flex-center {
//           display: flex;
//           width: 100%;
//           justify-content: center;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Search;
