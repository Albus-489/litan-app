import axios from "axios";
import { IBook } from "../../models/interfaces/IBook";

export default async function (id: string) {
  const res = await axios.get(`http://localhost:8080/litans/${id}`);
  const litan: IBook = res.data;
  return litan;
}
