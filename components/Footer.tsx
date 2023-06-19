import React from "react";
import { Divider } from "semantic-ui-react";

function Footer() {
  return (
    <div className="main">
      <div className="mail">
        {`문의 : `}
        <a href="mailto:gigichoi0916@gmail.com" title="문의하기 이메일 주소">
          gigichoi0916@gmail.com
        </a>
      </div>
      <div>
        <a href="https://www.flaticon.com/kr/free-icons/1-" title="1번 아이콘">
          icon 출처
        </a>
      </div>
      <style jsx>{`
        .main {
          display: flex;
          height: 60px;
          align-items: center;
          padding: 10px;
          margin-top: 14px;
        }
        .mail {
          flex: 1;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Footer;
