import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import homeRoutes from "./routes/home.routes";
import propertyRoutes from "./routes/property.routes";
import commentsRoutes from "./routes/comment.routes";
import authRoutes from "./routes/auth.routes";

import userRoutes from "./routes/user.routes"
import amenitiesRoutes from "./routes/amenity.routes"
import { errorHandler } from "./middleware/errorHandler.error";

configDotenv();
const Port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://7d13-41-121-234-171.ngrok-free.app",
      "https://a278-41-121-234-171.ngrok-free.app",
    ],
    credentials: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/property", propertyRoutes);
app.use("/auth", authRoutes);
app.use("/user",userRoutes)
app.use(errorHandler);
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
