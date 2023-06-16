import React, { useContext, useState } from "react";
import numbersContext from "./context/ResultContext";
import Num from "./Num";
import Button from "./Button";
import CountOddEven from "./CountOddEven";
import { Divider } from "semantic-ui-react";

interface Props {
  numbers: number[];
}

function ResultList() {
  const { numbers, addNumbers, deleteNumbers } = useContext(numbersContext);
  const [copyId, setCopyId] = useState<number | null>(null);

  const deleteStyle = {
    width: "35px",
    height: "20px",
    fontColor: "#ffffff",
    backgroundColor: "#d01919",
    fontSize: "12px",
  };

  const copyStyle = {
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
      {numbers.map((el, idx) => (
        <div key={idx} className="result-container">
          <div className="result-number">
            {el.map((num, idx) => (
              <Num key={idx} num={num} row={idx} />
            ))}
          </div>
          <div className="result-bottom">
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
          @media (max-width: 700px) {
            flex-direction: column;
          }
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
      `}</style>
    </div>
  );
}

export default ResultList;
