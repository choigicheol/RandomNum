import { Header } from "semantic-ui-react";
import NavBar from "./NavBar";

function Top() {
  return (
    <>
      <NavBar />
      <style jsx>{`
        .header {
          margin-top: 18px;
        }
      `}</style>
    </>
  );
}

export default Top;
