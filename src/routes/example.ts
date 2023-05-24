import express from "express";

const routerExample = express.Router();

routerExample.get("/", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "GET - Ok!",
  });
});

routerExample.post("/", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "POST - Ok!",
  });
});

export default routerExample;
