import express from "express";
import cors from "cors";
import loginRoutes from './routes/adminlogin.js'
import reportRoutes from './routes/report.js'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',
    // methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', loginRoutes);
app.use('/report', reportRoutes);
/*-----------------------------------------------------*/
// const PORT = process.env.PORT || 5000;
app.listen(5050, () => {
    console.log(`Server is Listening on the port 5050`)
})
/*-----------------------------------------------------*/
