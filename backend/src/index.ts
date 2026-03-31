import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import homeRoutes from "./routes/home.routes";
import propertyRoutes from "./routes/property.routes";
import { errorHandler } from "./middleware/errorHandler.error";
import loginRoutes from "./routes/user.routes";
configDotenv();
const Port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});
app.use("/", homeRoutes);
app.use("/property", propertyRoutes);
app.use("/login", loginRoutes);
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
