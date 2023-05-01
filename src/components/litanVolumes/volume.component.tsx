import React, { useState } from "react";
import { IVolume } from "../models/interfaces/IVolume";
import "../styles/volume.css";
import SummaryComponent from "../litanSummary/summary.component";
import { IBook } from "../models/interfaces/IBook";
import axios from "axios";
import convertToRoman from "../funcs/convertToRoman";

type VolumeProps = {
  id: string;
  volume: IVolume;
  ind: number;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const VolumeComponent: React.FC<VolumeProps> = ({
  volume,
  id,
  ind,
  setBooks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [curentVolume, setCurentVolume] = useState<IVolume>(volume);
  // const [charactersIsOpen, setCharactersIsOpen] = useState<boolean>(false);
  // const [locationsIsOpen, setLocationsIsOpen] = useState<boolean>(false);

  async function fetchVolume() {
    const res = await axios.get(`http://localhost:8080/litans/${id}`);
    setCurentVolume(res.data.volumes[ind]);
    console.log(res);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="volume mb-4 col-11">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            fetchVolume();
          }}
          className="col-12 p-3 d-flex justify-content-between align-items-center volHeader"
        >
          <div className="" style={{ fontSize: "150%" }}>
            <span>{convertToRoman(ind + 1)}</span>
          </div>
          <div className="volName">{curentVolume.name}</div>
          <div className="hideShowArrow">{isOpen ? "▲" : "▼"}</div>
        </div>
        {isOpen && (
          <>
            {/* SUMARY */}
            <SummaryComponent
              id={id}
              ind={ind}
              volume={curentVolume}
              setBooks={setBooks}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VolumeComponent;
