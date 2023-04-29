import React from "react";
import { useState } from "react";
import { IVolume } from "./models/interfaces/IVolume";
import addNewSummary from "./funcs/axios/addSummary";
import { IBook } from "./models/interfaces/IBook";
import { ISummary } from "./models/interfaces/ISummary";
import axios from "axios";
import { isAbsolute } from "path";
// const addSummaryIcon = require("./images/addSummaryIcon.jpg");

type SummaryComponentProps = {
  id: string;
  ind: number;
  volume: IVolume;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  volume,
  id,
  ind,
  setBooks,
}) => {
  const [curentSummaries, setCurentSummaries] = useState<ISummary[]>(
    volume.summary || []
  );
  const [isAddSummary, setIsAddSummary] = useState<boolean>(false);
  const [summaryIsOpen, setSummaryIsOpen] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [newSummaryText, setNewSummaryText] = useState<string>("");

  const addSummary = () => {
    setIsAddSummary(true);
  };

  const handleTextareaInput = (event: any) => {
    const target = event.target;
    target.style.height = "auto"; // Height cancelation
    target.style.height = `${target.scrollHeight}px`; // Set height with content height
    setTextareaHeight(target.scrollHeight); // Update state textareaHeight
    setNewSummaryText(target.value);
  };

  async function handleCreateSummary() {
    const res: IBook = await addNewSummary(id, newSummaryText, ind, setBooks);
    if (newSummaryText) {
      await setCurentSummaries(res.volumes[ind].summary!);
      await setIsAddSummary(false);
    }
  }

  return (
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
          <div className="d-flex justify-content-around col-4 offset-4">
            <span>{summaryIsOpen ? " ×" : " +"}</span>
            <span>notes</span>
            <span>{summaryIsOpen ? " ×" : " +"}</span>
          </div>
          <div className="borderLineSmall col-2 offset-5"></div>
        </div>

        <div className="summaries">
          {summaryIsOpen && (
            <div>
              <div>
                {curentSummaries?.map((summary, index) => (
                  <div key={index}>{summary.notes}</div>
                ))}
              </div>

              {/* TEXTAREA INPUT FIELD */}
              {isAddSummary && (
                <div className="form-floating mt-4">
                  <textarea
                    className="form-control bg-dark text-white mb-2 text-center"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{
                      height: textareaHeight,
                      overflow: "hidden",
                      minHeight: "60px",
                    }}
                    onInput={handleTextareaInput}
                  ></textarea>
                </div>
              )}
              {/* BUTTONS */}
              <div className="mt-3">
                <div className="borderLineSmall col-2 offset-5"></div>
                {isAddSummary ? (
                  <div className="d-flex justify-content-center">
                    <div>
                      {" "}
                      <button
                        onClick={() => handleCreateSummary()}
                        className="btn btn-primary"
                      >
                        +
                      </button>{" "}
                    </div>
                    <div className="m-1"></div>
                    <div>
                      <button
                        onClick={() => {
                          setIsAddSummary(false);
                          setNewSummaryText("");
                        }}
                        className="btn btn-danger"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="baBackLink" onClick={() => addSummary()}>
                    + add +
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;
