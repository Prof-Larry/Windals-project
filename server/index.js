import express from "express";
import mongoose from "mongoose";
import { createPool } from "mysql";
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
const db = createPool({             //--------| MYSQL
    host: process.env.DB_HOST + "",
    user: process.env.DB_USER + "",
    password: process.env.DB_PASS + "",
    connectionLimit: 10,
    database: 'Windals_pdi'
});


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
        // const query = "CREATE DATABASE Windals_pdi";
        // db.query(query, (err, result) => {
        //     if (err) throw new Error(err.message);
        //     console.log(result);
        //     res.send("Wow DB created");
        // });
        const query1 = `CREATE TABLE test2(
            Employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
        )`;
        const query2 = `INSERT INTO test2(
            name
        ) values(?)`;
        db.query(
            `INSERT INTO test2(
                name
            ) values(?)`,
            [
                "Ujwal"
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
