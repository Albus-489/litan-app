import axios from "axios";
import { fetchLitans } from "./fetchLitans";
import { IBook } from "../../models/interfaces/IBook";

export default async function addNewSummary(
  id: string,
  text: string,
  key: number,
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
) {
  const res = await axios.patch(
    `http://localhost:8080/litans/${id}/add-summary`,
    { text: text, index: key }
  );

  // console.log(res.data);
  return res.data;
}
