import { IBook } from "../models/interfaces/IBook";

export const createBook = (
  newBook: IBook,
  books: IBook[],
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
): void => {
  fetch("../../data/test.json")
    .then((response) => response.json())
    .then((data) => {
      // здесь вы можете редактировать содержимое файла data
      console.log(data);
    });

  console.log("Creation");
};
