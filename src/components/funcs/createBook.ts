import { IBook } from "../models/interfaces/IBook";

export const createBook = (
  newBook: IBook,
  books: IBook[],
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
): void => {
  let tempBooks = [...books];
  tempBooks.unshift(newBook);
  console.log("This function is called!");
  console.log("Temp => ", tempBooks);

  setBooks(tempBooks);
  console.log("Original => ", books);
};
