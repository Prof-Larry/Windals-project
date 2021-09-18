import { CreateUser } from '../models/user.js'

export const renderLogin = (req, res) => {
    res.json("This also Works and this route will render the login form nothing more");
}


export const validateUser = (req, res) => {
    const { username, password } = req.body;
    CreateUser.findOne({ username: username }, (err, user) => {
        if (user) {
            if (password == user.password) {
                res.send({ message: "Login Successfull", user: user });
            } else {
                res.send({ message: "Invalid Credentials" });
            }
        } else {
            res.send("User not Registered");
        }
    })
}


/*--------------------------Don't uncomment this---------------------------*/
export const createUser = (req, res) => {
    const { confirmpassword, password } = req.body;

    if (confirmpassword == password) {
        const { firstname, lastname, age, phone, email } = req.body;
        CreateUser.findOne({ email }, (err, user) => {
            if (user) {
                res.send({ message: "User with that email already exists" });
            } else {
                const newUser = new CreateUser({ firstname, lastname, email, phone, age, password, confirmpassword });
                try {
                    newUser.save();
                    res.status(201).send({ ...newUser, message: "User created successfully" });
                } catch (error) {
                    res.status(409).json({ message: error.message });
                }
            }
        })
    } else {
        res.send({ message: "password didn't match" });
    }

}
/*--------------------------Don't uncomment this---------------------------*/