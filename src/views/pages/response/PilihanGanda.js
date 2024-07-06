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
  const [questions, setQuestions] = useState([
    { name: "", options: ["", "", "", ""], correctOption: null },
  ]);
  const [thinkTime, setThinkTime] = useState("");
  const [answerTime, setAnswerTime] = useState("");

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].name = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { name: "", options: ["", "", "", ""], correctOption: null },
    ]);
  };

  const saveChange = async () => {
    const data = questions.map((q) => ({
      question_text: q.name,
      options: q.options,
      correct_answer: q.correctOption,
    }));
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
            Kompetisi Respon Pilihan Ganda
          </h1>
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
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-5">
              <div className="mb-3 mt-3">
                <label
                  htmlFor={`pertanyaan-${questionIndex}`}
                  className="mb-1 text-sm font-semibold text-gray-700 block"
                >
                  Pertanyaan {questionIndex + 1}:
                </label>
                <input
                  type="text"
                  id={`pertanyaan-${questionIndex}`}
                  value={question.name}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 text-sm font-semibold text-gray-700 block">
                  Pilihan Ganda:
                </label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          questionIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                      className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                      placeholder={`Pilihan ${optionIndex + 1}`}
                    />
                    <input
                      type="radio"
                      name={`correctOption-${questionIndex}`}
                      checked={question.correctOption === optionIndex}
                      onChange={() =>
                        handleCorrectOptionChange(questionIndex, optionIndex)
                      }
                      className="ml-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            onClick={addQuestion}
          >
            Tambah Pertanyaan
          </button>
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
