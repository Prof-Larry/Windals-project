import express from "express";
import mongoose from "mongoose";
import { createPool } from "mysql";
import db from "./Database/db.js";
import cors from "cors";
import loginRoutes from './routes/adminlogin.js'
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


/*----------------------------------------DATABASE CONNECTION-------------*/

// const dbUrl = 'mongodb://localhost/Windals-pdi';         //---------| MONGODB
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, "connection error:"));
// db.once('open', () => {
//     console.log('Database Connnected');
// });
/*------------------------------------------DATABASE CONNECTION-----------*/
app.get('/createDatabase', (req, res) => {
    try {
        const query2 = "INSERT INTO Admin(Employee_id,FirstName,LastName,department,email,designation,phone,Join_date,Pass) values(?,?,?,?,?,?,?,?,?)";
        db.query(
            query2,
            [
                "EE80445",
                "Manish",
                "Patil",
                "Civil",
                "manish@gmail.com",
                'A',
                272844432,
                '2000-12-11',
                "afajbnahhgbjkabtkujabfkjabtgjbadafdsgsa"
            ],
            (error, results, fields) => {
                if(error) throw new Error(error.message);
                console.log(results);
                res.json("Yay added a new entry");
            }
        )
    } catch (err) {
        console.log(err.message);
    }
});
app.use('/', loginRoutes);
/*-----------------------------------------------------*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Listening on the port ${PORT}`)
})
/*-----------------------------------------------------*/
