"use strict";

const express = require("express");
const morgan = require("morgan");

// init express
const app = new express();
const port = 3002;

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/estimate", (req, res) => {
  const { title, category } = req.query;

  const titleSum = title.replace(/\s/g, "").length;
  const categorySum = category.replace(/\s/g, "").length;
  const total = titleSum + categorySum;

  const estimate = total * 10 + Math.floor(Math.random() * 240) + 1;

  // compute the day-level presicion
  const day = Math.floor(estimate / 24);

  // compute the hour-level presicion
  const hour = estimate % 24;

  res.json({
    estimate,
    day,
    hour,
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
