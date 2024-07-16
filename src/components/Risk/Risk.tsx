'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Risk = () => {
  const [data, setData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedQuestions, setClickedQuestions] = useState([]);
  const [time, setTime] = useState<number>(30);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/Risk`);
      setData(response.data);
    };

    fetchData();
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
    setClickedQuestions((prev) => [...prev, question]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const isClicked = (question) => clickedQuestions.some((q) => q.question === question.question);

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
    setTime(30);
  };

  const addPoints = (team, points) => {
    if (team === 1) {
      setTeam1Score((prev) => prev + points);
    } else {
      setTeam2Score((prev) => prev + points);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        {data.map((category, index) => (
          <div key={index} className="border p-4 dark:border-gray-700 rounded-md">
            <div className="h-16 flex items-center justify-center">
              <h3 className="text-center font-bold dark:text-white">{category.category}</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { points: 5, question: category.easyQuestion, answer: category.easyQuestionAnswer },
                { points: 10, question: category.regularQuestion, answer: category.regularQuestionAnswer },
                { points: 20, question: category.meduimQuestion, answer: category.meduimQuestionAnswer },
                { points: 40, question: category.hardQuestion, answer: category.hardQuestionAnswer }
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`relative w-full h-16 p-4 flex items-center justify-center rounded-md ${
                    isClicked(item) ? 'bg-red-500 dark:bg-red-700' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
                  } dark:text-white`}
                  onClick={() => openModal(item)}
                >
                  {item.points}
                  {isClicked(item) && (
                    <span className="absolute top-2 right-2 text-xl font-bold text-white"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-5">
        <p className="text-lg mb-2 dark:text-white">Time: {time}s</p>
        <div className="flex space-x-2 m-5">
          <button onClick={handleStart} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Start</button>
          <button onClick={handleStop} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Stop</button>
          <button onClick={handleReset} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-md">Reset</button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-5">
        <div className="text-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center w-1/3">
          <div className="text-xl font-bold mb-2 dark:text-white">Team 1</div>
          <div className="text-2xl font-bold mb-4 dark:text-white">{team1Score}</div>
          <div className="flex flex-col space-y-2">
            {[5, 10, 20, 40].map((points) => (
              <button key={points} onClick={() => addPoints(1, points)} className="px-9 w-3/2 py-1 bg-cyan-600 text-white rounded-md shadow-md">
                +{points}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center w-1/3">
          <div className="text-xl font-bold mb-2 dark:text-white">Team 2</div>
          <div className="text-2xl font-bold mb-4 dark:text-white">{team2Score}</div>
          <div className="flex flex-col space-y-2">
            {[5, 10, 20, 40].map((points) => (
              <button key={points} onClick={() => addPoints(2, points)} className="px-9 w-3/2 py-1 bg-green-700 text-white rounded-md shadow-md">
                +{points}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Question Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        {selectedQuestion && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative max-w-lg w-full mx-4">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold text-black dark:text-white">
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 dark:text-white">Question</h2>
            <p className="mb-4 dark:text-gray-300">{selectedQuestion.question}</p>
            <h2 className="text-xl font-bold mb-4 dark:text-white">Answer</h2>
            <p className="dark:text-gray-300">{selectedQuestion.answer}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Risk;
