import React from "react";
import { data } from "./data";
import { v4 as uuid4 } from "uuid";

const ArticleItem = () => {
  return (
    <div>
      {data.map((data) => {
        return (
          <div key={uuid4()} className="article-item">
            <img src={data.image} alt="" />
            <p>{data.text}</p>
            <h4 style={{ textAlign: "center" }}>By: {data.author}</h4>
            <div className="underline"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleItem;
