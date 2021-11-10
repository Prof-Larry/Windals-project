import { Admin } from '../models/admin.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../Database/db.js';
import moment from 'moment';


export const validateAdmin = async (req, res) => {
    try {
        const { empid, password } = req.body;
        const admin = await Admin.findOne({ empid: empid });
        if (admin) {
            const verified = await bcrypt.compare(password, admin.password);
            if (verified) {
                const token = await jwt.sign(admin._id.toString(), process.env.SECRET_AUTH + "");
                console.log(token);
                res.cookie('admin', token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });
                res.send({ message: "Login successfull" });
            }
        } else {
            res.send({ message: "User not found!!" });
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
}

export const valadmin = async (req, res) => {
    try {
        const { empid, password } = req.body;
        const findAdmin = "SELECT " 
        db.query()
    } catch (error) {
        res.status(401).send(error.message);
    }
}


/*--------------------------Don't uncomment/touch below code---------------------------*/
// export const createAdmin = async (req, res) => {
//     try {
//         const { confirmpassword, password } = req.body;
//         if (confirmpassword == password) {
//             const { firstname, lastname, empid, department, phone, email } = req.body;
//             Admin.findOne({ empid }, (err, admin) => {
//                 if (admin) {
//                     res.send({ message: "Admin with that Employee id already exists" });
//                 } else {
//                     const newAdmin = new Admin({ firstname, lastname, empid, department, email, phone, age, password });
//                     const token = newAdmin.generateAuthToken();
//                     newAdmin.save();
//                     //remember to remove the ...newAdmin when this project is complete....else don't touch
//                     res.status(201).send({ ...newAdmin, message: "Admin created successfully" });
//                 }
//             })
//         } else {
//             res.send({ message: "password didn't match" });
//         }
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }

// }

export const createAdmin = async (req, res) => {
    try {
        const { confirmpassword, password } = req.body;
        if(confirmpassword == password) {
            const date = moment(now).format('YYYY-MM-DD');
            const { empid, firstname, lastname, gender, department, designation, phone, email } = req.body;
            const token = await jwt.sign(empid.toString(), process.env.SECRET_AUTH);
            password = await bcrypt.hash(password, 10);
            const adminInfo = [empid, firstname, lastname, gender, department, designation, phone, email, date, password, token];
            const newAdmin = "Insert into admin( empid, firstname, lastname, gender, department, designation, phone, email, join_date, pass, token ) values (?,?,?,?,?,?,?,?,?,?,?)";
            db.query(newAdmin, adminInfo, (error, results) => {
                if(error) res.status(401).json({
                    message: "Some technical Error, please try again later"
                });
                res.status(201).send({...results, message: "Admin created Successfully" });
            });
        } else {
            res.send({message: "Passwords didn't match!"});
        }
    } catch (error) {
        res.status(409).send({ message: error.message });
    }
}
/*--------------------------Don't uncomment/touch above code---------------------------*/