export const truncateText3 = (str) => {
  if (str.length < 150) return str;
  return str.substring(0, 150) + "...";
};
