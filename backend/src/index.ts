import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import homeRoutes from "./routes/home.routes";
import propertyRoutes from "./routes/property.routes";
import commentsRoutes from "./routes/comment.routes"
import authRoutes from "./routes/auth.routes"
import { errorHandler } from "./middleware/errorHandler.error";
import loginRoutes from "./routes/auth.routes";
configDotenv();
const Port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/property", propertyRoutes);
app.use("/login", loginRoutes);
app.use("/comment/", commentsRoutes)
app.use("/auth",authRoutes)
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
