import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function Questions() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [thinkTime, setThinkTime] = useState("");
  const [answerTime, setAnswerTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [phase, setPhase] = useState("think");
  const [timer, setTimer] = useState(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Menggabungkan waktu ke dalam format jam:menit:detik
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  const saveChange = async () => {
    const data = {
      name: name,
      type: type,
      think_time: thinkTime,
      answer_time: answerTime,
    };
    let url_hit = `${API_DUMMY}/api/instructur/class/${localStorage.getItem(
      "class_id"
    )}/response_competition`;

    try {
      const response = await axios.post(url_hit, data, authConfig);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Kompetisi dimulai.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Menambahkan Data.",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const startTimer = (duration, phase) => {
    clearInterval(timer);
    setTimeLeft(duration);
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(newTimer);
          if (phase === "think") {
            setPhase("thinkTimeHabis");
          } else if (phase === "answer") {
            setPhase("answerTimeHabis");
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const startCompetition = () => {
    setPhase("think");
    startTimer(thinkTime, "think");
    setTimeout(() => {
      setPhase("answer");
      startTimer(answerTime, "answer");
    }, thinkTime * 1000);
    saveChange();
  };

  const resetForm = () => {
    setType("");
    setThinkTime("");
    setAnswerTime("");
    clearInterval(timer);
    setTimeLeft(null);
    setPhase("think");
  };

  const getInstructions = () => {
    switch (type) {
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

  // const handleTimeChange = (e, setTime) => {
  //   const timeParts = e.target.value.split(":");
  //   const seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60;
  //   setTime(seconds);
  // };

  return (
    <div className="flex bg-gray-100">
      <div className="content-page container mx-auto">
        <div className="w-auto p-4 bg-white rounded-xl shadow-xl border border-gray-300">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Kompetisi Respon
          </h1>
          <div className="mb-4 mt-4">
            <label
              htmlFor="type"
              className="mb-2 text-sm font-semibold text-gray-700 block">
              Jenis:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="block w-full p-2 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500">
              <option value="">Pilih jenis</option>
              <option value="Fist to Answer">Tinjau untuk menjawab</option>
              <option value="Enter an Answer">Masukkan jawaban</option>
              <option value="Demo to Answer">Demo untuk menjawab</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="answer-time"
              className="mb-2 text-sm font-semibold text-gray-700 block">
              Pertanyaan :
            </label>
            <input
              type="text"
              id="pertanyaan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="think-time"
              className="mb-2 text-sm font-semibold text-gray-700 block">
              Waktu berfikir :
            </label>
            <input
              type="time"
              id="think-time"
              value={thinkTime}
              onChange={(e) => setThinkTime(e.target.value)}
              className="block w-full p-2 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="answer-time"
              className="mb-2 text-sm font-semibold text-gray-700 block">
              Waktu jawab :
            </label>
            <input
              type="time"
              id="answer-time"
              value={answerTime}
              onChange={(e) => setAnswerTime(e.target.value)}
              className="block w-full p-2 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4 w-[70%]">
            <p className="text-sm font-semibold text-gray-700">Instructions:</p>
            <p className="text-gray-700">{getInstructions()}</p>
          </div>
          {/* <div className="mb-4">
            {timeLeft !== null && (
              <p className="font-medium text-gray-700">
                {phase === "think"
                  ? `Think Time Left: ${formatTime(timeLeft)}`
                  : phase === "answer"
                  ? `Answer Time Left: ${formatTime(timeLeft)}`
                  : "Competition Over"}
              </p>
            )}
          </div> */}
          <button
            className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
            onClick={startCompetition}>
            Mulai Kompetisi
          </button>
          {/* <button
            className="w-full py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={resetForm}>
            Atur ulang
          </button> */}
          {/* <button
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            onClick={saveChange}
          >
            Simpan Perubahan
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Questions;
