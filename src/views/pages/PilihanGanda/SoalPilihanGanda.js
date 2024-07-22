import React, { useEffect, useState } from "react";
import axios from "axios"; // Jangan lupa untuk mengimpor axios
import Navbar from "../../../component/Navbar1";
import { Button } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import EditSoal from "./EditSoal"; // Import komponen EditSoal
import PilihanGanda from "../response/PilihanGanda";
import Swal from "sweetalert2";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function SoalPilihanGanda() {
  const [list, setList] = useState([]);
  const class_id = localStorage.getItem("class_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [question_text, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correct_answer, setCorrectAnswer] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // Tambahkan state untuk melacak ID pertanyaan yang dipilih

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/multiple_choice_questions?limit=${limit}&name=${searchTerm}&page=${currentPage}`,
        authConfig
      );
      setList(response.data.data);
      console.log(response.data.data);
      setTotalPages(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, limit, searchTerm]);

  const getById = async (id) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/multiple_choice_questions/${id}`,
        authConfig
      );
      const data = response.data.data;
      setQuestionText(data.question_text);
      setCorrectAnswer(data.correct_answer);
      setOptions(data.options);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswer(index);
  };

  const handleEditSubmit = async () => {
    try {
      const payload = {
        question_text,
        options,
        correct_answer,
      };
      await axios.put(
        `${API_DUMMY}/api/instructur/class/${class_id}/multiple_choice_questions/${selectedQuestionId}`,
        payload,
        authConfig
      );
      setOpenEdit(false);
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `${API_DUMMY}/api/instructur/class/${class_id}/multiple_choice_questions/${id}`,
        authConfig
      );
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Data ini akan di hapus dan tidak akan bisa kembali!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Data Berhasil di Hapus.",
            icon: "success",
          });
        }
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const indexToLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen h-max from-slate-100 bg-gradient-to-b to-blue-200">
        <Navbar />
        <div className="p-3 md:flex block justify-around">
          <div className="w-full">
            <h2 className="font-bold text-xl bg-blue-500 w-fit rounded-lg text-white px-2 mb-4">
              Soal Pilihan Ganda
            </h2>
            <hr />
            {list.map((data, index) => (
              <div className="flex gap-3 p-4" key={data.id}>
                <div>
                  <button
                    onClick={() => {
                      getById(data.id);
                      setSelectedQuestionId(data.id);
                    }}
                    className="p-2 w-11 rounded-md text-white bg-blue-500 border-2 border-blue-500 h-fit">
                    {index + 1}
                  </button>
                </div>
                <div>
                  <p>{data.question_text}</p>
                  {data.options.map((option, optIndex) => (
                    <div
                      className="flex items-center mb-2 gap-3 mt-3"
                      key={optIndex}>
                      <input
                        type="radio"
                        checked={optIndex === data.correct_answer}
                        name={`question-${data.id}`}
                        className="ml-2"
                        readOnly
                      />
                      <div className="flex gap-1">
                        <p>
                          {" "}
                          {indexToLetter(optIndex)}. {option}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-[70%] w-full h-fit rounded-b-md bg-white">
            <div className="border h-fit border-gray-300 rounded-lg">
              <h2 className="font-bold text-lg bg-blue-500 w-full rounded-t-lg h-11  text-white px-2 mb-2">
                {question_text}
              </h2>
              {selectedQuestionId && (
                <div className="flex gap-3 p-3">
                  <button
                    onClick={() => setOpenEdit(true)}
                    className="text-white p-3 rounded-lg bg-blue-500 border-2 border-blue-500 h-fit w-12">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => deleteData(selectedQuestionId)}
                    className="text-white p-3 rounded-lg bg-red-500 border-2 border-red-500 h-fit w-12">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              )}
              {openEdit && (
                <div className="content-page container mx-auto mt-3 mb-5">
                  <div className="w-11/12 p-3 bg-white rounded-lg shadow-lg border border-gray-300 mx-auto">
                    <h2 className="font-bold text-lg bg-blue-500 w-fit rounded-lg text-white px-2 mb-4">
                      Edit Soal Pilihan Ganda
                    </h2>
                    <div className="mb-5">
                      <div className="mb-3 mt-3">
                        <label
                          htmlFor="pertanyaan"
                          className="mb-1 text-sm font-semibold text-gray-700 block">
                          Pertanyaan :
                        </label>
                        <textarea
                          type="text"
                          id="pertanyaan"
                          value={question_text}
                          onChange={(e) => setQuestionText(e.target.value)}
                          className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="mb-1 text-sm font-semibold text-gray-700 block">
                          Pilihan Ganda:
                        </label>
                        {options.map((option, index) => (
                          <div className="flex items-center mb-2" key={index}>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="radio"
                              checked={index === correct_answer}
                              onChange={() => handleCorrectAnswerChange(index)}
                              name="correctOption"
                              className="ml-2"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleEditSubmit}
                      className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
                      Edit
                    </button>
                  </div>
                </div>
              )}
              <PilihanGanda />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoalPilihanGanda;
