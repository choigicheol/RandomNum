import React, { useEffect } from "react";
import { getBackgroundColor } from "@/src/util/function";

interface Props {
  num: number;
  row: number;
  isSelect?: boolean;
  numberSelectHandle?: (num: number, row: number) => void;
}

function Num({ num, row, isSelect, numberSelectHandle }: Props) {
  return (
    <>
      {numberSelectHandle ? (
        <div className="num-box" onClick={() => numberSelectHandle(num, row)}>
          <span className="shadowed-text">{num}</span>
        </div>
      ) : (
        <div className="num-box result-num">
          <span className="shadowed-text">{num}</span>
        </div>
      )}
      <style jsx>{`
        .num-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${getBackgroundColor(num)};
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          opacity: ${isSelect ? 0.2 : 1};
          margin: 5px;
          @media screen and (max-width: 700px) {
            width: 30px;
            height: 30px;
            font-size: 18px;
          }
        }
        .shadowed-text {
          text-shadow: 2px 2px 4px rgba(35, 35, 35, 0.3);
          color: #ffffff;
        }
        .result-num {
          width: 30px;
          height: 30px;
          font-size: 16px;
          cursor: initial;
        }
      `}</style>
    </>
  );
}

export default Num;
