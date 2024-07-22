import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
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
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isAnsweredByOther, setIsAnsweredByOther] = useState(false);
  const class_id = localStorage.getItem("class_id");
  const param = useParams();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");

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
        await checkIfAnswered(questionData.id);
      } else {
        Swal.fire({
          icon: "error",
          title: "Tidak ada pertanyaan untuk kelas ini.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfAnswered = async (questionId) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/answer/question/${questionId}`,
        authConfig
      );
      const answers = response.data.data;
      setIsAnsweredByOther(answers.length > 0); // Check if there is any answer
      const userAnswer = answers.find(
        (answer) => answer.user_id == user_id
      );
      setHasAnswered(!!userAnswer);
      console.log("data: ", response.data.data);
      console.log("user answer: ", userAnswer);
    } catch (error) {
      console.log(error);
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
        navigate(`/result/${param.id}`);
      });
    }

    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, param.id]);

  const parseTimeToSeconds = (isoTime) => {
    const target = new Date(isoTime);
    const now = new Date();

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
    if (hasAnswered) {
      Swal.fire({
        icon: "warning",
        title: "Pertanyaan ini sudah di jawab oleh orang lain / anda sudah menjawab pertanyaan ini.",
        showConfirmButton: true,
      });
      return;
    }
    if (isAnsweredByOther) {
      Swal.fire({
        icon: "warning",
        title: "Pertanyaan ini sudah di jawab oleh orang lain / anda sudah menjawab pertanyaan ini.",
        showConfirmButton: true,
      });
      return;
    }

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
        setHasAnswered(true);
        Swal.fire({
          icon: "success",
          title: "Jawaban berhasil disimpan.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(`/question-answer/${class_id}`);
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
              <p className="text-xl mt-3 font-semibold text-gray-700 mb-3">
                {question.name}
              </p>
              {isAnsweredByOther ? (
                <textarea
                  id="answer"
                  disabled
                  placeholder="Pertanyaan ini sudah di jawab oleh orang lain / anda sudah menjawab pertanyaan ini"
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
              ) : hasAnswered ? (
                <textarea
                  id="answer"
                  disabled
                  placeholder="Pertanyaan ini sudah di jawab oleh orang lain / anda sudah menjawab pertanyaan ini"
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
              ) : (
                <div>
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
                      className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows="4"
                    />
                  </div>
                  <button
                    className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    onClick={submitAnswer}>
                    Kirim Jawaban
                  </button>
                </div>
              )}
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
