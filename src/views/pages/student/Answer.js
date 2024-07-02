import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../../component/Navbar1";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function AnswerQuestion() {
  const [question, setQuestion] = useState(null);
  const [question_id, setQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
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
        const duration = parseTimeToSeconds(questionData.answer_time);
        setTimeLeft(duration);
      } else {
        Swal.fire({
          icon: "error",
          title: "Tidak ada pertanyaan untuk kelas ini.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Terjadi Kesalahan",
      //   text: error.response
      //     ? error.response.data.message
      //     : "Tidak bisa mendapatkan data",
      //   showConfirmButton: true,
      // });
    }
  };

  useEffect(() => {
    getQuestion();
  }, [class_id, param.id]);

  useEffect(() => {
    if (timeLeft === 0) {
      Swal.fire({
        icon: "info",
        title: "Waktu habis!",
        showConfirmButton: true,
      }).then(() => {
        history.push(`/result/${param.id}`);
      });
    }

    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, history, param.id]);

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

  const submitAnswer = async () => {
    const data = {
      question_id: question_id,
      answer: answer,
    };

    try {
      const response = await axios.post(
        `${API_DUMMY}/api/user/class/${class_id}/answer`,
        data,
        authConfig
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Jawaban berhasil disimpan.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          history.push(`/question-answer/${class_id}`);
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Jawaban gagal disimpan.",
        text: error.response
          ? error.response.data.message
          : "Terjadi kesalahan",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="content-page container mx-auto mt-10">
        <div className="w-11/12 p-3 bg-white rounded-lg shadow-lg border border-gray-300 mx-auto">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Jawab Pertanyaan
          </h1>
          {question && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {question.name}
              </p>
              <div className="mb-3">
                <label
                  htmlFor="answer"
                  className="mb-1 text-sm font-semibold text-gray-700 block">
                  Jawaban:
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  rows="4"
                />
              </div>
              <button
                className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                onClick={submitAnswer}>
                Kirim Jawaban
              </button>
              <p className="text-sm font-semibold text-gray-700 mt-3">
                Sisa Waktu: {formatTime(timeLeft)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerQuestion;
