import { CreateUser } from '../models/user.js'

export const renderLogin = (req, res) => {
    res.send("This also Works and this route will render the login form nothing more");
}



/*--------------------------Don't uncomment this---------------------------*/
export const createUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username);
    console.log(email);
    console.log(password);
    const newUser = new CreateUser({ username, email, password });
    try {
        newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/*--------------------------Don't uncomment this---------------------------*/