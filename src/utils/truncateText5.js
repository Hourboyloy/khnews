export const truncateText5 = (str) => {
  if (str.length < 75) return str;
  return str.substring(0, 75) + "...";
};
