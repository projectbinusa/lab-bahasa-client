import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function AnswerQuestion() {
  const [question, setQuestion] = useState(null);
  const [question_id, setQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const class_id = localStorage.getItem("class_id");
  const param = useParams();
  const history = useHistory();

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/response_competition/${param.id}`,
        authConfig
      );
      if (response.data.data) {
        const questionData = response.data.data;
        setQuestion(questionData);
        setQuestionId(questionData.id);
      } else {
        Swal.fire({
          icon: "error",
          title: "Tidak ada pertanyaan untuk kelas ini.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: error.response
          ? error.response.data.message
          : "Tidak bisa mendapatkan data",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getQuestion();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const saveChange = async (e) => {
    e.preventDefault();
    if (!question) {
      Swal.fire({
        icon: "error",
        title: "Tidak ada pertanyaan yang tersedia.",
        showConfirmButton: true,
      });
      return;
    }
    const data = {
      question_id: question_id,
      answer: answer,
    };
    const url_hit = `${API_DUMMY}/api/user/class/${class_id}/answer`;
    try {
      const response = await axios.post(url_hit, data, authConfig);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Jawaban.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload("/response-competition/"+localStorage.getItem("class_id"));
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Data.",
          text: response.data.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: error.response ? error.response.data.message : "Network Error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex mt-10">
      <div className="content-page container mx-auto">
        <div className="w-full p-4 bg-white rounded-xl shadow-xl border border-gray-300">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Jawab Pertanyaan
          </h1>
          {question && (
            <form onSubmit={saveChange}>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Pertanyaan:
                </p>
                <div className="mb-2">
                  <p className="text-gray-700 capitalize">{question.name}</p>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="answer"
                  className="mb-2 text-sm font-semibold text-gray-700 block"
                >
                  Jawaban:
                </label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block w-full p-2 text-base text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="Masukkan jawaban Anda"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
              >
                Kirim Jawaban
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerQuestion;
