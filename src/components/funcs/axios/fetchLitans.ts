import axios from "axios";
import { IBook } from "../../models/interfaces/IBook";
import { Prev } from "react-bootstrap/esm/PageItem";

export async function fetchLitans(
  books: IBook[],
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
) {
  const response = await axios.get("http://localhost:8080/litans");
  setBooks(response.data);
}
