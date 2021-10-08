import express from "express";
import mongoose from "mongoose";
import mysql from "mysql";
import cors from "cors";
import loginRoutes from './routes/adminlogin.js'
import cookieParser from "cookie-parser";
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
const db = mysql.createConnection({             //--------| MYSQL
    host: 'localhost',
    user: 'root',
    password: 'Viit@123'
});

db.connect(err => {
    if (err)
        throw err;
    console.log("Mysql is connected....");
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
        const query = "CREATE DATABASE Windals_pdi";
        db.query(query, (err, result) => {
            if (err) throw new Error(err.message);
            console.log(result);
            res.send("Wow DB created");
        });
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
