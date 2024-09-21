import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ShortUniqueId from "short-unique-id";

const Searchpage = () => {
  const [searchParam] = useSearchParams();
  const [packagesinfo, setPackagesinfo] = useState([]);
  const { randomUUID } = new ShortUniqueId({ length: 10 });

  useEffect(() => {
    getpackagesinfo();
  }, [searchParam.get("q")]);

  const getpackagesinfo = async () => {
    const infodata = await fetch(
      "https://api.npms.io/v2/search?q=" + searchParam.get("q")
    );
    const infojson = await infodata.json();
    const results = infojson.results || [];
    setPackagesinfo(results);
  };

  return (
    <div className=" w-full px-40">
      {packagesinfo.map((packageDetail) => (
        <div
          className="package-card cursor-pointer flex items-center justify-between gap-2 pb-4 pt-4 border-b border-gray-300 mb-4 flex-wrap"
          key={packageDetail.package.name}
        >
          <div className="left grid grid-cols-1 gap-2">
            <div className="title font-bold underline">
              <Link
                to={"/package/" + packageDetail.package.name}
                key={randomUUID()}
              >
                {packageDetail.package.name}
              </Link>
              {searchParam.get("q") === packageDetail.package.name && (
                <span className="exact-match rounded bg-purple-100 transition-all duration-150 ease-in ml-6 tracking-wide px-2 py-1">
                  exact match
                </span>
              )}
            </div>
            <div className="description text-base text-gray-600">
              {packageDetail.package.description}
            </div>
            {packageDetail.package.keywords && (
              <div className="key-words flex flex-wrap gap-2">
                {packageDetail.package.keywords.map((keyword, index) => (
                  <div
                    className="pill rounded bg-gray-100 px-2 py-1 text-gray-900"
                    key={keyword + index}
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 text-gray-500">
              <div>{packageDetail.package.publisher.username}</div>
              <div>published {packageDetail.package.version}</div>
            </div>
          </div>
          {/* Add score measures if needed */}
        </div>
      ))}
    </div>
  );
};

export default Searchpage;
