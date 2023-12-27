import axios from "axios";

export const getAllPosts = async () => {
  try {
    const { data, headers } = await axios.get("/api/posts");
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getSinglePosts = async ({ slug }) => {
  try {
    const { data, headers } = await axios.get(`/api/posts/${slug}`);
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
