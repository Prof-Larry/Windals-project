import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";

export const adminAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.admin;
        const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
        const rootUser = await Admin.findOne({ _id: verifyToken });

        if (!rootUser) { throw new Error("You need to be logged in to do that!!") }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}

export const userAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.user;
        const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
        const rootUser = User.findOne({ _id: verifyToken });

        if (!rootUser) { throw new Error("User not found") }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}

export const masterAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.master;
        const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
        const rootMaster = Master.findOne({ _id: verifyToken });

        if (!rootMaster) { throw new Error("Master not found") };

        req.token = token;
        req.rootMaster = rootMaster;
        req.masterID = rootMaster._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}


