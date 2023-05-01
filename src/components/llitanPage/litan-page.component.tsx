import React, { useState } from "react";
import { IBook } from "../models/interfaces/IBook";
import "../styles/litan-page.css";
import VolumeComponent from "../litanVolumes/volume.component";
import LitanPageBtnsComponent from "./litan-page-btns";

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

            {isAddNew && (
              <LitanPageBtnsComponent
                analysis={analysis}
                newVolumeName={newVolumeName}
                setBooks={setBooks}
                setCurentLitan={setCurentLitan}
                setVolumeName={setVolumeName}
                setIsAddNew={setIsAddNew}
              />
            )}
            <div className="addVolume mb-5 text-center">
              <span
                className="baBackLink col-2 offset-5"
                onClick={() => setIsAddNew(true)}
              >
                + new +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LitanPageComponent;
