import jwt from "jsonwebtoken";
import db from "../Database/db.js";

export const adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.admin || req.cookies.master;
    const decodeToken = jwt.verify(token, process.env.SECRET_AUTH + "");
    const findAdmin = "Select * from admin where empid=?";
    db.query(findAdmin, [decodeToken], (error, results) => {
      if (error)
        res.status(401).json({
          message: "Unauthorized access",
        });
      req.token = token;
      req.rootUser = results[0];
      req.userID = decodeToken;
      next();
    });
  } catch (error) {
    res.status(401).send({ message: error });
  }
};

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
