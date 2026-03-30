import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
const Port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello Word");
});
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
