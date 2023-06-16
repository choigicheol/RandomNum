import { createContext } from "react";

interface ListContextType {
  numList: boolean[];
  setNumList: () => void;
  excludeNum: (num: number) => void;
}

const ListContext = createContext<ListContextType>({
  numList: Array.from({ length: 45 }, (_) => false),
  setNumList: () => {},
  excludeNum: () => {},
});

export default ListContext;
