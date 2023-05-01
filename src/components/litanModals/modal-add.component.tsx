import React, { useState } from "react";
import { Book } from "../models/Books";
import { IBook } from "../models/interfaces/IBook";
import axios from "axios";
import { fetchLitans } from "../funcs/axios/fetchLitans";
import { Form } from "react-bootstrap";

type ModalProps = {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const ModalComponent: React.FC<ModalProps> = ({ books, setBooks }) => {
  const [book, setBook] = useState<{
    name: string;
    author: string;
    picture: string;
  }>({
    name: "",
    author: "",
    picture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(book);

    if (book.name.length < 1 || book.author.length < 1) {
      alert("Fields must have a name and author");
      return;
    } else {
      handleAddNewBA();
    }
  };

  async function handleAddNewBA() {
    try {
      const ba = new Book(book.name, book.author, book.picture);
      const res = await axios.post("http://localhost:8080/litans", ba);
      fetchLitans(setBooks);
      console.log("Create new BA", res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="modal"
      id="exampleModal"
      tabIndex={1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Litan creation
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {/* FORM START */}
          <Form onSubmit={(e) => handleSubmit(e)}>
            <div className="modal-body">
              <Form.Group controlId="name">
                {/* NAME INPUT */}
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="name"
                  placeholder="Book name"
                  // value={book.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="author">
                {/* AUTHOR INPUT */}
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="author"
                  placeholder="Book author"
                  // value={book.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="picture">
                {/* PICTURE IMAGE INPUT */}
                <Form.Control
                  type="text"
                  name="picture"
                  placeholder="Picture url"
                  // value={book.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
