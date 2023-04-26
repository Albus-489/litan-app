import React, { useState } from "react";
import { createBook } from "./funcs/createBook";
import { IBook } from "./models/interfaces/IBook";
import { Book } from "./models/Books";
import Marginalia from "./marginalia.component";
import bookanData from "../data/bookan.json";
import axios from "axios";
import { fetchLitans } from "./funcs/axios/fetchLitans";
const boockCover = require("./images/bookCover.png");

type BooksRowProps = {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const BooksRow: React.FC<BooksRowProps> = ({ books, setBooks }) => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isContentVisible, setContentVisibility] = useState(true);
  const [curentAnalysis, setCurentAnalysis] = useState<IBook>();
  const [marID, setMarID] = useState<number>();

  function handleOpen(analysis: IBook) {
    setCurentAnalysis(analysis);
    setContentVisibility(false);
  }

  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(`http://localhost:8080/litans/${id}`);
      fetchLitans(books, setBooks);
      console.log(response.data, `ID:${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  // async function handleAddNewBA(){
  //   try
  // }

  return (
    <>
      {isContentVisible ? (
        <div className="books-row container">
          {books.map((book, index) => (
            <div className="card bg-dark" key={index}>
              <img
                id="book-image"
                src={book.image}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-center">{book.name}</h5>
                <div className="cardBtns d-flex justify-content-between">
                  <button
                    onClick={() => handleOpen(book)}
                    className="btn btn-primary"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(book._id!)}
                    className="btn btn-danger ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="addNewBAbox">
            <span
              //
              className="addNewBAtext p-2"
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
