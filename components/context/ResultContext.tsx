import { createContext } from "react";

interface ResultContextType {
  numbers: number[][];
  addNumbers: (arr: number[]) => void;
  resetNumbers: () => void;
  deleteNumbers: (idx: number) => void;
}

const ResultContext = createContext<ResultContextType>({
  numbers: [],
  addNumbers: (arr: number[]) => {},
  resetNumbers: () => {},
  deleteNumbers: (idx: number) => {},
});

export default ResultContext;
