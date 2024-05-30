import React, { useState } from "react";
import Navbar from "../../../component/Navbar1";

function ResponseCompetition() {
  const [selectedType, setSelectedType] = useState("Fist to Answer");
  const [thinkTime, setThinkTime] = useState(30);
  const [answerTime, setAnswerTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(null);
  const [phase, setPhase] = useState("think");
  const [timer, setTimer] = useState(null);

  const startTimer = (duration) => {
    clearInterval(timer);
    setTimeLeft(duration);
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    setTimer(newTimer);
  };

  const startCompetition = () => {
    setPhase("think");
    startTimer(thinkTime);
  };

  const resetForm = () => {
    setSelectedType("Fist to Answer");
    setThinkTime(30);
    setAnswerTime(60);
    clearInterval(timer);
    setTimeLeft(null);
    setPhase("think");
  };

  const getInstructions = () => {
    switch (selectedType) {
      case "Fist to Answer":
        return "Kompetisi di mana siswa diberikan pertanyaan dan mereka berlomba untuk menjadi orang pertama yang memberikan jawaban yang benar.";
      case "Enter an Answer":
        return "Siswa memasukkan jawaban mereka ke dalam sistem. Jawaban ini kemudian dapat dinilai oleh guru.";
      case "Demo to Answer":
        return "Tekan tombol 'start' untuk memulai menjawab, hanya siswa pertama yang menekan tombol jawab yang dapat mendemonstrasikan layar kepada siswa lainnya.";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="content-page container mx-auto p-4 mt-20">
        <div className="w-full p-4 bg-white rounded-xl shadow-xl border border-gray-300">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
            Kompetisi Respon
          </h1>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Jenis:
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
            >
              <option value="Fist to Answer">Tinjau untuk menjawab</option>
              <option value="Enter an Answer">Masukkan jawaban</option>
              <option value="Demo to Answer">Demo untuk menjawab</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="think-time"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Pikirkan waktu (detik):
            </label>
            <input
              type="number"
              id="think-time"
              value={thinkTime}
              onChange={(e) => setThinkTime(Number(e.target.value))}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="answer-time"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Waktu jawab (detik):
            </label>
            <input
              type="number"
              id="answer-time"
              value={answerTime}
              onChange={(e) => setAnswerTime(Number(e.target.value))}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700">Instructions:</p>
            <p className="text-gray-700">{getInstructions()}</p>
          </div>
          <div className="mb-4">
            {timeLeft !== null && (
              <p className="text-gray-700 font-medium">
                {phase === "think"
                  ? `Think Time Left: ${timeLeft} seconds`
                  : phase === "answer"
                  ? `Answer Time Left: ${timeLeft} seconds`
                  : "Competition Over"}
              </p>
            )}
          </div>
          <button
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
            onClick={startCompetition}
          >
            Mulai Kompetisi
          </button>
          <button
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={resetForm}
          >
            Atur ulang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseCompetition;
