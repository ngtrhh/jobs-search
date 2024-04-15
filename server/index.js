const { getJson } = require("serpapi");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3002;

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

const getJobs = async (res, query, location) => {
  try {
    const response = await getJson({
      engine: "google_jobs",
      api_key: process.env.SERPAPI_API_KEY,
      q: query,
      location: location,
      hl: "en",
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

console.log(process.env.SERPAPI_API_KEY);

app.get("/", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const searchParams = url.searchParams;

  const query = searchParams.get("query");
  const location = searchParams.get("location");
  console.log(req.query.query);

  if (location) getJobs(res, query, location);
  else getJobs(res, query);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
