// const express = require('express')  // -> CommonJS
import express from 'express';          // -> ES Module
import dotenv from "dotenv";
import { createStore } from "./controllers/store.controller.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;

app.post("/stores", createStore);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})