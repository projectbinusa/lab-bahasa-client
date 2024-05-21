import { faUsers, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Navbar from "../../../component/Navbar1";

function ResponseCompetition() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="content-page container p-8 ml-0 md:ml-10 mt-12">
          <div className="grid grid-cols-5 gap-5 mt-5">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative p-5 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-gray-300 rounded-lg text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-5xl mb-2">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Nama Siswa {index + 1}
                      </h3>
                      <div className="flex mt-1 text-yellow-500">
                        <FontAwesomeIcon icon={faStar} className="text-xs" />
                        <FontAwesomeIcon icon={faStar} className="text-xs" />
                        <FontAwesomeIcon icon={faStar} className="text-xs" />
                        <FontAwesomeIcon icon={faStar} className="text-xs" />
                        <FontAwesomeIcon icon={faStar} className="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponseCompetition;
