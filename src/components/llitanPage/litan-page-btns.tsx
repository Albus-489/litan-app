import React from "react";
import { IBook } from "../models/interfaces/IBook";
import { handleAdd } from "../funcs/handlers/litan.handlers";

type LitanPageBtnsProps = {
  analysis: IBook;
  newVolumeName: string;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setCurentLitan: React.Dispatch<React.SetStateAction<IBook>>;
  setVolumeName: React.Dispatch<React.SetStateAction<string>>;
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  isAddNew: boolean;
};

const LitanPageBtnsComponent: React.FC<LitanPageBtnsProps> = ({
  analysis,
  newVolumeName,
  setBooks,
  setCurentLitan,
  setVolumeName,
  setIsAddNew,
  isAddNew,
}) => {
  return (
    <>
      {isAddNew && (
        <div className="col-4">
          <div className="input-group mb-3">
            <button
              onClick={() => {
                setIsAddNew(false);
                setVolumeName("");
              }}
              className="btn btn-outline-danger"
              type="button"
              id="button-addon2"
            >
              ×
            </button>
            <input
              type="text"
              className="form-control bg-dark text-white text-center"
              placeholder="Volume name"
              aria-label="Volume name"
              aria-describedby="button-addon2"
              onChange={(e) => setVolumeName(e.target.value)}
            />
            <button
              onClick={() =>
                handleAdd(
                  analysis._id!,
                  newVolumeName,
                  setBooks,
                  setCurentLitan,
                  setIsAddNew
                )
              }
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
            >
              +
            </button>
          </div>
        </div>
      )}
      <div className="addVolume mb-2 text-center">
        <span
          className="baBackLink col-2 offset-5"
          onClick={() => setIsAddNew(true)}
        >
          + new +
        </span>
      </div>
    </>
  );
};

export default LitanPageBtnsComponent;
