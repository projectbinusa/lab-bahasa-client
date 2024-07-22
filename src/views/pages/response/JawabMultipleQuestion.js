import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../utils/api";
import Navbar from "../../../component/Navbar1";
import Swal from "sweetalert2";
import {  useNavigate, useParams } from "react-router-dom";

function JawabMultipleQuestion() {
  const [question, setQuestion] = useState(null);
  const [question_id, setQuestionId] = useState(null);
  const [multiple_questions_id, setMultiple_questions_id] = useState([]);
  const [answer_multiple_question, setAnswer_multiple_question] = useState([]);
  const [answer, setAnswer] = useState("-");
  const [timeLeft, setTimeLeft] = useState(null);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const class_id = localStorage.getItem("class_id");
  const param = useParams();
  const navigate = useNavigate();

  const authConfig = {
    headers: {
      "auth-event": `jwt ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    if (multiple_questions_id.length > 0) {
      getAllData();
    }
  }, [multiple_questions_id, currentPage, limit, searchTerm]);

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/multiple_choice_questions?limit=${limit}&name=${searchTerm}&page=${currentPage}`,
        authConfig
      );
      const filteredList = response.data.data.filter((question) =>
        multiple_questions_id.includes(question.id)
      );
      setList(filteredList);
      setTotalPages(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

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
        setMultiple_questions_id(questionData.multiple_questions_id);
        console.log(questionData.multiple_questions_id);
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
    }
  };

  useEffect(() => {
    getQuestion();
  }, [class_id, param.id, currentPage, limit, searchTerm]);

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

  const submitAnswer = async (e) => {
    e.preventDefault();
    const data = {
      question_id: question_id,
      answer_multiple_question: answer_multiple_question,
      answer: answer,
    };

    try {
      await axios.post(
        `${API_DUMMY}/api/user/class/${class_id}/answer`,
        data,
        authConfig
      );
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Jawaban Akan di kirim KeGuru!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Jawaban Berhasil diKirim.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/question-answer/" + class_id);
        }
      });
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

  const indexToLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="content-page container mx-auto mt-10">
          <div className="w-11/12 bg-white rounded-lg shadow-lg border border-gray-300 mx-auto ">
            {question && (
              <form onSubmit={submitAnswer} className="content-page">
                <div className="flex justify-between bg-blue-500 w-full rounded-t-lg">
                  <h2 className="font-bold h-fit py-1 text-xl text-white px-2">
                    Jawab Pertanyaan <br />
                    <span className="text-base font-normal">Pilihan Ganda</span>
                  </h2>
                  <div className="flex">
                    <p className="text-sm font-semibold text-white mt-5">
                      Sisa Waktu: {formatTime(timeLeft)}
                    </p>
                    <button
                      type="submit"
                      className="bg-blue-700 my-auto p-2 mx-2 text-white h-fit w-fit rounded-lg">
                      Kirim Jawaban
                    </button>
                  </div>
                </div>
                <div>
                  <div className="w-full overflow-y-scroll max-h-96">
                    <hr />
                    {list.map((data, index) => (
                      <div className="flex gap-3 p-4" key={data.id}>
                        <div>
                          <p className="p-2 w-11 rounded-md text-white text-center bg-blue-500 border-2 border-blue-500">
                            {index + 1}
                          </p>
                        </div>
                        <div>
                          <p>{data.question_text}</p>
                          {data.options.map((option, optIndex) => (
                            <div
                              className="flex items-center mb-2 gap-3 mt-3"
                              key={optIndex}>
                              <input
                                type="radio"
                                required
                                value={optIndex} // Menggunakan index sebagai value
                                onChange={() =>
                                  setAnswer_multiple_question([
                                    ...answer_multiple_question,
                                    optIndex,
                                  ])
                                }
                                name={`question-${data.id}`}
                                className="ml-2"
                                readOnly
                              />
                              <div className="flex gap-1">
                                <p> {indexToLetter(optIndex)}. {option}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JawabMultipleQuestion;
