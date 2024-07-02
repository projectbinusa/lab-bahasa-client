import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import Navbar from "../../../component/Navbar1";

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

  const parseTimeToSeconds = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    const target = new Date();

    target.setHours(hours, minutes, 0, 0);
  
    // Check if the target time is in the past, if so, add one day to the target time
    if (target < now) {
      target.setDate(target.getDate() + 1);
    }

    return Math.floor((target - now) / 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
        showConfirmButton: false,
        timer: 1500,
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
    const thinkTimeSeconds = parseTimeToSeconds(thinkTime);
    const answerTimeSeconds = parseTimeToSeconds(answerTime);
    startTimer(thinkTimeSeconds, "think");
    setTimeout(() => {
      setPhase("answer");
      startTimer(answerTimeSeconds, "answer");
    }, thinkTimeSeconds * 1000);
    saveChange().then(() => {
      window.location.reload("/question");
    });
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
      case "First to Answer":
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="content-page container mx-auto mt-10">
        <div className="w-11/12 p-3 bg-white rounded-lg shadow-lg border border-gray-300 mx-auto">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Kompetisi Respon
          </h1>
          <div className="mb-3 mt-3">
            <label
              htmlFor="type"
              className="mb-1 text-sm font-semibold text-gray-700 block">
              Jenis:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500">
              <option value="">Pilih jenis</option>
              <option value="First to Answer">Tinjau untuk menjawab</option>
              <option value="Enter an Answer">Masukkan jawaban</option>
              <option value="Demo to Answer">Demo untuk menjawab</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="answer-time"
              className="mb-1 text-sm font-semibold text-gray-700 block">
              Pertanyaan:
            </label>
            <input
              type="text"
              id="pertanyaan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="think-time"
              className="mb-1 text-sm font-semibold text-gray-700 block">
              Waktu berpikir:
            </label>
            <input
              type="time"
              id="think-time"
              value={thinkTime}
              onChange={(e) => setThinkTime(e.target.value)}
              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="answer-time"
              className="mb-1 text-sm font-semibold text-gray-700 block">
              Waktu jawab:
            </label>
            <input
              type="time"
              id="answer-time"
              value={answerTime}
              onChange={(e) => setAnswerTime(e.target.value)}
              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-3 w-[70%]">
            <p className="text-sm font-semibold text-gray-700">Instructions:</p>
            <p className="text-gray-700">{getInstructions()}</p>
          </div>
          <button
            className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
            onClick={startCompetition}>
            Mulai Kompetisi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
