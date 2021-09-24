import { Admin } from '../models/admin.js'
import bcrypt from 'bcryptjs';


export const validateAdmin = async (req, res) => {
    try {
        const { empid, password } = req.body;
        Admin.findOne({ empid: empid }, async (err, admin) => {
            if (admin) {
                await bcrypt.compare(password, admin.password, async function (err, response) {
                    if (response) {
                        const token = await admin.generateAuthToken();
                        res.cookie('jwtoken', token, {
                            expires: new Date(Date.now() + 28800000),
                            httpOnly: true
                        })
                        res.send({ message: "Login Successfull", admin: admin });
                    } else {
                        res.send({ message: "Invalid Credentials" });
                    }
                });
            } else {
                res.send("User not Registered");
            }
        })
    } catch (error) {
        res.send("There is Technical issue!!");
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