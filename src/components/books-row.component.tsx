import React, { useState } from "react";
import { IBook } from "./models/interfaces/IBook";
import { Book } from "./models/Books";
import Marginalia from "./marginalia.component";
import axios from "axios";
import { fetchLitans } from "./funcs/axios/fetchLitans";
import ModalUpdateComponent from "./modal-update.component";

type BooksRowProps = {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const BooksRow: React.FC<BooksRowProps> = ({ books, setBooks }) => {
  // const [currentPage, setCurrentPage] = useState("Home");
  const [isContentVisible, setContentVisibility] = useState(true);
  const [curentAnalysis, setCurentAnalysis] = useState<IBook>();
  const [isHovered, setIsHovered] = React.useState(false);
  const [selectedBA, setSelectedBA] = React.useState<IBook>(
    new Book("Uknown name", "Uknown author")
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function handleOpen(analysis: IBook) {
    setCurentAnalysis(analysis);
    setContentVisibility(false);
  }

  function handleEdit(analysis: IBook) {
    setSelectedBA(analysis);
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

  return (
    <>
      {isContentVisible ? (
        <div className="books-row container">
          {books.map((book, index) => (
            <div className="card bg-dark" key={index}>
              <img
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                id="book-image"
                src={book.image}
                className={
                  isHovered ? "blur-image card-img-top" : "card-img-top"
                }
                alt="..."
              />
              {isHovered && (
                <span
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleEdit(book)}
                  data-bs-toggle="modal"
                  data-bs-target="#updateBookModal"
                  className="edit-button btn btn-secondary"
                >
                  Edit
                </span>
              )}
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

      <ModalUpdateComponent
        books={books}
        dataToChange={selectedBA}
        setBooks={setBooks}
      />
    </>
  );
};

export default BooksRow;
