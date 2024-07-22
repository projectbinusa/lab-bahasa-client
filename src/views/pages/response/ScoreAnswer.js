import { useEffect, useState } from "react";
import "../../../App.css";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../../../component/Navbar1";
import { API_DUMMY } from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function ScoreAnswer() {
  const [score, setScore] = useState(0);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [question_id, setQuestionId] = useState("");
  const [limit, setLimit] = useState(10);
  const [multiple_questions_id, setMultiple_questions_id] = useState([]);
  const [answerMultipleQuestion, setAnswerMultipleQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const param = useParams();
  const navigate = useNavigate();
  const class_id = localStorage.getItem("class_id");
  const [question, setQuestion] = useState(null);

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

  const update = async (e) => {
    e.preventDefault();

    const url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/answer/${param.id}`;
    try {
      const response = await axios.put(
        url_hit,
        { score: Number(score) }, // Ensure score is a number
        authConfig
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Memberikan Client Score.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/response-competition/" + class_id);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal memperbarui skor.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan.",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/answer/${param.id}`,
        authConfig
      );
      const data = response.data.data;
      setScore(data.score);
      setQuestionId(data.question_id); // Set question_id here
      setAnswerMultipleQuestion(data.answer_multiple_question);
      getQuestion(data.question_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getById();
  }, []); // Load once on mount

  useEffect(() => {
    if (multiple_questions_id.length > 0) {
      getAllData();
    }
  }, [multiple_questions_id, currentPage, searchTerm]);

  const indexToLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <>
      <div className="flex flex-col max-h-fit min-h-screen bg-gray-100">
        <Navbar />
        <div className="content-page container p-5">
          <div className="md:flex block justify-around gap-4">
            {question && (
              <div className="w-full">
                <h1 className="font-bold text-xl bg-blue-700 w-fit rounded-lg text-white px-2 mb-4">
                  Pemberian Score
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
            <form onSubmit={update} className="w-[50%]">
              <div className="mb-5 mt-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Score
                </label>
                <input
                  type="number"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  placeholder="Masukkan Score"
                  required
                  defaultValue={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white bg-blue-400 hover:bg-blue-600 text-base font-semibold">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreAnswer;
