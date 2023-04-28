import React, { useState } from "react";
import { IBook } from "./models/interfaces/IBook";
import { Book } from "./models/Books";
import Marginalia from "./litan-page.component";
import ModalUpdateComponent from "./modal-update.component";
import LitanCardComponent from "./litan-card.component";

type BooksRowProps = {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const BooksRow: React.FC<BooksRowProps> = ({ books, setBooks }) => {
  // const [currentPage, setCurrentPage] = useState("Home");
  const [isContentVisible, setContentVisibility] = useState(true);
  const [curentAnalysis, setCurentAnalysis] = useState<IBook>();
  const [selectedBA, setSelectedBA] = React.useState<IBook>(
    new Book("Uknown name", "Uknown author")
  );

  return (
    <>
      {isContentVisible ? (
        <div className="books-row container">
          {books.map((book, index) => (
            <LitanCardComponent
              index={index}
              book={book}
              setBooks={setBooks}
              setSelectedBA={setSelectedBA}
              setCurentAnalysis={setCurentAnalysis}
              setContentVisibility={setContentVisibility}
            />
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
          setBooks={setBooks}
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
