import { getBackgroundColor } from "@/src/util/function";
import React from "react";

interface Props {
  keyValue: number;
  width: string;
  count: number;
}

function GraphBar({ keyValue, count, width }: Props) {
  return (
    <>
      <div className="graph-bar">
        <div className="content">
          <div className="number">{keyValue}</div>
          {count && <div className="count">{count} 회</div>}
        </div>
      </div>
      <style jsx>{`
        .graph-bar {
          display: flex;
          width: 100%;
          height: 40px;
          align-items: center;

          justify-content: space-between;
          background-color: #eaeaea;
          margin: 5px 0;
          border-radius: 5px;
        }
        .content {
          display: flex;
          justify-content: space-between;
          height: 40px;
          line-height: 40px;
          width: ${width};
          background-color: ${getBackgroundColor(keyValue)};
          padding: 0 10px;
          border-radius: 5px;
          transition: width 0.3s linear;
          box-sizing: content-box;
        }
        .number {
          font-size: 14px;
          font-weight: bold;
        }
        .count {
          font-size: 12px;
        }
      `}</style>
    </>
  );
}

export default GraphBar;
