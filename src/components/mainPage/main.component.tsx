import { useEffect, useState } from "react";
import { IBook } from "../models/interfaces/IBook";
import "../styles/books-row.css";
import BooksRow from "./litans-row.component";
import ModalComponent from "../litanModals/modal-add.component";
import { fetchLitans } from "../funcs/axios/fetchLitans";
import AnimatedIcon from "../litanAnimations/reverse-volumes-anim";

const BookAnalysisMainPage = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    fetchLitans(setBooks);
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
