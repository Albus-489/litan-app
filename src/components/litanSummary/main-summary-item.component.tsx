import { format } from "date-fns";
import { ISummary } from "../models/interfaces/ISummary";
import React from "react";
import axios from "axios";
import getLitanById from "../funcs/axios/getLitanById";
const trashCanIcon = require("../images/trash-can.png");

type MainSummaryItemProps = {
  summary: ISummary;
  sumIndex: number;
  litanId: string;
  setCurentSummaries: React.Dispatch<React.SetStateAction<ISummary[]>>;
};

const MainSummaryItem: React.FC<MainSummaryItemProps> = ({
  summary,
  litanId,
  sumIndex,
  setCurentSummaries,
}) => {
  const formattedDate = format(
    new Date(summary.creationDate),
    "HH:mm (dd/MM/yy)"
  );

  const handleDeleteMainSummary = async () => {
    const res = await axios.patch(
      `http://localhost:8080/litans/${litanId}/delete-main-summary`,
      { sumIndex: sumIndex }
    );

    const litan = await getLitanById(litanId);
    if (litan.summary) {
      setCurentSummaries(litan.summary!);
    } else {
      setCurentSummaries([]);
    }
  };

  return (
    <div
      className="summaryBox p-2 mb-2"
      style={{ backgroundColor: "black", borderRadius: "5px" }}
    >
      <div className="d-flex justify-content-between mt-1">
        <div
          style={{ display: "flex", justifyContent: "start", color: "wheat" }}
          className=""
        >
          {formattedDate}
        </div>
        <div>
          <button className="btn btn-sm btn-outline-primary">Edit</button>
        </div>
      </div>
      <div
        style={{
          marginLeft: "1%",
          marginRight: "1%",
          display: "flex",
          justifyContent: "start",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
        className="mb-4 mt-1"
      >
        {summary.notes}
      </div>
      <div>
        <div className="trashIconBox d-flex justify-content-end mb-1">
          <button
            onClick={() => handleDeleteMainSummary()}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSummaryItem;
