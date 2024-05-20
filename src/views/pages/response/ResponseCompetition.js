import React from "react";
import Navbar from "../../../component/Navbar1";

function ResponseCompetition() {
  const [selectedType, setSelectedType] = React.useState("Fist to Answer");
  const [thinkTime, setThinkTime] = React.useState(30);
  const [answerTime, setAnswerTime] = React.useState(60);
  const [timer, setTimer] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [phase, setPhase] = React.useState("think");

  React.useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timer);
      if (phase === "think") {
        startAnswerTime();
      } else if (phase === "answer") {
        setPhase("done");
      }
    }
  }, [timeLeft, phase]);

  const startTimer = (duration) => {
    clearInterval(timer);
    setTimeLeft(duration);
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    setTimer(newTimer);
  };

  const startThinkTime = () => {
    setPhase("think");
    startTimer(thinkTime);
  };

  const startAnswerTime = () => {
    setPhase("answer");
    startTimer(answerTime);
  };

  const startCompetition = () => {
    startThinkTime();
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
    <div className="h-screen">
      <Navbar />
      <div className="w-full px-24">
        <div className="w-full p-10 bg-white rounded-lg shadow-2xl mt-24">
          <h1 className="text-2xl font-medium mb-4">Response Competition</h1>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              Type:
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
            >
              <option value="Fist to Answer">Fist to Answer</option>
              <option value="Enter an Answer">Enter an Answer</option>
              <option value="Demo to Answer">Demo to Answer</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="think-time"
              className="block text-gray-700 font-medium mb-2"
            >
              Think Time (seconds):
            </label>
            <input
              type="number"
              id="think-time"
              value={thinkTime}
              onChange={(e) => setThinkTime(Number(e.target.value))}
              className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="answer-time"
              className="block text-gray-700 font-medium mb-2"
            >
              Answer Time (seconds):
            </label>
            <input
              type="number"
              id="answer-time"
              value={answerTime}
              onChange={(e) => setAnswerTime(Number(e.target.value))}
              className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Instructions:</p>
            <p>{getInstructions()}</p>
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
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mb-4"
            onClick={startCompetition}
          >
            Start Competition
          </button>
          <button
            className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded shadow-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponseCompetition;
