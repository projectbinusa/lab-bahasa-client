import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function AddUser() {
  const [user_name, setUserName] = useState("");
  const [user_id, setUserId] = useState("");
  const [userChat, setUserChat] = useState([]);
  const class_id = localStorage.getItem("class_id");
  const history = useHistory();

  const saveChange = async (e) => {
    e.preventDefault();
    const jsonData = {
      user_id: user_id,
      user_name: user_name,
    };
    let url_hit = `${API_DUMMY}/api/class/${class_id}/user_chat`;
    try {
      const response = await axios.post(url_hit, jsonData, authConfig);
      if (response.status === 200) {
        history.push("/face-to-face-chat/" + localStorage.getItem("class_id"));
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Data.",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllChatUser()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChatUser = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${localStorage.getItem(
          "class_id"
        )}/management_name_list?limit=100`,
        authConfig
      );
      setUserChat(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAllChatUser();
  }, []);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setUserName(selectedOption.getAttribute("data-username"));
    setUserId(selectedOption.value);
  };

  return (
    <>
      <div className="content-page container mx-auto p-8">
        <div className="add-class mt-12 bg-white p-8 rounded-xl shadow-xl border border-gray-300">
          <form onSubmit={saveChange}>
            <div className="relative mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Nama User
              </label>
              <select
                className="flex-shrink-0 z-1 inline-flex w-full rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                onChange={handleSelectChange}>
                <option selected>Pilih User</option>
                {userChat.map((down) => (
                  <option
                    key={down.id}
                    value={down.id}
                    data-username={down.name}>
                    {down.name}
                  </option>
                ))}
              </select>
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
    </>
  );
}

export default AddUser;
