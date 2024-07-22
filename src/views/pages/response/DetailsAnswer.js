import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../../component/Navbar1";
import Swal from "sweetalert2";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function DetailsAnswer() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [question_id, setQuestionId] = useState("");
  const [limit, setLimit] = useState(10);
  const [answerMultipleQuestion, setAnswerMultipleQuestion] = useState([]);
  const [multiple_questions_id, setMultiple_questions_id] = useState([]);
  const class_id = localStorage.getItem("class_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const param = useParams();
  const [question, setQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [score, setScore] = useState(0);

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
      console.log("list: ", filteredList);
      setTotalPages(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const indexToLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/answer/${param.id}`,
        authConfig
      );
      const data = response.data.data;
      setQuestionId(data.question_id);
      setAnswerMultipleQuestion(data.answer_multiple_question);
      getQuestion(data.question_id);
      setScore(data.score);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestion = async (question_id) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/response_competition/${question_id}`,
        authConfig
      );
      if (response.data.data) {
        const questionData = response.data.data;
        setQuestion(questionData);
        setMultiple_questions_id(questionData.multiple_questions_id);
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

  const calculateCorrectAndWrongAnswers = (list, answers) => {
    let correct = 0;
    let wrong = 0;
    list.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correct++;
      } else {
        wrong++;
      }
    });
    setCorrectAnswers(correct);
    setWrongAnswers(wrong);
  };

  useEffect(() => {
    getById();
  }, []);

  useEffect(() => {
    if (multiple_questions_id.length > 0) {
      getAllData();
    }
  }, [multiple_questions_id, currentPage, searchTerm]);

  useEffect(() => {
    if (list.length > 0 && answerMultipleQuestion.length > 0) {
      calculateCorrectAndWrongAnswers(list, answerMultipleQuestion);
    }
  }, [list, answerMultipleQuestion]);

  return (
    <>
      <div className="flex flex-col max-h-fit min-h-screen bg-gray-100">
        <Navbar />
        <div className="content-page container p-5">
          <div className="md:flex block justify-around gap-4">
            {question && (
              <div className="w-full">
                <h1 className="font-bold text-xl bg-blue-700 w-fit rounded-lg text-white px-2 mb-4">
                  Detail Koreksi
                </h1>
                <hr />
                {list.map((data, index) => (
                  <div className="flex gap-3 p-4" key={data.id}>
                    <div>
                      <p className="text-center p-2 w-11 rounded-md text-white bg-blue-700 border-2 border-blue-500">
                        {index + 1}
                      </p>
                    </div>
                    <div>
                      <p>{data.question_text}</p>
                      {data.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex gap-2">
                          <input
                            type="radio"
                            checked={answerMultipleQuestion[index] === optIndex}
                            name={`question-${data.id}`}
                            className={`ml-2 mt-3 ${
                              answerMultipleQuestion[index] !==
                                data.correct_answer &&
                              answerMultipleQuestion[index] === optIndex
                                ? "text-red-500"
                                : ""
                            }`}
                            readOnly
                          />
                          <p
                            className={`mt-2 ${
                              answerMultipleQuestion[index] !==
                                data.correct_answer &&
                              answerMultipleQuestion[index] === optIndex
                                ? "text-red-500"
                                : ""
                            }`}>
                            {indexToLetter(optIndex)}. {option}
                          </p>
                        </div>
                      ))}
                      <p className="mt-2">
                        Jawaban Yang Benar :{" "}
                        {indexToLetter(data.correct_answer)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <form className="md:fixed right-7 w-fit rounded-lg border border-gray-200 shadow-md h-fit">
              <div className="bg-blue-500 h-fit rounded-t-lg">
                <h2 className="font-bold text-white p-3 text-xl">
                  Score : {score}
                </h2>
              </div>
              <div className="p-3">
                <h2 className="font-bold text-gray-500 text-xl mb-3">
                  Total Soal Pilihan Ganda : {list.length}
                </h2>
                <h2 className="font-bold text-gray-500 text-xl mb-3">
                  Total Jawaban Benar : {correctAnswers}
                </h2>
                <h2 className="font-bold text-gray-500 text-xl mb-3">
                  Total Jawaban Salah : {wrongAnswers}
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsAnswer;
