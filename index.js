import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import questionsRouter from './routes/questions.js'; // Pakeiskite šį kelio kelią, jei jūsų failo vieta skiriasi
import userRouter from "./routes/user.js";
import answersRouter from "./routes/answers.js"; // Import answer routes

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/questions", questionsRouter);
app.use(userRouter);
app.use("/answers", answersRouter); // Mount answer routes under /answers path

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.log("Error:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`App connected on port ${process.env.PORT}`);
});
