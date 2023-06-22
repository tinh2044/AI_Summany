import axios, { AxiosResponse } from "axios";

const options = {
  method: "GET",
  url: "summarize",
  params: {
    url: "https://time.com/6266679/musk-ai-open-letter/",
    length: "3",
  },
  headers: {},
};

const api = axios.create({
  baseURL: "https://article-extractor-and-summarizer.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
});
const getSummary = async (url = "", length = 3) => {
  const response: AxiosResponse = await api.get<{ data: string }>(
    "/summarize",
    {
      params: {
        url,
        length,
      },
    }
  );

  try {
    return response;
  } catch (error) {
    return error;
  }
};

export default getSummary;
