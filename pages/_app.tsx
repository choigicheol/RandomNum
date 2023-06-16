import "./global.css";
import "semantic-ui-css/semantic.min.css";
import { useCallback, useState } from "react";
import { AppProps } from "next/app";
import Top from "@/components/Top";
import NumberContext from "../components/context/ResultContext";
import Footer from "@/components/Footer";

function App({ Component, pageProps }: AppProps) {
  const [numbers, setNumbers] = useState<number[][]>([]);

  const addNumbers = (arr: number[]) => {
    setNumbers((prev) => [arr, ...prev]);
  };

  const resetNumbers = () => {
    setNumbers([]);
  };

  const deleteNumbers = (idx: number): void => {
    setNumbers(numbers.filter((el, index) => idx !== index));
  };

  return (
    <div className="container">
      <div className="center">
        <Top />
        <NumberContext.Provider
          value={{ numbers, addNumbers, resetNumbers, deleteNumbers }}
        >
          <Component {...pageProps} />
        </NumberContext.Provider>
        <Footer />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          justify-content: center;
          /* background-color: #ffffff; */
        }
        .center {
          max-width: 1000px;
          width: 100%;
          /* background-color: #000000; */
        }
      `}</style>
    </div>
  );
}

export default App;
