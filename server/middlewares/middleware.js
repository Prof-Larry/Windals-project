import { jwt } from "jsonwebtoken";
import { CreateUser } from "../models/user";

export const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_AUTH + "");

        const rootUser = await CreateUser.findOne({ _id: verifyToken._id, "tokens.token": token});

        if(!rootUser) { throw new Error("User not found")}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

    } catch (error) {
        res.status(401).send('Unauthorized: No Token provided');
    }
}