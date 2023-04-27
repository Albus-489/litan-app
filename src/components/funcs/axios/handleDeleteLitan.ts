import axios from "axios";
import { fetchLitans } from "./fetchLitans";
import { IBook } from "../../models/interfaces/IBook";

export default async function handleDeleteLitan(
  id: string,
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
) {
  try {
    const response = await axios.delete(`http://localhost:8080/litans/${id}`);
    fetchLitans(setBooks);
    console.log(response.data, `ID:${id}`);
  } catch (error) {
    console.error(error);
  }
}
