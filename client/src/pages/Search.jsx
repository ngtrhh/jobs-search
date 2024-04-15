import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";

var initSubInput = "";

const Search = ({
  data,
  cities,
  handleSearch,
  location,
  query,
  scheduleTypes,
}) => {
  const [city, setCity] = useState(location);
  const [mainInput, setMainInput] = useState(query);
  const [subInput, setSubInput] = useState(initSubInput);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [types, setTypes] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);

  const handleSelectCity = (value, type) => {
    setCity(value);
    if (type === 0) {
      setSubInput("");
      initSubInput = "";
    } else {
      setSubInput(value);
      initSubInput = value;
    }
  };

  const handleCheckbox = (e) => {
    const value = e.target.name;
    if (e.target.checked === true) {
      setTypes([...types, value]);
    } else {
      const selected = types.filter((t) => {
        if (t === e.target.name) return false;
        return true;
      });
      setTypes([...selected]);
    }
  };

  useEffect(() => {
    if (types.length === 0) {
      setFilterJobs(data);
    } else if (types.length === 1) {
      const filter = [];
      for (let i = 0; i < data.length; i++)
        if (types.some((v) => data[i].schedule_type.includes(v)))
          filter.push(data[i]);
      setFilterJobs(filter);
    } else if (types.length >= 2) {
      const filter = [];
      for (let i = 0; i < data.length; i++)
        if (types.every((v) => data[i].schedule_type.includes(v)))
          filter.push(data[i]);
      setFilterJobs(filter);
    }

    console.log(filterJobs);
  }, [types]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFisrt = indexOfLast - itemsPerPage;
  const currentItems = filterJobs.slice(indexOfFisrt, indexOfLast);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterJobs.length / itemsPerPage); i++)
    pageNumbers.push(i);

  return (
    <div className="search">
      {data.length !== 0 ? (
        <>
          <form
            action="/"
            method="POST"
            // onSubmit={(e) => handleSearch(e, { location: city, query: mainInput })}
          >
            <div className="search__search">
              <div className="search-input">
                <div className="input">
                  <span className="material-symbols-outlined">work</span>
                  <input
                    value={mainInput}
                    name="query"
                    placeholder="Title, companies, expertise or benefits"
                    onChange={(e) => setMainInput(e.target.value)}
                  />
                </div>
                {/* <Link
            to={{
              pathname: "/",
              search: "?query=" + mainInput + "&location=" + city,
            }}
          > */}
                <button
                  onClick={() =>
                    handleSearch({ location: city, query: mainInput })
                  }
                >
                  Search
                </button>
                {/* </Link> */}
              </div>
            </div>

            <div className="search__row">
              <div className="filter">
                <div className="check-list">
                  {scheduleTypes.map((item, index) => (
                    <div key={index} className="check">
                      <input
                        type="checkbox"
                        name={item}
                        onChange={(e) => handleCheckbox(e)}
                        checked={types.includes(item)}
                      />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="label">Location</div>
                <div className="search">
                  <span className="material-symbols-outlined">public</span>
                  <input
                    placeholder="City, state, or country"
                    onChange={(e) => handleSelectCity(e.target.value)}
                    value={subInput}
                  />
                </div>
                <div className="check-list">
                  {cities.map((item, index) => (
                    <div key={index} className="check">
                      <input
                        type="radio"
                        value={item}
                        name="location"
                        checked={item === city}
                        onChange={(e) => handleSelectCity(e.target.value, 0)}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="job-list">
                {currentItems?.map((item, index) => (
                  <JobCard key={index} item={item} />
                ))}
              </div>
            </div>
          </form>

          {filterJobs.length > itemsPerPage && (
            <div className="pagination">
              <button
                className={
                  currentPage === 1
                    ? "pagination__item material-symbols-outlined disable"
                    : "pagination__item material-symbols-outlined"
                }
                onClick={() => {
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              >
                chevron_left
              </button>

              {pageNumbers.map((item, index) => (
                <button
                  key={index}
                  className={
                    item === currentPage
                      ? "pagination__item active"
                      : "pagination__item"
                  }
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              ))}

              <button
                className={
                  currentPage === pageNumbers.length
                    ? "pagination__item material-symbols-outlined disable"
                    : "pagination__item material-symbols-outlined"
                }
                onClick={() => {
                  if (currentPage < pageNumbers.length)
                    setCurrentPage(currentPage + 1);
                }}
              >
                chevron_right
              </button>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Search;
