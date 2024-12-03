export const truncateText4 = (str) => {
  if (str.length < 200) return str;
  return str.substring(0, 200) + "...";
};
