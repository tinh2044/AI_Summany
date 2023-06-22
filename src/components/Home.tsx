import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import LinkCard from "./LinkCard";
import getSummary from "../services/getSummary";
import Summary from "./Summary";
import FormInput from "./FormInput";

export interface IArticle {
  url: string;
  summary: string;
  id?: string;
}

function Demo() {
  const [article, setArticle] = useState<IArticle>({
    url: "",
    summary: "",
  });
  const [error, setError] = useState(false);
  const [isCopy, setIsCopy] = useState("");
  const [articleHistory, setArticleHistory] = useState<Array<IArticle>>([]);
  console.log(articleHistory);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: any = await getSummary(article.url);
    if (response.status == 200) {
      const data = response.data.summary;

      const newArticle = {
        ...article,
        summary: data,
      };
      setArticle(newArticle);
      setError(false);
      // add new article into history
      let newArticleHistory: IArticle[];
      if (articleHistory.length == 3) {
        newArticleHistory = [
          ...articleHistory.slice(1),
          { ...article, id: uuid(), summary: data },
        ];
      } else {
        newArticleHistory = [
          ...articleHistory,
          { ...article, id: uuid(), summary: data },
        ];
      }
      localStorage.setItem(
        "historyOfAiSummary",
        JSON.stringify(newArticleHistory)
      );
      setArticleHistory(newArticleHistory);
    } else {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    const jsonString = localStorage.getItem("historyOfAiSummary");
    if (jsonString !== null) {
      setArticleHistory(JSON.parse(jsonString));
    }
  }, []);

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2 ">
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
          <FormInput
            article={article}
            setArticle={setArticle}
            handleSubmit={handleSubmit}
          />
          {articleHistory.map((item, index) => (
            <LinkCard
              isCopy={isCopy == item.id}
              setIsCopy={setIsCopy}
              key={index}
              setArticle={setArticle}
              article={item}
            />
          ))}
        </div>
      </div>
      <Summary article={article.summary} error={error} loading={loading} />
    </section>
  );
}

export default Demo;
