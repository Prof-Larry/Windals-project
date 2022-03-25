import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../Database/db.js";
import moment from "moment";
import util from "util";

export const validateAdmin = (req, res) => {
  try {
    if (!req.cookies.admin && !req.cookies.master) {
      const { empid, password } = req.body;
      const findAdmin = "select * from admin where empid=?";
      db.query(findAdmin, [empid], async (error, results) => {
        if (error) return res.send({ message: "User not Found!!" });
        if (results[0] != null) {
          const verified = await bcrypt.compare(password, results[0].pass);
          if (verified) {
            const token = jwt.sign(
              results[0].empid,
              process.env.SECRET_AUTH + ""
            );
            if (results[0].token == token) {
              res.cookie(
                results[0].designation == "M" ? "master" : "admin",
                token,
                {
                  expires: new Date(Date.now() + 86400000),
                  sameSite: "lax",
                }
              );
              res.setHeader("Cache-Control", "private");
              return res.send({
                ...results,
                message: "Login Successful",
                code: true,
              });
            }
          } else {
            res.send({ message: "ID or password is incorrect", code: false });
          }
        } else {
          res.send({ message: "Admin Doesn't exist", code: false });
        }
      });
    } else {
      res.send({ message: "User Already logged in", code: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { confirmpassword, password } = req.body;
    if (confirmpassword == password) {
      const date = moment().format("YYYY-MM-DD");
      const {
        empid,
        firstname,
        lastname,
        gender,
        department,
        designation,
        phone,
        email,
      } = req.body;
      const token = jwt.sign(empid.toString(), process.env.SECRET_AUTH + "");
      const pass = await bcrypt.hash(password, 10);
      const adminInfo = [
        empid,
        firstname,
        lastname,
        gender,
        department,
        designation,
        phone,
        email,
        date,
        pass,
        token,
      ];
      const newAdmin =
        "Insert into admin( empid, firstname, lastname, gender, department, designation, phone, email, join_date, pass, token ) values (?,?,?,?,?,?,?,?,?,?,?)";
      db.query(newAdmin, adminInfo, (error, result, fields) => {
        if (error) {
          return res.send({
            message: "Admin with that employee id already exist",
          });
        }
        console.log(result);
        res
          .status(201)
          .send({ ...result, message: "Admin created Successfully" });
      });
    } else {
      res.send({ message: "Passwords didn't match!" });
    }
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const sendReworkDetails = async (req, res, next) => {
  try {
    let complete_reworks = {};
    const query = util.promisify(db.query).bind(db);
    const rows = await query(
      "Select * from rework_defects where rework_rework_handler=? and rework_rework_status=?",
      [req.userID, "incomplete"]
    );
    complete_reworks = { rework_defects: rows };
    req.complete_reworks = complete_reworks;
    console.log(req.userID);
    next();
  } catch (error) {
    console.log(error);
  }
};

/*--------------------------Don't uncomment/touch above code---------------------------*/
