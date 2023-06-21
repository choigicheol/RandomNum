import Head from "next/head";
import React from "react";
import db from "../firebaseConfig";
import * as XLSX from "xlsx";
import { doc, setDoc } from "firebase/firestore";

// Add a new document in collection "cities"

export default function AddServerData() {
  const readExcel = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      if (!e.target) return;
      const bufferArray = e.target.result;
      const fileInformation = XLSX.read(bufferArray, {
        type: "buffer",
        cellText: false,
        cellDates: true,
      });
      const sheetName = fileInformation.SheetNames[0];
      const rawData = fileInformation.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(rawData);
      try {
        for (let i = 0; i < data.length; i++) {
          const {
            drwNo,
            date,
            drwNo1,
            drwNo2,
            drwNo3,
            drwNo4,
            drwNo5,
            drwNo6,
          } = data[i];
          await setDoc(
            doc(db, "firstNums", "data"),
            {
              [drwNo]: [drwNo1, drwNo2, drwNo3, drwNo4, drwNo5, drwNo6],
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.error("Error posting data to Firestore:", error);
      }
    };
  };

  const handleExcelFileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    readExcel(file);
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
        <input type="file" onChange={(e) => handleExcelFileChange(e)}></input>
      </div>
      <style jsx>{`
        .flex-center {
          display: flex;
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
