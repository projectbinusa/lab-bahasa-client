import { faUsers, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ResponseCompetition() {
  return (
    <div className="flex">
      <div className="flex h-full">
        <div className="content-page container p-8 ml-0 md:ml-10">
          <div className="grid grid-cols-5 gap-5">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative p-2 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-gray-300 rounded-lg text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">
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
