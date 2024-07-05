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

function PilihanGanda() {
  const [name, setName] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const [thinkTime, setThinkTime] = useState("");
  const [answerTime, setAnswerTime] = useState("");

  const saveChange = async () => {
    const data = {
      name: name,
      options: options,
      correct_option: correctOption,
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

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const startCompetition = () => {
    saveChange().then(() => {
      window.location.reload("/question");
    });
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
              htmlFor="pertanyaan"
              className="mb-1 text-sm font-semibold text-gray-700 block"
            >
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
              className="mb-1 text-sm font-semibold text-gray-700 block"
            >
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
              className="mb-1 text-sm font-semibold text-gray-700 block"
            >
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
          <div className="mb-3">
            <label className="mb-1 text-sm font-semibold text-gray-700 block">
              Pilihan Ganda:
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder={`Pilihan ${index + 1}`}
                />
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctOption === index}
                  onChange={() => setCorrectOption(index)}
                  className="ml-2"
                />
              </div>
            ))}
          </div>
          <button
            className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
            onClick={startCompetition}
          >
            Mulai Kompetisi
          </button>
        </div>
      </div>
    </div>
  );
}

export default PilihanGanda;
