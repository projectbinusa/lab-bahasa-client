import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "../../../component/Navbar1";
import { Pagination } from "flowbite-react";

function QuestionsAnswer() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const class_id = localStorage.getItem("class_id");
  const [searchTerm, setSearchTerm] = useState("");

  const authConfig = {
    headers: {
      "auth-event": `jwt ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/instructur/class/${class_id}/response_competition`,
          authConfig
        );
        if (response.data.data && response.data.data.length > 0) {
          setQuestions(response.data.data);
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
        //     : "Tidak bisa mengambil data",
        //   showConfirmButton: true,
        // });
      }
    };
  
    getQuestions();
  }, []);

  const filteredQuestions = questions.filter((question) =>
    question.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderQuestions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (filteredQuestions.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="py-4">
            Data tidak ditemukan.
          </td>
        </tr>
      );
    }
    return filteredQuestions.slice(startIndex, endIndex).map((question, index) => (
      <tr
        key={question.id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <th
          scope="row"
          className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {startIndex + index + 1}
        </th>
        <td className="whitespace-nowrap px-6 py-4 text-left capitalize">{question.name}</td>
        <td className="whitespace-nowrap px-6 py-4 text-center capitalize">{question.think_time}</td>
        <td className="whitespace-nowrap px-6 py-4 text-center capitalize">{question.answer_time}</td>
        <td className="whitespace-nowrap px-6 py-4 text-center capitalize">{renderAction(question)}</td>
      </tr>
    ));
  };
  
  const isThinkTimeReady = (thinkTime) => {
    try {
      if (!thinkTime) {
        return false;
      }

      const [hours, minutes] = thinkTime.split(":");
      const thinkTimeDate = new Date();
      thinkTimeDate.setHours(parseInt(hours));
      thinkTimeDate.setMinutes(parseInt(minutes));

      const currentTime = new Date();

      return currentTime >= thinkTimeDate;
    } catch (error) {
      console.error("Error checking think time:", error);
      return false;
    }
  };

  const renderAction = (question) => {
    if (!isThinkTimeReady(question.think_time)) {
      return (
        <button
          className="py-2 px-3 bg-gray-400 whitespace-nowrap rounded-lg text-white"
          disabled
        >
          Belum saatnya menjawab
        </button>
      );
    } else if (
      isThinkTimeReady(question.think_time) &&
      !isThinkTimeReady(question.answer_time)
    ) {
      return (
        <Link
          to={`/student-answer/${question.id}`}
          className="py-2 px-3 bg-blue-500 whitespace-nowrap rounded-lg text-white"
        >
          Jawab
        </Link>
      );
    } else {
      return (
        <button className="py-2 px-3 bg-red-500 whitespace-nowrap rounded-lg text-white" disabled>
          Waktu Habis
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
    <Navbar />
    <div className="px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h6 className="text-xl text-left font-bold text-gray-900 dark:text-white">
            Pertanyaan
          </h6>
            <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
              <div className="flex items-center w-full md:w-auto">
                <input
                  type="search"
                  id="search-dropdown"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block p-2.5 w-full z-1 text-sm rounded-l-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Cari pertanyaan..."
                  required
                />
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="flex-shrink-0 z-1 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    No
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-left">
                    Pertanyaan
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-center">
                    Waktu Berfikir
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-center">
                    Waktu Penjawab
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-4">
                      Tidak ada pertanyaan.
                    </td>
                  </tr>
                ) : (
                  renderQuestions()
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsAnswer;
