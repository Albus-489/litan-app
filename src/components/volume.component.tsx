import React, { useState } from "react";
import { IVolume } from "./models/interfaces/IVolume";
import "./styles/volume.css";
const addSummaryIcon = require("./images/addSummaryIcon.jpg");

type VolumeProps = {
  volume: IVolume;
  key: number;
};

const VolumeComponent: React.FC<VolumeProps> = ({ volume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [summaryIsOpen, setSummaryIsOpen] = useState<boolean>(false);
  const [isAddSummary, setIsAddSummary] = useState<boolean>(false);
  const [charactersIsOpen, setCharactersIsOpen] = useState<boolean>(false);
  const [locationsIsOpen, setLocationsIsOpen] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = React.useState(0);

  const addSummary = () => {
    console.log("TODO: addSummary");
    setIsAddSummary(true);
  };

  const handleTextareaInput = (event: any) => {
    const target = event.target;
    target.style.height = "auto"; // Сброс высоты для корректного расчета высоты содержимого
    target.style.height = `${target.scrollHeight}px`; // Установка высоты в соответствии с содержимым
    setTextareaHeight(target.scrollHeight); // Обновление состояния textareaHeight
  };

  return (
    <div className="volume mb-4 col-11">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="col-12 p-3 d-flex justify-content-between volHeader"
      >
        <div className="volName">{volume.name}</div>
        <div className="hideShowArrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <>
          {/* <div className="volumeUnderline col-6 offset-3"></div> */}
          <div className="volumeBody">
            {/* SUMMARIES */}
            <div
              style={{ cursor: "pointer" }}
              className="volumeContentBox text-center"
            >
              <div
                className="hideShowArrow mb-3"
                style={{ fontSize: "140%" }}
                onClick={() => setSummaryIsOpen(!summaryIsOpen)}
              >
                <span>Summary</span>
                <span>{summaryIsOpen ? " ×" : " +"}</span>
              </div>

              <div className="summaries">
                {summaryIsOpen && (
                  <div>
                    <div>
                      {volume.summary?.map((summary, index) => summary.notes)}
                    </div>
                    {isAddSummary && (
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-dark text-white mb-2 "
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{
                            height: textareaHeight,
                            overflow: "hidden",
                            minHeight: "60px",
                          }}
                          onInput={handleTextareaInput}
                        ></textarea>
                        <label htmlFor="floatingTextarea2">Notes</label>
                      </div>
                    )}
                    <span className="mt-3">
                      <img
                        onClick={() => addSummary()}
                        className="addSummaryIcon"
                        style={{ width: "50px" }}
                        src={addSummaryIcon}
                        alt="addSummary"
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VolumeComponent;

//   {analysis.volumes.map((volume, index) => (
//     <VolumeComponent volume={volume} key={index} />
//   ))}
