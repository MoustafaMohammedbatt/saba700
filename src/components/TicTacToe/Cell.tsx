"use client";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: string[];
  setCells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winMessage: string;
};

const Cell: React.FC<Props> = ({ go, setGo, id, cells, setCells, cell, winMessage }) => {
  const HandleChange = (cellToChange: string) => {
    let copycells = [...cells];
    copycells[id] = cellToChange;
    setCells(copycells);
  };

  const HandelClick = () => {
    if (winMessage) {
      return;
    }
    const taken = !!cells[id];
    if (!taken) {
      if (go === "circle") {
        HandleChange("circle");
        setGo("cross");
      } else if (go === "cross") {
        HandleChange("cross");
        setGo("circle");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border" onClick={HandelClick}>
      <div className={`text-2xl sm:text-3xl md:text-4xl ${cell === 'circle' ? 'text-blue-500' : 'text-red-500'}`}>
        {cell ? (cell === "circle" ? "O" : "X") : ""}
      </div>
    </div>
  );
};

export default Cell;
