import jwt from "jsonwebtoken";
import db from "../Database/db.js";
import moment from 'moment';
import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";

// export const adminAuthenticate = async (req, res, next) => {
//     try {
//         const token = req.cookies.admin;
//         const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
//         const rootUser = await Admin.findOne({ _id: verifyToken });

//         if (!rootUser) { throw new Error("You need to be logged in to do that!!") }

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userID = rootUser._id;

//         next();
//     } catch (error) {
//         res.status(401).send("Unauthorized: No Token Provided!");
//     }
// }

export const adminAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.admin || req.cookies.master;
        const decodeToken = jwt.verify(token, process.env.SECRET_AUTH + "");
        const findAdmin = "Select * from admin where empid=?";
        db.query(findAdmin, [decodeToken], (error, results) => {
            if (error) res.status(401).json({
                message: "Unauthorized access"
            });
            req.token = token;
            req.rootUser = results[0];
            req.userID = decodeToken;

            next();
        });
    } catch (error) {
        res.status(401).send({ message: error });
    }
}

// export const userAuthenticate = async (req, res, next) => {
//     try {
//         const token = req.cookies.user;
//         const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
//         const rootUser = User.findOne({ _id: verifyToken });

//         if (!rootUser) { throw new Error("User not found") }

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userID = rootUser._id;

//         next();
//     } catch (error) {
//         res.status(401).send("Unauthorized: No Token Provided!");
//     }
// }

// export const masterAuthenticate = async (req, res, next) => {
//     try {
//         const token = req.cookies.master;
//         const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
//         const rootMaster = Master.findOne({ _id: verifyToken });

//         if (!rootMaster) { throw new Error("Master not found") };

//         req.token = token;
//         req.rootMaster = rootMaster;
//         req.masterID = rootMaster._id;

//         next();
//     } catch (error) {
//         res.status(401).send("Unauthorized: No Token Provided!");
//     }
// }

export const saveReport = async (req, res, next) => {
    try {
        const { inspection, inp_report, pdi_report, rej_report, inpro_defect, pdi_defect, rej_defect } = req.body;
        const report_date = moment().format('YYYY-MM-DD');






        next();
    } catch (e) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}

