import React, { useState } from "react";
import { IVolume } from "./models/interfaces/IVolume";

type VolumeProps = {
  volume: IVolume;
  key: number;
};

const VolumeComponent: React.FC<VolumeProps> = ({ volume }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="volume mb-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="col-12 p-3 d-flex justify-content-between volHeader"
      >
        <div className="volName">{volume.name}</div>
        <div className="hideShowArrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <div>
          {volume.summary ? (
            volume.summary.map((summary) => (
              <>
                <div className="summary mb-3 container d-flex flex-column">
                  <div className="noteDate d-flex">
                    {new Date(summary.creationDate).toLocaleDateString()} (
                    {new Date(summary.creationDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    )
                  </div>
                  <div className="notes">{summary.notes}</div>
                </div>
              </>
            ))
          ) : (
            <div
              className="mb-3 container text-center"
              style={{ color: "yellow" }}
            >
              No summary yet!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VolumeComponent;

//   {analysis.volumes.map((volume, index) => (
//     <VolumeComponent volume={volume} key={index} />
//   ))}
