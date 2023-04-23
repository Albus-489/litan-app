import React from "react";
import { createBook } from "./funcs/createBook";
import { IBook } from "./models/interfaces/IBook";
import { Book } from "./models/Books";
const boockCover = require("./images/bookCover.png");

type marginaliaProps = {
  setContentVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  analysis: IBook;
};

const Marginalia: React.FC<marginaliaProps> = ({
  setContentVisibility,
  analysis,
}) => {
  const handleClose = () => {
    setContentVisibility(true);
  };

  return (
    <div className="marginalia mt-5">
      <div className="container">
        <button onClick={handleClose} className="btn btn-danger btn-lg">
          Close{" "}
        </button>
        <h1>
          <span>
            Analysis of "{analysis.name}" {analysis.author}
          </span>
          <p>{analysis.id}</p>
        </h1>
      </div>
    </div>
  );
};

export default Marginalia;
