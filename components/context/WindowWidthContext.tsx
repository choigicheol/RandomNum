import { createContext } from "react";

interface WindowWidthContextType {
  windowWidth: number;
}

const WindowWidthContext = createContext<WindowWidthContextType>({
  windowWidth: 0,
});

export default WindowWidthContext;
