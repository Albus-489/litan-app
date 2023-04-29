import { IBook } from "../../models/interfaces/IBook";
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
