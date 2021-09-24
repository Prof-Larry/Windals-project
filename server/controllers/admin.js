import { Admin } from '../models/admin.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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


/*--------------------------Don't uncomment/touch below code---------------------------*/
export const createAdmin = async (req, res) => {
    try {
        const { confirmpassword, password } = req.body;
        if (confirmpassword == password) {
            const { firstname, lastname, empid, department, age, phone, email } = req.body;
            Admin.findOne({ empid }, (err, admin) => {
                if (admin) {
                    res.send({ message: "Admin with that Employee id already exists" });
                } else {
                    const newAdmin = new Admin({ firstname, lastname, empid, department, email, phone, age, password });
                    const token = newAdmin.generateAuthToken();
                    newAdmin.save();
                    //remember to remove the ...newAdmin when this project is complete....else don't touch
                    res.status(201).send({ ...newAdmin, message: "Admin created successfully" });
                }
            })
        } else {
            res.send({ message: "password didn't match" });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}
/*--------------------------Don't uncomment/touch above code---------------------------*/