import React from "react";
import { useState } from "react";
import { IVolume } from "../models/interfaces/IVolume";
import addNewSummary from "../funcs/axios/addNewSummary";
import { IBook } from "../models/interfaces/IBook";
import { ISummary } from "../models/interfaces/ISummary";
import SummaryItem from "./summary-item.component";
import MainSummaryItem from "./main-summary-item.component";
import addNewMainSummary from "../funcs/axios/addNewMainSummary";

type MainSummaryComponentProps = {
  id: string;
  litan: IBook;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const MainSummaryComponent: React.FC<MainSummaryComponentProps> = ({
  id,
  litan,
  setBooks,
}) => {
  const [isAddSummary, setIsAddSummary] = useState<boolean>(false);
  const [isNotesVisible, setIsNotesVisible] = useState<boolean>(true);
  const [summaryIsOpen, setSummaryIsOpen] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [newSummaryText, setNewSummaryText] = useState<string>("");
  const [curentMainSummaries, setCurentMainSummaries] = useState<ISummary[]>(
    litan.summary || []
  );

  const addSummary = () => {
    setIsAddSummary(true);
  };

  const handleTextareaInput = (event: any) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/\r?\n/g, "\n");
    const target = event.target;
    target.style.height = "auto"; // Height cancelation
    target.style.height = `${target.scrollHeight}px`; // Set height with content height
    setTextareaHeight(target.scrollHeight); // Update state textareaHeight
    setNewSummaryText(formattedValue);
  };

  async function handleCreateMainSummary() {
    const res: IBook = await addNewMainSummary(id, newSummaryText);
    if (newSummaryText) {
      await setCurentMainSummaries(res.summary!);
      await setIsAddSummary(false);
    }
  }

  return (
    <div className="volumeBody">
      {/* SUMMARIES */}
      <div style={{ cursor: "pointer" }} className="volumeContentBox">
        <div
          className="hideShowArrow mb-1"
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
                {/* NOTES ARRAY HERE! */}
                {isNotesVisible &&
                  curentMainSummaries.map((summary, index) => (
                    <div key={index}>
                      <MainSummaryItem
                        summary={summary}
                        sumIndex={index}
                        litanId={id}
                        setCurentSummaries={setCurentMainSummaries}
                      />
                    </div>
                  ))}
              </div>

              {/* TEXTAREA INPUT FIELD */}
              {isAddSummary && (
                <div className="col-10 offset-1 form-floating mt-4">
                  <textarea
                    className="form-control text-white mb-2"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{
                      height: textareaHeight,
                      overflow: "hidden",
                      minHeight: "60px",
                      backgroundColor: "rgb(15, 16, 29)",
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
                        onClick={() => {
                          handleCreateMainSummary();
                          setIsNotesVisible(true);
                        }}
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
                          setIsNotesVisible(true);
                        }}
                        className="btn btn-danger"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="baBackLink d-flex" style={{ flex: "center" }}>
                    <span
                      onClick={() => {
                        addSummary();
                        setIsNotesVisible(false);
                      }}
                    >
                      + add +
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSummaryComponent;
