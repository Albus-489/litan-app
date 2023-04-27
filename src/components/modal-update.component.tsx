import React, { useEffect, useState } from "react";
import { IBook } from "./models/interfaces/IBook";
import axios from "axios";
import { fetchLitans } from "./funcs/axios/fetchLitans";
import { Form } from "react-bootstrap";

type ModalUpdateProps = {
  books: IBook[];
  dataToChange: IBook;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const ModalUpdateComponent: React.FC<ModalUpdateProps> = ({
  books,
  dataToChange,
  setBooks,
}) => {
  const [data, setData] = useState<{
    name: string;
    author: string;
    image: string;
  }>({
    name: dataToChange.name,
    author: dataToChange.author,
    image: dataToChange.image,
  });

  useEffect(() => {
    setData({
      name: dataToChange.name,
      author: dataToChange.author,
      image: dataToChange.image,
    });
  }, [dataToChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    // console.log(book);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.name.length < 1 || data.author.length < 1) {
      alert("Fields must have a name and author");
      return;
    } else {
      handleUpdate();
    }
  };

  async function handleUpdate() {
    try {
      const res = await axios.patch(
        `http://localhost:8080/litans/${dataToChange._id}`,
        data
      );
      // console.log(res);
      fetchLitans(setBooks);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="modal"
      id="updateBookModal"
      tabIndex={1}
      aria-labelledby="modalUpdateLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalUpdateLabel">
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
                  value={data.name}
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
                  value={data.author}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="image">
                {/* PICTURE IMAGE INPUT */}
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="Picture url"
                  value={data.image}
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
                Update
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateComponent;
