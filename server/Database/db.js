import { createPool } from "mysql";
import dotenv from "dotenv";
dotenv.config();

const db = createPool({             //--------| MYSQL
    host: process.env.DB_HOST + "",
    port: 3306,
    user: process.env.DB_USER + "",
    password: process.env.DB_PASS + "",
    connectionLimit: 10,
    database: process.env.DB + ""
});

export default db;
