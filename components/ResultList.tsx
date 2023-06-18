import React, { useContext, useState } from "react";
import numbersContext from "./context/ResultContext";
import Num from "./Num";
import Button from "./Button";
import CountOddEven from "./CountOddEven";
import { Divider } from "semantic-ui-react";
import WindowWidthContext from "./context/WindowWidthContext";
import { Loader } from "semantic-ui-react";
import { Find } from "@/pages/search";

interface Props {
  numbers: number[][];
  isSearch?: boolean;
  search?: (idx: number) => void;
  searchId?: number[];
  findDrwNo?: Find;
}

function ResultList({ numbers, isSearch, search, searchId, findDrwNo }: Props) {
  const { deleteNumbers } = useContext(numbersContext);
  const [copyId, setCopyId] = useState<number | null>(null);
  const { windowWidth } = useContext(WindowWidthContext);

  const deleteStyle = {
    width: "35px",
    height: "20px",
    fontColor: "#ffffff",
    backgroundColor: "#d01919",
    fontSize: "12px",
    borderRadius: "5px",
  };

  const copyStyle = {
    ...deleteStyle,
    backgroundColor: "#2185d0",
  };

  const searchStyle = {
    ...deleteStyle,
    backgroundColor: "#2185d0",
  };

  const copyHandle = (idx: number) => {
    setCopyId(idx);
    navigator.clipboard.writeText(numbers[idx].join(", "));
    setTimeout(() => {
      setCopyId(null);
    }, 1000);
  };

  return (
    <div>
      {!numbers.length && isSearch && <div>번호를 생성해주세요.</div>}
      {numbers.map((el, idx) => (
        <div
          key={idx}
          className={
            windowWidth >= 700 ? "result-container" : "result-container column"
          }
        >
          <div className="result-number">
            {el.map((num, idx) => (
              <Num key={idx} num={num} row={idx} />
            ))}
          </div>
          <div className="result-bottom">
            {isSearch ? (
              <div className="search-button">
                {searchId && searchId.indexOf(idx) !== -1 ? (
                  <Loader active inline size="small" />
                ) : findDrwNo && findDrwNo[idx] ? (
                  <div className="search-result">
                    {findDrwNo[idx].length ? findDrwNo[idx] + "회" : "x"}
                  </div>
                ) : search !== undefined ? (
                  <Button
                    style={searchStyle}
                    name="검색"
                    onClick={() => search(idx)}
                  ></Button>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <>
                <CountOddEven resultNumbers={el} />
                <div className="delete-button">
                  <Button
                    style={deleteStyle}
                    name="삭제"
                    onClick={() => deleteNumbers(idx)}
                  />
                </div>
                <div>
                  <Button
                    style={copyStyle}
                    name="복사"
                    onClick={() => copyHandle(idx)}
                  />
                </div>
                <div className={`copyIcon ${copyId === idx ? "opacity1" : ""}`}>
                  V
                </div>
              </>
            )}
          </div>
          <Divider />
        </div>
      ))}
      <style jsx>{`
        .result-container {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
        .column {
          flex-direction: column;
        }
        .result-number {
          display: flex;
          align-items: center;
          margin: 15px 0;
        }
        .result-bottom {
          display: flex;
          align-items: center;
        }
        .delete-button {
          margin-right: 10px;
        }
        .copyIcon {
          width: 15px;
          height: 15px;
          text-align: center;
          line-height: 15px;
          color: #ffffff;
          border-radius: 20%;
          background-color: #2185d0;
          font-weight: bold;
          margin-left: 10px;
          opacity: 0;
          transition: opacity 300ms ease-out;
        }
        .opacity1 {
          opacity: 1;
          transition: opacity 300ms ease-in-out;
        }
        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          margin-left: 10px;
        }
        .search-result {
          color: #2185d0;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default ResultList;
