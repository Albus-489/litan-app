import React, { useEffect, useState } from "react";
import { createBook } from "./funcs/createBook";
import { Book } from "./models/Books";
import { IBook } from "./models/interfaces/IBook";
import "./styles/books-row.css";
import Button from "react-bootstrap/Button";
import BooksRow from "./books-row.component";
import ModalComponent from "./modal.component";
const boockCover = require("./images/bookCover.png");

const BookAnalysisMainPage = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  const logs = () => {
    const b = new Book("Aboba");
    const notes = b.getFullNotes();
    console.log(notes);
  };

  // const testGetBook = async () => {
  //   const a = await getBooks();
  //   console.log(a);
  // };
  return (
    <div className="wrapper">
      {/* BOOKS ROW */}
      <BooksRow books={books} />

      {/* MODAL */}
      <ModalComponent books={books} setBooks={setBooks} />
    </div>
  );
};

export default BookAnalysisMainPage;
