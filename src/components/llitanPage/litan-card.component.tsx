import { useState } from "react";
import { IBook } from "../models/interfaces/IBook";
import React from "react";
import { handleEdit, handleOpen } from "../funcs/handlers/litan.handlers";
import handleDeleteLitan from "../funcs/axios/handleDeleteLitan";
import "../styles/card-page.css";

type litanCardProps = {
  key: number;
  index: number;
  book: IBook;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setSelectedBA: React.Dispatch<React.SetStateAction<IBook>>;
  setCurentAnalysis: React.Dispatch<React.SetStateAction<IBook | undefined>>;
  setContentVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const LitanCardComponent: React.FC<litanCardProps> = ({
  index,
  book,
  setBooks,
  setSelectedBA,
  setCurentAnalysis,
  setContentVisibility,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card" key={index}>
      <img
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        id="book-image"
        src={book.image}
        className={isHovered ? "blur-image card-img-top" : "card-img-top"}
        alt="..."
      />
      {isHovered && (
        <span
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleEdit(book, setSelectedBA)}
          data-bs-toggle="modal"
          data-bs-target="#updateBookModal"
          className="edit-button btn btn-secondary"
        >
          Edit
        </span>
      )}
      {/* # CARD BODY # */}
      <div className="card-body">
        <div className="">
          {/* CARD TITLE */}
          <h5 className="card-title text-center">{book.name}</h5>
        </div>
        <div className="cardBtns d-flex justify-content-between">
          <button
            onClick={() =>
              handleOpen(book, setCurentAnalysis, setContentVisibility)
            }
            className="btn btn-primary"
          >
            Open
          </button>
          <button
            onClick={() => handleDeleteLitan(book._id!, setBooks)}
            className="btn btn-danger ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LitanCardComponent;
