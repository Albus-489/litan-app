import React, { useState } from "react";
import { IBook } from "../models/interfaces/IBook";
import "../styles/litan-page.css";
import VolumeComponent from "../litanVolumes/volume.component";
import LitanPageBtnsComponent from "./litan-page-btns";
const changeOrderIcon = require("../images/changeOrderIcon.png");

type litanPageProps = {
  setContentVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  analysis: IBook;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const LitanPageComponent: React.FC<litanPageProps> = ({
  setContentVisibility,
  analysis,
  setBooks,
}) => {
  const handleClose = () => {
    setContentVisibility(true);
  };

  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const [newVolumeName, setVolumeName] = useState<string>("");
  const [curentLitan, setCurentLitan] = useState<IBook>(analysis);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleReversed = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="litanpage mt-5">
      <div className="container">
        <h5>
          <span
            onClick={handleClose}
            className="baBackLink"
            style={{ display: "flex", justifyContent: "start" }}
          >
            &#8592; Back{" "}
          </span>
        </h5>
        <h3 className="text-center">
          <span>
            Analysis of "{analysis.name}" {analysis.author}
          </span>
        </h3>

        {/* CHANGE ORDER ICON */}
        <div className="d-flex justify-content-end col-11">
          <img
            onClick={handleReversed}
            style={{ width: "2.5%", cursor: "pointer", userSelect: "none" }}
            src={changeOrderIcon}
            alt="changeOrderIcon"
          />
        </div>
        <div id="volumes" className="row justify-content-center mt-4">
          {isReversed && (
            <LitanPageBtnsComponent
              analysis={analysis}
              newVolumeName={newVolumeName}
              setBooks={setBooks}
              setCurentLitan={setCurentLitan}
              setVolumeName={setVolumeName}
              setIsAddNew={setIsAddNew}
              isAddNew={isAddNew}
            />
          )}
        </div>

        <div id="analysisContent">
          <div id="mainSummary">
            {analysis.summary.map((summary, index) => (
              <p key={index}>{summary.notes}</p>
            ))}
          </div>
          <div id="volumes" className="row justify-content-center mt-4">
            {curentLitan &&
              curentLitan.volumes.map((volume, index) => (
                <div key={index}>
                  <VolumeComponent
                    id={analysis._id!}
                    volume={volume}
                    ind={index}
                    setBooks={setBooks}
                  />
                </div>
              ))}

            {!isReversed && (
              <LitanPageBtnsComponent
                analysis={analysis}
                newVolumeName={newVolumeName}
                setBooks={setBooks}
                setCurentLitan={setCurentLitan}
                setVolumeName={setVolumeName}
                setIsAddNew={setIsAddNew}
                isAddNew={isAddNew}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LitanPageComponent;
