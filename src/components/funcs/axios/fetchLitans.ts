import axios from "axios";
import { IBook } from "../../models/interfaces/IBook";

export async function fetchLitans(
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
) {
  const response = await axios.get("http://localhost:8080/litans");
  setBooks(response.data);
  // console.log(response.data);
}
