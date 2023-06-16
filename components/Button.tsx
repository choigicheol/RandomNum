import React from "react";

interface styleProps {
  width: string;
  height: string;
  fontColor?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

interface Props {
  style: styleProps;
  name: string;
  onClick: () => void;
}

function Button({ style, name, onClick }: Props) {
  return (
    <button className="button" onClick={() => onClick()}>
      {name}
      <style jsx>{`
        .button {
          width: ${style.width};
          height: ${style.height};
          color: ${style.fontColor || "#000000"};
          background: ${style.backgroundColor || "none"};
          border-radius: ${style.borderRadius || "10%"};
          border: none;
          font-size: ${style.fontSize || "16px"};
          cursor: pointer;
          padding: 2px;
          border-size: box-sizing;
        }
      `}</style>
    </button>
  );
}

export default Button;
