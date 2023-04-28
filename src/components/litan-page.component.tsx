import React, { useState } from "react";
import { IBook } from "./models/interfaces/IBook";
import "./styles/litan-page.css";
import VolumeComponent from "./volume.component";
import addVolumeName from "./funcs/axios/addVolume";
import { fetchLitans } from "./funcs/axios/fetchLitans";
import axios from "axios";
import convertToRoman from "./funcs/convertToRoman";

type marginaliaProps = {
  setContentVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  analysis: IBook;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const Marginalia: React.FC<marginaliaProps> = ({
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

  async function handleAdd() {
    await addVolumeName(analysis._id!, newVolumeName);
    await fetchLitans(setBooks);
    const res = await axios.get(`http://localhost:8080/litans/${analysis._id}`);
    // console.log(res.data);
    setCurentLitan(res.data);
    setIsAddNew(false);
  }

  return (
    <div className="marginalia mt-5">
      <div className="container">
        <h5>
          <a onClick={handleClose} className="baBackLink">
            &#8592; Back{" "}
          </a>
        </h5>
        <h3 className="text-center">
          <span>
            Analysis of "{analysis.name}" {analysis.author}
          </span>
        </h3>

        <div id="analysisContent">
          <div id="mainSummary">
            {analysis.summary.map((summary) => (
              <p>{summary.notes}</p>
            ))}
          </div>
          <div id="volumes" className="row justify-content-center mt-4">
            {curentLitan ? (
              curentLitan.volumes.map((volume, index) => (
                <>
                  <div className="col-11" style={{ fontSize: "150%" }}>
                    <span className="text-start">
                      {convertToRoman(index + 1)}
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <VolumeComponent volume={volume} key={index} />
                  </div>
                </>
              ))
            ) : (
              <div>''</div>
            )}

            {isAddNew && (
              <div className="col-4">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Volume name"
                    aria-label="Volume name"
                    aria-describedby="button-addon2"
                    onChange={(e) => setVolumeName(e.target.value)}
                  />
                  <button
                    onClick={() => handleAdd()}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
              </div>
            )}
            <div className="addVolume mb-5 text-center">
              <a className="baBackLink" onClick={() => setIsAddNew(true)}>
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
