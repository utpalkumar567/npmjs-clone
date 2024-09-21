import React, { useEffect, useState } from "react";
import { SEARCH_SUGGESTION } from "../Constant";
import ShortUniqueId from "short-unique-id";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { randomUUID } = new ShortUniqueId({ length: 10 });

  const handleClick = () => {
    const url = "/search?q=" + searchQuery;
    window.location.href = url;
  };

  useEffect(() => {
    getSearchSuggestion();
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(SEARCH_SUGGESTION + searchQuery);
    const json = await data.json();
    setSearchSuggestion(json);
  };

  return (
    <>
      <div>
        <ul className="flex gap-8 pl-12 py-4 border border-b-2">
          <li>Pro</li>
          <li>Teams</li>
          <li>Pricing</li>
          <li>Documentation</li>
        </ul>
      </div>
      <div className="flex justify-between w-full px-16 py-4">
        <div className="content-center w-24">
          <a href="/" aria-hidden="true">
            <span>
              <svg viewBox="0 0 780 250" aria-hidden="true">
                <path
                  fill="#231F20"
                  d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
                ></path>
              </svg>
            </span>
          </a>
        </div>
        <div className="w-full flex justify-center">
          <div className=" flex w-full justify-center px-1">
            <input
              className=" border border-black w-3/4 px-4 py-4 tems-center content-center"
              type="search"
              placeholder="Search Packages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setTimeout(() => setShowSuggestion(false), 500)}
            ></input>
            <button
              className="bg-black text-white md:px-4"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
          {showSuggestion && (
            <div className="py-2 absolute mt-16 bg-white w-3/5 rounded-lg border border-gray-100">
              <ul>
                {searchSuggestion.map((s) => (
                  <a href={"/package/" + s.name}>
                    <div className=" flex py-1 px-3 shadow-sm hover:bg-gray-100 justify-between items-center">
                      <ul className=" flex flex-col">
                        <li className="font-bold" key={randomUUID()}>
                          {s.name}
                        </li>

                        <li key={randomUUID()}>{s.description}</li>
                      </ul>

                      <ul>
                        <li key={randomUUID()}>{s.version}</li>
                      </ul>
                    </div>
                  </a>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex w-1/5 justify-end gap-4">
          <button className="bg-gray-300 border border-black px-4 ">
            Sign In
          </button>
          <button>Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Header;
