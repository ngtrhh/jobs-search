import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Details from "./pages/Details";
import slugify from "react-slugify";

const cities = ["London", "Amsterdam", "New York", "Berlin"];

const scheduleTypes = ["Full-time", "Contractor", "Part-time"];

const initKeyword = {
  location: "",
  query: cities[0],
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState(initKeyword || keyword);

  const fetchJobs = async (keyword) => {
    fetch(
      `http://localhost:5000/?query=${keyword.query}&location=${keyword.location}`
    )
      .then((res) => res.json())
      .then((res) => {
        const newJobs = res.map((item) => ({
          ...item,
          slug: slugify(item.title),
          schedule_type: item.detected_extensions.schedule_type.split(" and "),
        }));
        setJobs(newJobs);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchJobs(keyword);
    console.log(jobs);
  }, [keyword]);

  const handleSearch = (value) => {
    setKeyword(value);
  };

  return (
    <div className="container">
      <div className="header">
        <b>Github</b>Jobs
      </div>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <Search
              data={jobs}
              cities={cities}
              handleSearch={handleSearch}
              location={keyword.location || cities[0]}
              query={keyword.query === cities[0] ? "" : keyword.query}
              scheduleTypes={scheduleTypes}
            />
          )}
        />
        <Route path="/:id" Component={() => <Details />} />
      </Routes>
      <div className="footer">
        created by <span> Nguyen Ngoc Trinh </span> - devChallenges.io
      </div>
    </div>
  );
}

export default App;
