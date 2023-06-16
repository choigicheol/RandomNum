import React from "react";
import { Button } from "semantic-ui-react";

interface Props {
  makeResultNumbers: () => void;
}

function GetNumberBtn({ makeResultNumbers }: Props) {
  return (
    <>
      <div className="button-area">
        <Button
          color="blue"
          content="번호생성"
          onClick={() => makeResultNumbers()}
        />
      </div>
      <style jsx>{`
        .button-area {
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 10px 0;
        }
      `}</style>
    </>
  );
}

export default GetNumberBtn;
