import React, { useState } from "react";
import { createBook } from "./funcs/createBook";
import { IBook } from "./models/interfaces/IBook";
import { Book } from "./models/Books";
import "./styles/marginalia.css";
import VolumeComponent from "./volume.component";
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
        <h2>
          <a onClick={handleClose} className="baBackLink">
            &#8592; Back{" "}
          </a>
        </h2>
        <h1>
          <span>
            Analysis of "{analysis.name}" {analysis.author}
          </span>
        </h1>

        <div id="analysisContent">
          <div id="mainSummary">
            {analysis.summary.map((summary) => summary.notes)}
          </div>
          <div id="volumes" className="row justify-content-center mt-4">
            {analysis.volumes.map((volume, index) => (
              <VolumeComponent volume={volume} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marginalia;
