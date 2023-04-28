import React from "react";
import { IBook } from "./models/interfaces/IBook";
import "./styles/marginalia.css";
import VolumeComponent from "./volume.component";

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
            {analysis.summary.map((summary) => (
              <p>{summary.notes}</p>
            ))}
          </div>
          <div id="volumes" className="row justify-content-center mt-4">
            {analysis ? (
              analysis.volumes.map((volume, index) => (
                <VolumeComponent volume={volume} key={index} />
              ))
            ) : (
              <div>''</div>
            )}
            <div className="addVolume text-center">
              <a className="baBackLink" onClick={() => console.log("New vol")}>
                + new +
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marginalia;
