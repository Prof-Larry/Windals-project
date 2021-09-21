import { CreateUser } from '../models/user.js'
import bcrypt from 'bcryptjs';
export const renderLogin = (req, res) => {
    res.json("This also Works and this route will render the login form nothing more");
}


export const validateUser = async (req, res) => {
    const { empid, password } = req.body;
    CreateUser.findOne({ empid: empid }, (err, user) => {
        if (user) {
            // if (bcrypt.compare(password, user.password)) {
            //     res.send({ message: "Login Successfull", user: user });
            // } else {
            //     res.send({ message: "Invalid Credentials" });
            // }
            bcrypt.compare(password, user.password, function(err, response) {
                if(response) {
                    res.send({message: "Login Successfull", user: user});
                } else {
                    res.send({ message: "Invalid Credentials"});
                }
            });
        } else {
            res.send("User not Registered");
        }
    })
}


/*--------------------------Don't uncomment/touch below code---------------------------*/
export const createUser = async (req, res) => {
    try {
        const { confirmpassword, password } = req.body;
        if (confirmpassword == password) {
            const { firstname, lastname, empid, department, age, phone, email } = req.body;
            CreateUser.findOne({ email }, (err, user) => {
                if (user) {
                    res.send({ message: "User with that Employee id already exists" });
                } else {
                    const newUser = new CreateUser({ firstname, lastname, empid, department, email, phone, age, password });
                    const token = newUser.generateAuthToken();
                    newUser.save();
                    //remember to remove the ...newUser when this project is complete....else don't touch
                    res.status(201).send({ ...newUser, message: "User created successfully" });
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