import { format } from "date-fns";
import { ISummary } from "../models/interfaces/ISummary";
import React from "react";

type SummaryItemProps = {
  summary: ISummary;
};

const SummaryItem: React.FC<SummaryItemProps> = ({ summary }) => {
  const formattedDate = format(
    new Date(summary.creationDate),
    "HH:mm (dd/MM/yy)"
  );

  return (
    <div
      className="summaryBox p-2 mb-2"
      style={{ backgroundColor: "black", borderRadius: "5px" }}
    >
      <div
        style={{ display: "flex", justifyContent: "start", color: "wheat" }}
        className=""
      >
        {formattedDate}
      </div>
      <div
        style={{
          marginLeft: "1%",
          marginRight: "1%",
          display: "flex",
          justifyContent: "start",
          wordBreak: "break-word",
        }}
        className="mb-4 mt-1"
      >
        {summary.notes}
      </div>
    </div>
  );
};

export default SummaryItem;
