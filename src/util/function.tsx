export const getBackgroundColor = (num: number): string => {
  if (num <= 10) return "rgb(251, 196, 0)";
  else if (num <= 20) return "rgb(105, 200, 242)";
  else if (num <= 30) return "rgb(255, 114, 114)";
  else if (num <= 40) return "rgb(170, 170, 170)";
  else return "rgb(176, 216, 64)";
};
