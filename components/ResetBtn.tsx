import React from "react";
import { Button } from "semantic-ui-react";

interface Props {
  listReset: () => void;
}

function ResetBtn({ listReset }: Props) {
  return (
    <div className="button-area">
      <Button
        color="red"
        size="mini"
        content="전체리셋"
        onClick={() => listReset()}
      />
      <style jsx>{`
        .button-area {
          display: flex;
          justify-content: flex-end;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}

export default ResetBtn;
