import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginRoutes from './routes/login.js'
const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use('/login', loginRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*-----------------------------------------------------*/
const dbUrl = 'mongodb://localhost/yelp-camp';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database Connnected');
});
/*-----------------------------------------------------*/


/*-----------------------------------------------------*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Listening on the port ${PORT}`)
})
/*-----------------------------------------------------*/
