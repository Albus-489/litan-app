import axios from "axios";
import { IBook } from "../../models/interfaces/IBook";
import addVolumeName from "../axios/addVolume";
import { fetchLitans } from "../axios/fetchLitans";
import getLitanById from "../axios/getLitanById";

export async function handleOpen(
  analysis: IBook,
  setCurentAnalysis: React.Dispatch<React.SetStateAction<IBook | undefined>>,
  setContentVisibility: React.Dispatch<React.SetStateAction<boolean>>
) {
  const litan = await getLitanById(analysis._id!);
  setCurentAnalysis(litan);
  setContentVisibility(false);
}

export function handleEdit(
  analysis: IBook,
  setSelectedBA: React.Dispatch<React.SetStateAction<IBook>>
) {
  setSelectedBA(analysis);
}

export async function handleAdd(
  id: string,
  newVolumeName: string,
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>,
  setCurentLitan: React.Dispatch<React.SetStateAction<IBook>>,
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>
) {
  await addVolumeName(id!, newVolumeName);
  if (newVolumeName) {
    await fetchLitans(setBooks);
    const res = await axios.get(`http://localhost:8080/litans/${id}`);
    // console.log(res.data);
    setCurentLitan(res.data);
    setIsAddNew(false);
  }
}
