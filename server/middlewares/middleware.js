import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

export const adminAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.admin;
        const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");
        const rootUser = await Admin.findOne({ _id: verifyToken });

        if (!rootUser) { throw new Error("User not found") }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}