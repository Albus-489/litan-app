import React, { useState } from "react";
import { createBook } from "./funcs/createBook";
import { IBook } from "./models/interfaces/IBook";
import { Book } from "./models/Books";
import Marginalia from "./marginalia.component";
import bookanData from "../data/bookan.json";
const boockCover = require("./images/bookCover.png");

type BooksRowProps = {
  books: IBook[];
};

const BooksRow: React.FC<BooksRowProps> = ({ books }) => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isContentVisible, setContentVisibility] = useState(true);
  const [curentAnalysis, setCurentAnalysis] = useState<IBook>();
  const [marID, setMarID] = useState<number>();

  function handleOpen(analysis: IBook) {
    setCurentAnalysis(analysis);
    setContentVisibility(false);
  }

  return (
    <>
      {isContentVisible ? (
        <div className="books-row container">
          {bookanData.map((book, index) => (
            <div className="card bg-dark" key={index}>
              <img
                id="book-image"
                src={book.image}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <button
                  onClick={() => handleOpen(book)}
                  className="btn btn-primary"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
          <div className="addNewBAbox">
            <span
              className="addNewBAtext"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Add
            </span>
          </div>
        </div>
      ) : (
        <Marginalia
          analysis={curentAnalysis!}
          setContentVisibility={setContentVisibility}
        />
      )}
    </>
  );
};

export default BooksRow;
