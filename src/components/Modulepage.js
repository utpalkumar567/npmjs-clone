import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShortUniqueId from "short-unique-id";

const Modulepage = () => {
  const [moduleinfo, setmoduleinfo] = useState([]);
  const location = useLocation();
  const pathAfterPackage = location.pathname.replace("/package/", "");
  const [activeTab, setActiveTab] = useState("tab1");
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return moduleinfo?.readme && moduleinfo.readme.length > 0 ? (
          <p>{moduleinfo.readme}</p>
        ) : (
          <p>ERROR: No README data found for this module!</p>
        );
      case "tab2":
        return (
          <p>
            {Object.keys(moduleinfo.versions).map((version) => (
              <span key={randomUUID()}>
                {version}
                <br />
              </span>
            ))}
          </p>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    getmoduleinfo();
  }, [pathAfterPackage]);

  const getmoduleinfo = async () => {
    const infodata = await fetch(
      "https://registry.npmjs.org/" + pathAfterPackage
    );
    const infojson = await infodata.json();

    setmoduleinfo(infojson);
  };

  console.log(moduleinfo?.repository?.url?.replace("git+", ""));

  return (
    <>
      <div className="flex flex-col px-2 md:flex-row w-full md:px-12 gap-2">
        <div className=" w-4/5">
          <h1 className="font-bold text-2xl">
            {moduleinfo?.name}
            <br></br>
          </h1>
          <p>
            <span>{moduleinfo["dist-tags"]?.latest}</span>

            <span className=" pl-2">
              {" "}
              Last modified : {moduleinfo?.time?.modified}
            </span>
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg mx-auto">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab("tab1")}
                className={`py-2 px-4 font-semibold ${
                  activeTab === "tab1"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                Read Me
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`py-2 px-4 font-semibold ${
                  activeTab === "tab2"
                    ? "border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                Version
              </button>
            </div>
            <div className="mt-4">{renderContent()}</div>
          </div>
        </div>
        <div className=" w-1/5">
          <div className="bg-white p-4 rounded-lg shadow-lg mx-auto">
            {/* Install section */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm text-gray-700">
                <span className=" font-bold text-lg text-gray-600">
                  Install
                </span>
                <br></br>
                npm i {moduleinfo?.name}
              </p>
              <button className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4"
                  />
                </svg>
              </button>
            </div>

            {/* Repository and Homepage */}
            <div className="mt-2 space-y-1">
              <a
                href={moduleinfo?.repository?.url?.replace("git+", "")}
                className="text-blue-600 flex items-center space-x-2 text-sm"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.25 4.75l7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span>
                  {moduleinfo?.repository?.url
                    ?.replace("git+", "")
                    .replace(/\.git$/, "")}
                </span>
              </a>
              <a
                href={moduleinfo?.homepage}
                className="text-blue-600 flex items-center space-x-2 text-sm"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.25 4.75l7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span>{moduleinfo?.homepage}</span>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-gray-600 text-sm">Weekly Downloads</p>
                  <p className="font-bold text-md">{moduleinfo?.downloads}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Version and other details */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs">Version</p>
                <p className="font-semibold text-sm">
                  {moduleinfo["dist-tags"]?.latest}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">License</p>
                <p className="font-semibold text-sm">{moduleinfo?.license}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Unpacked Size</p>
                <p className="font-semibold text-sm">
                  {moduleinfo?.unpackedSize}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Total Files</p>
                <p className="font-semibold text-sm">{moduleinfo?.files}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Issues</p>
                <p className="font-semibold text-sm">{moduleinfo?.issues}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Pull Requests</p>
                <p className="font-semibold text-sm">
                  {moduleinfo?.pullRequests}
                </p>
              </div>
            </div>

            {/* Last publish */}
            <div className="mt-4">
              <p className="text-gray-500 text-xs">Last publish</p>
              <p className="font-semibold text-sm">
                {moduleinfo?.time?.modified}
              </p>
            </div>

            {/* Try on RunKit and Report */}
            <div className="mt-6 flex flex-col gap-2">
              <button className="bg-green-500 text-white text-sm px-4 py-1 rounded">
                Try on RunKit
              </button>
              <button className="bg-red-500 text-white text-sm px-4 py-1 rounded">
                Report malware
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modulepage;
