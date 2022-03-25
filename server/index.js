import express from "express";
import cors from "cors";
import loginRoutes from "./routes/admin.js";
import reportRoutes from "./routes/report.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
// const dbUrl = process.env.MDB_URL || "mongodb://localhost:27017/Windals-pdi";

// const dbUrl = "mongodb://localhost:27017/Windals-pdi";

dotenv.config();

const app = express();

// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
//   );
//   next();
// });

const Url = "https://windals-precision.web.app";
// const Url = "http://localhost:3000";

const corsOptions = {
  origin: Url,
  // methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
};

mongoose.connect(process.env.MDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", loginRoutes);
app.use("/report", reportRoutes);
/*-----------------------------------------------------*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Listening on the port 5050`);
});
/*-----------------------------------------------------*/
