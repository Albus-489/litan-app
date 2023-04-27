import { IBook } from "../../models/interfaces/IBook";

export function handleOpen(
  analysis: IBook,
  setCurentAnalysis: React.Dispatch<React.SetStateAction<IBook | undefined>>,
  setContentVisibility: React.Dispatch<React.SetStateAction<boolean>>
) {
  setCurentAnalysis(analysis);
  setContentVisibility(false);
}

export function handleEdit(
  analysis: IBook,
  setSelectedBA: React.Dispatch<React.SetStateAction<IBook>>
) {
  setSelectedBA(analysis);
}
