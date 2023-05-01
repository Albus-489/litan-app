import React, { useState } from "react";
import { IBook } from "../models/interfaces/IBook";
import { Book } from "../models/Books";
import ModalUpdateComponent from "../litanModals/modal-update.component";
import LitanCardComponent from "./litan-card.component";
import LitanPageComponent from "./litan-page.component";

type BooksRowProps = {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const BooksRow: React.FC<BooksRowProps> = ({ books, setBooks }) => {
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
              key={index}
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
        <LitanPageComponent
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
