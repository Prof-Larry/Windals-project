import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const validateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email: email });
        const isverified = await bcrypt.compare(password, user.password);
        if (isverified) {
            localStorage.setItem('user', JSON.stringify(user));
            res.status(201).JSON({ message: "Logged in Successfully" });
        } else {
            res.send({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.send({ message: "There is an Technical Issue!!" });
    }
}

export const createUser = (req, res) => {
    try {
        const { password, confirmpassword } = req.body;
        if (password == confirmpassword) {
            const { firstname, lastname, address, email, phone, age } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                throw new Error("User with that email already Exist");
            }
            const newUser = new User({
                firstname,
                lastname,
                address,
                email,
                phone,
                age,
                password
            });
            const token = newUser.generateAuthToken();
        }
    } catch (error) {

    }
}