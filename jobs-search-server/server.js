const { getJson } = require("serpapi");
const http = require("http");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const { get } = require("https");
const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("x-requested-with", "XMLHttpRequest");
  res.set("Access-Control-Expose-Headers", "Content-Encoding,api_key");
  res.set("origin", "http://localhost:3000");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

const getJobs = async (res, query, location, schedule_type) => {
  try {
    const response = await getJson({
      engine: "google_jobs",
      api_key: process.env.SERPAPI_API_KEY,
      q: query,
      location: location,
      hl: "en",
      schedule_type: "contractor",
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response.jobs_results));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: error.message }));
  }
};

app.get("/", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const searchParams = url.searchParams;

  const query = searchParams.get("query");
  const location = searchParams.get("location");
  const schedule_type = searchParams.get("schedule_type");

  console.log(schedule_type);

  if (location) getJobs(res, query, location, schedule_type);
  else getJobs(res, query, schedule_type);
});

// const server = http.createServer(async (req, res) => {
//   const allowed_domain = "*";
//   res.setHeader("Access-Control-Allow-Origin", allowed_domain);
//   res.setHeader("Access-Control-Allow-Methods", "GET");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   const url = new URL(req.url, `http://${req.headers.host}`);
//   const searchParams = url.searchParams;
//   const query = searchParams.get("query");

//   try {
//     const response = await getJson({
//       engine: "google_jobs",
//       q: query,
//       hl: "en",
//       api_key: process.env.API_KEY, // Get your API_KEY from https://serpapi.com/manage-api-key
//     });

//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify(response.jobs_results));
//   } catch (error) {
//     res.statusCode = 500;
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify({ error: error.message }));
//   }
// });

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
