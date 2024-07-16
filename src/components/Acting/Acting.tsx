"use client"
// components/Acting.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

interface ActingData {
  name: string;
  time: number;
  id: number;
  isDeleted: boolean;
}

const Acting: React.FC = () => {
  const [data, setData] = useState<ActingData[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [time, setTime] = useState<number>(60);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/Acting`);
      setData(response.data);
      setFlipped(Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFlip = (index: number) => {
    setFlipped(flipped.map((flip, i) => (i === index ? !flip : flip)));
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
    setTime(60);
  };

  return (
    <div className={classNames("flex flex-col items-center")}>
      <div className="flex justify-end w-full p-4">
        <button 
          onClick={fetchData} 
          className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md mt-5 mr-5">
          Reset
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
        {data.map((item, index) => (
          <div key={item.id} className="m-2">
            <div
              className={classNames(
                'w-24 h-24 sm:w-40 sm:h-40 bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 flex items-center justify-center cursor-pointer transform transition-transform duration-500',
                { 'rotate-y-180': flipped[index] }
              )}
              onClick={() => handleFlip(index)}
            >
              <div className="backface-hidden">
                {flipped[index] ? (
                  <p className="text-sm sm:text-lg dark:text-white">{item.name}</p>
                ) : (
                  <p className="text-lg sm:text-xl font-bold dark:text-white">{index + 1}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-2 dark:text-white">Time: {time}s</p>
        <div className="flex space-x-2 m-5">
          <button onClick={handleStart} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Start</button>
          <button onClick={handleStop} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Stop</button>
          <button onClick={handleReset} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Acting;
