import React, { useCallback, useEffect, useState, useContext } from "react";
import Num from "./Num";
import ResultContext from "./context/ResultContext";
import GetNumberBtn from "./GetNumberBtn";
import ResetBtn from "./ResetBtn";

function NumList() {
  const [list, setList] = useState<boolean[][]>([]);
  const { addNumbers } = useContext(ResultContext);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    listReset();
  }, []);

  const listReset = () => {
    setList(
      Array.from({ length: 9 }, (_) => false).map((el) =>
        Array.from({ length: 5 }, (_) => false)
      )
    );

    setIsRow([isRow[0], isRow[1].map((el) => false)]);
  };

  const numberSelectHandle = (num: number, row: number) => {
    const copyList = [...list];
    let q = num % 5;
    if (q === 0) q = 4;
    else q -= 1;
    if (copyList[row] !== undefined) copyList[row][q] = !copyList[row][q];
    setList(copyList);
  };

  const [error, setError] = useState(false);

  const makeResultNumbers = (): void => {
    if (error) setError(false);
    let resultNumbers: number[] = [];

    list.map((el, idx) => {
      el.map((boolean, index) => {
        if (!boolean) resultNumbers.push(idx * 5 + index + 1);
      });
    });

    if (resultNumbers.length < 6) return setError(true);

    for (let i = 0; i < 3; i++) {
      resultNumbers = getMixNumbers(resultNumbers);
    }

    addNumbers(resultNumbers.slice(0, 6).sort((a, b) => a - b));
  };

  const getMixNumbers = useCallback((arrNum: number[]): number[] => {
    const result: number[] = [];
    for (let i = 45; i > 0; i--) {
      const random = Math.random() * i;
      const floorRandomNum = Math.floor(random);
      result.push(...arrNum.splice(floorRandomNum, 1));
    }
    return result;
  }, []);

  const [isRow, setIsRow] = useState<boolean[][]>(
    Array.from({ length: 2 }, (_) => false).map((el) =>
      Array.from({ length: 9 }, (_) => false)
    )
  );

  useEffect(() => {
    if (list[0]) {
      const copyList = [...list];
      isRow[1].map((bool, idx) => {
        if (bool !== isRow[0][idx]) {
          if (bool) {
            for (let num = 0; num <= 4; num++) {
              copyList[idx][num] = true;
            }
          } else {
            for (let num = 0; num <= 4; num++) {
              copyList[idx][num] = false;
            }
          }
        }
      });
      setList(copyList);
    }
  }, [isRow]);

  const rowSelectHandle = (row: number) => {
    let [prev, cur] = [...isRow];
    prev = [...cur];
    cur[row] = !cur[row];
    if (windowWidth >= 700 && row < 8) {
      cur[row + 1] = cur[row];
    }
    setIsRow([prev, cur]);
  };

  return (
    <>
      <ResetBtn listReset={listReset} />
      <div className="num-list">
        {list.map((el, idx) => {
          return (
            <React.Fragment key={idx}>
              <input
                className={idx % 2 ? "oddRow" : ""}
                type="checkbox"
                checked={isRow[1][idx]}
                onChange={() => rowSelectHandle(idx)}
              />
              {el.map((boolean, index) => {
                const num = 5 * idx + index + 1;
                return (
                  <Num
                    key={index}
                    num={num}
                    row={idx}
                    isSelect={boolean}
                    numberSelectHandle={numberSelectHandle}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className="error">숫자를 6개 이상 골라주세요</div>
      <GetNumberBtn makeResultNumbers={makeResultNumbers} />
      <style jsx>{`
        .num-list {
          /* width: 100%; */
          min-height: 330px;
          display: grid;
          grid-template-columns: repeat(11, 1fr);
          place-items: center;
          /* gap: 20px; */
          margin: 30px 0;
          @media screen and (max-width: 700px) {
            grid-template-columns: repeat(6, 1fr);
            gap: 5px;
            min-height: 490px;
          }
        }
        .error {
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: center;
          color: red;
          opacity: ${error ? 1 : 0};
        }
        .oddRow {
          display: ${windowWidth < 700 ? "inline" : "none"};
        }
      `}</style>
    </>
  );
}

export default NumList;
