import React from "react";

interface Props {
  resultNumbers: number[];
}

function CountOddEven({ resultNumbers }: Props) {
  const countEven = (arr: number[]): number[] => {
    let count = 0;
    arr.forEach((el) => (el % 2 ? count++ : null));
    return [6 - count, count];
  };
  const [even, odd] = countEven(resultNumbers);
  return (
    <div className="even-odd-container">
      <div className="even-odd-box">
        <div className="name">{"짝"}</div>
        <div className="count">{`: ${even}`}</div>
      </div>
      <div className="even-odd-box">
        <div className="name">{"홀"}</div>
        <div className="count">{`: ${odd}`}</div>
      </div>
      <style jsx>{`
        .even-odd-container {
          display: flex;
          margin: 0 20px;
        }
        .name {
          text-align: center;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 15%;
          background-color: #e2e2e2;
          margin-right: 5px;
        }
        .even-odd-box {
          display: flex;
          margin-right: 15px;
        }
      `}</style>
    </div>
  );
}

export default CountOddEven;
