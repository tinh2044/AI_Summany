import React from "react";

import { IArticle } from "./Home";
import copy from "../assets/copy.svg";
import tick from "../assets/tick.svg";

type Props = {
  setArticle: React.Dispatch<React.SetStateAction<IArticle>>;
  article: IArticle;
  isCopy: boolean;
  setIsCopy: React.Dispatch<React.SetStateAction<string>>;
};

function LinkCard({ setArticle, article, isCopy, setIsCopy }: Props) {
  console.log(isCopy);
  const handleCopy = () => {
    setArticle(article);
    setIsCopy(article.id || "");

    navigator.clipboard.writeText(article.url);
  };
  return (
    <div onClick={handleCopy} className="link_card">
      <div className="copy_btn">
        <img
          src={isCopy ? tick : copy}
          alt="copy icon"
          className="w-[40%] h-[40%] object-contain"
        />
      </div>
      <p className="flex-1 text-blue-700 font-satoshi font-medium text-sm truncate">
        {article.url}
      </p>
    </div>
  );
}

export default LinkCard;
