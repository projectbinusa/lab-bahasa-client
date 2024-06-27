import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "../../../component/Navbar1";

function QuestionsAnswer() {
  const [questions, setQuestions] = useState([]);
  const class_id = localStorage.getItem("class_id");

  const authConfig = {
    headers: {
      "auth-event": `jwt ${localStorage.getItem("token")}`,
    },
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/response_competition`,
        authConfig
      );
      if (response.data.data && response.data.data.length > 0) {
        setQuestions(response.data.data);
        console.table(response.data.data);
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
      //     : "Tidak bisa get data",
      //   showConfirmButton: true,
      // });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getQuestions();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="px-32">
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
          <div className="flex justify-between">
            <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Pertanyaan
            </h6>
          </div>
          <hr />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-center text-xs text-white uppercase bg-green-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Pertanyaan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Waktu Berfikir
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Waktu Penjawab
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {questions.map((question, index) => (
                  <tr
                    key={question.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-left capitalize">
                      {question.name}
                    </td>
                    <td className="px-6 py-4 text-left capitalize">
                      {question.think_time}
                    </td>
                    <td className="px-6 py-4 text-left capitalize">
                      {question.answer_time}
                    </td>
                    <td className="px-6 py-4 text-left capitalize">
                      <Link
                        to={`/student-answer/${question.id}`}
                        className="py-2 px-3 bg-blue-500 rounded-lg text-white ">
                        Jawab
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAnswer;
