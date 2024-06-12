import { useEffect, useState } from "react";
import "../../../App.css";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../../../component/Navbar1";
import { API_DUMMY } from "../../../utils/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function ScoreAnswer() {
  const [score, setScore] = useState("");
  const param = useParams();
  const history = useHistory()

  const update = async (e) => {
    e.preventDefault();

    const data = {
      score: score,
    };

    let url_hit = `${API_DUMMY}/api/instructur/class/${localStorage.getItem(
      "class_id"
    )}/answer/${param.id}`;
    try {
      const response = await axios.put(url_hit, data, authConfig);
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Menbgetdi data kelas.",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/reesponse-competition")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${localStorage.getItem(
          "class_id"
        )}/answer/${param.id}`,
        authConfig
      );
      const data = response.data.data;
      console.log(data);
      setScore(data.score);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="content-page container mx-auto p-8">
          <div className="add-class mt-12 bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
              Update Score
            </h1>
            <form onSubmit={update}>
              <div className="relative mb-5 mt-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Score
                </label>
                <input
                  type="text"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="Masukkan Score"
                  required
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white bg-green-400 hover:bg-green-600 text-base font-semibold">
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
