import { configDotenv } from "dotenv";
configDotenv({debug:true});
const result = configDotenv({ debug: true })
console.log("parsed keys:", result.parsed ? Object.keys(result.parsed) : result.error)
console.log("has account id:", !!process.env.CLOUDFLARE_ACCOUNT_ID, "has token:", !!process.env.CLOUDFLARE_API_TOKEN)
import express from "express";
import cors from "cors";
import homeRoutes from "./routes/home.routes";
import propertyRoutes from "./routes/property.routes";
// import commentsRoutes from "./routes/comment.routes";
// import authRoutes from "./routes/auth.routes";
// import loginRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes"
import { errorHandler } from "./middleware/errorHandler.error";


const Port = process.env.PORT || 3000;
const app = express();
app.use(cors({allowedHeaders:"*",
      origin:"http://localhost:5173",
      credentials:false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", homeRoutes);
app.use("/properties", propertyRoutes);
// app.use("/login", loginRoutes);

// app.use("/auth", authRoutes);
app.use("/user",userRoutes)
// app.use(errorHandler);
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
