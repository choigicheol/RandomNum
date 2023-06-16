import { createContext } from "react";

interface ResultContextType {
  numbers: number[][];
  addNumbers: (arr: number[]) => void;
  resetNumbers: () => void;
  deleteNumbers: (idx: number) => void;
}

const ResultContext = createContext<ResultContextType>({
  numbers: [],
  addNumbers: () => {},
  resetNumbers: () => {},
  deleteNumbers: () => {},
});

export default ResultContext;
