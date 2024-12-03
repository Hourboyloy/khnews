import axios from "axios";

export const getArticleById = async (id) => {
  try {
    const res = await axios.get(
      `https://api-school-amber.vercel.app/api/getone/${id}`
    );
    if (res.status === 200) {
      return res.data.news;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllArticles = async () => {
  try {
    const res = await axios.get(
      "https://api-school-amber.vercel.app/api/user-get-all"
    );
    if (res.status === 200) {
      return res.data.listNews;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPopularArticles = (articles) => {
  return [...articles].sort((a, b) => b.viewer - a.viewer);
};

export const getNewestArticles = (articles) => {
  return [...articles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const getArticlesByCategory = (articles, category) => {
  return articles.filter((item) => item.category === category);
};
