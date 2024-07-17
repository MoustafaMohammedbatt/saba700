"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

interface PlayerData {
  playerName: string;
  hint1: string;
  hint2: string;
  hint3: string;
  hint4: string;
  hint5: string;
  time: number;
}

const GuessPlayer = () => {
  const [hints, setHints] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [time, setTime] = useState<number>(45);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchHints();
  }, []);

  const fetchHints = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get<PlayerData>(`${apiUrl}/GuessPlayer`);
    const data = response.data;
    setHints([data.hint1, data.hint2, data.hint3, data.hint4, data.hint5]);
    setPlayerName(data.playerName);
  };

  const addHint = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };

  const showPlayerName = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const skipQuestion = () => {
    setHintIndex(0);
    setHints([]);
    setPlayerName('');
    fetchHints();
  };
  const handleStart = () => {
    if (intervalId !== null) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    setIntervalId(interval);
  };

  const handleStop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    handleStop();
    setTime(45);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="w-3/4 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 h-full flex flex-col">
          <div className="max-h-48 overflow-y-auto flex-grow mt-5">
            <ul className="list-disc pl-5 text-lg">
              {hints.slice(0, hintIndex + 1).map((hint, index) => (
                <li key={index} className="mb-2">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 space-x-4">
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded-full shadow-md ${hintIndex === hints.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={addHint}
          disabled={hintIndex === hints.length - 1}
        >
          Add Hint
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md"
          onClick={showPlayerName}
        >
          Show Player Name
        </button>
      </div>
      <div className="flex justify-between mt-4 space-x-4">
      <button
          className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md"
          onClick={skipQuestion}
        >
          Skip Question
        </button>
      </div>

      <div className="flex flex-col items-center mt-5">
        <p className="text-lg mb-2 dark:text-white">Time: {time}s</p>
        <div className="flex space-x-2 m-5">
          <button onClick={handleStart} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Start</button>
          <button onClick={handleStop} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Stop</button>
          <button onClick={handleReset} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Reset</button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Player Name Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative max-w-lg w-full mx-4">
          <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold text-black dark:text-white">
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 dark:text-white">Player Name</h2>
          <p className="text-lg dark:text-gray-300">{playerName}</p>
        </div>
      </Modal>
    </div>
  );
};

export default GuessPlayer;
