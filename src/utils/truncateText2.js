export const truncateText2 = (str) => {
  if (str.length < 60) return str;
  return str.substring(0, 60) + "...";
};
