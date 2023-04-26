import React, { useEffect, useState } from "react";
import { IBook } from "./models/interfaces/IBook";
import "./styles/books-row.css";
import BooksRow from "./books-row.component";
import ModalComponent from "./modal.component";
import { fetchLitans } from "./funcs/axios/fetchLitans";

const BookAnalysisMainPage = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    fetchLitans(books, setBooks);
  }, []);

  return (
    <div className="wrapper">
      {/* BOOKS ROW */}
      <BooksRow books={books} setBooks={setBooks} />

      {/* MODALS */}
      <ModalComponent books={books} setBooks={setBooks} />
      {/* <ModalComponentUpdate books={books} setBooks={setBooks} /> */}
    </div>
  );
};

export default BookAnalysisMainPage;
