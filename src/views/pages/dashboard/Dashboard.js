import React from "react";
import Navbar from "../../../component/Navbar1";

function Dashboard() {
  return (
    <>
      <div className="all bg-[#F4F4F4]">
        <Navbar />
        <div className="min-h-screen px-32 mt-10">
          <div className="card grid grid-cols-2 gap-4 mb-10">
            <div className="card-1 rounded-lg text-white bg-[#00FFAB]">
              <div className="px-8 py-5 flex justify-between">
                <div className="icon">Icon</div>
                <div className="ket text-right">
                  <p className="text-xl font-semibold">Jumlah Siswa</p>
                  <p className="text-3xl font-bold">20</p>
                </div>
              </div>
              <div className="text-center rounded-b-lg bg-[#14C38E] py-1">
                Lihat Selengkapnya
              </div>
            </div>
            <div className="card-2 rounded-lg text-white bg-[#00FFAB]">
              <div className="px-8 py-5 flex justify-between">
                <div className="icon">Icon</div>
                <div className="ket text-right">
                  <p className="text-xl font-semibold">Jumlah Siswa</p>
                  <p className="text-3xl font-bold">20</p>
                </div>
              </div>
              <div className="text-center rounded-b-lg bg-[#14C38E] py-1">
                Lihat Selengkapnya
              </div>
            </div>
          </div>
          <div className="data-cards">
            <div className="card-class rounded-lg bg-white p-5 mb-4 shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Data Kelas</p>
                <button className="bg-[#00FFAB] text-white py-1 px-4 rounded-lg">
                  Lihat Selengkapnya
                </button>
              </div>
              <div className="mt-4">
                {/* Example data, replace with dynamic content as needed */}
                <ul>
                  <li className="py-2 border-b">Class 1</li>
                  <li className="py-2 border-b">Class 2</li>
                  <li className="py-2 border-b">Class 3</li>
                </ul>
              </div>
            </div>
            <div className="card-student rounded-lg bg-white p-5 shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Data Siswa</p>
                <button className="bg-[#00FFAB] text-white py-1 px-4 rounded-lg">
                  Lihat Selengkapnya
                </button>
              </div>
              <div className="mt-4">
                {/* Example data, replace with dynamic content as needed */}
                <ul>
                  <li className="py-2 border-b">Student 1</li>
                  <li className="py-2 border-b">Student 2</li>
                  <li className="py-2 border-b">Student 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
