"use client";
import Image from "next/image";
import Cell from "@/components/TicTacToe/Cell";
import { useEffect, useState } from "react";
import ImageCell from "@/components/TicTacToe/ImageCell";
import axios from "axios";

const winningCompos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winMessage, setWinMessage] = useState("");
  const [row, setRow] = useState<string[]>([]);
  const [col, setCol] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/XO`);
      const images = response.data;

      setRow(images.slice(0, 3));
      setCol(images.slice(3, 6));
    };

    fetchImages();
  }, []);

  useEffect(() => {
    winningCompos.forEach((combo) => {
      const circleWins = combo.every((cell) => cells[cell] === "circle");
      const crossWins = combo.every((cell) => cells[cell] === "cross");
      if (circleWins) {
        setWinMessage("circle wins");
      } else if (crossWins) {
        setWinMessage("cross wins");
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winMessage) {
      setWinMessage("Draw");
    }
  }, [winMessage, cells]);

  const Change = () => {
    const fetchImages = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/XO`);
      const images = response.data;

      setRow(images.slice(0, 3));
      setCol(images.slice(3, 6));
    };

    fetchImages();
    Reset();
  };

  const Reset = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setWinMessage("");
  };

  const Pass = () => {
    setGo(go === "circle" ? "cross" : "circle");
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center mb-4 ml-1">
        <Image src={"/images/FinalFullLogo.png"} alt="Logo" width={103} height={103} />
        {row.map((cell, idx) => (
          <ImageCell key={idx} imagePath={cell} />
        ))}
      </div>
      <div className="flex">
        <div className="flex flex-col mr-4">
          {col.map((cell, idx) => (
            <ImageCell key={idx} imagePath={cell} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {cells.map((cell, idx) => (
            <Cell
              cell={cell}
              cells={cells}
              setCells={setCells}
              id={idx}
              go={go}
              setGo={setGo}
              winMessage={winMessage}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 text-xl">{!winMessage && `It's now ${go} turn`}</div>
      <div className="mt-4 text-xl">{winMessage}</div>
      <div className="flex space-x-4 m-4">
        <button onClick={Reset} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Play Again</button>
        <button onClick={Change} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Change Question</button>
         </div>
      <div className="flex space-x-4 m-4">
      <button onClick={Pass} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Pass</button>
     
      </div>
    </div>
  );
};

export default TicTacToe;
