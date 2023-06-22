import React from "react";

import { IArticle } from "./Home";

import linkIcon from "../assets/link.svg";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  article: IArticle;
  setArticle: React.Dispatch<React.SetStateAction<IArticle>>;
};

function FormInput({ article, handleSubmit, setArticle }: Props) {
  return (
    <form
      action=""
      className=" flex items-center justify-center relative"
      onSubmit={handleSubmit}
    >
      <img
        src={linkIcon}
        alt="link icon"
        className="absolute w-5 left-0 my-2 ml-3"
      />
      <input
        type="url"
        placeholder="  Enter your URL here"
        value={article.url}
        onChange={(e) =>
          setArticle({
            ...article,
            url: e.target.value,
          })
        }
        required
        className="url_input peer"
      />

      <button
        type="submit"
        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
      >
        Submit
      </button>
    </form>
  );
}

export default FormInput;
