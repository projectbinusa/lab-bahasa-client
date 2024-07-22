import React from "react";

function EditSoal() {
  return (
    <>
      {" "}
      <div className="content-page container mx-auto mt-3 mb-5">
        <div className="w-11/12 p-3 bg-white rounded-lg shadow-lg border border-gray-300 mx-auto">
          <h2 className="font-bold text-lg bg-blue-500 w-fit rounded-lg text-white px-2 mb-4">
            Edit Soal Pilihan Ganda
          </h2>
          <div key="" className="mb-5">
            <div className="mb-3 mt-3">
              <label
                htmlFor={`pertanyaan`}
                className="mb-1 text-sm font-semibold text-gray-700 block">
                Pertanyaan :
              </label>
              <input
                type="text"
                id={`pertanyaan`}
                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 text-sm font-semibold text-gray-700 block">
                Pilihan Ganda:
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <input type="radio" name={`correctOption`} className="ml-2" />
              </div>
            </div>
          </div>
          <button className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

export default EditSoal;
