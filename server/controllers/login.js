import { CreateUser } from '../models/user.js'

export const renderLogin = (req, res) =>{
    res.send("This also Works and this route will render the login form nothing more");
}



/*--------------------------Don't uncomment this---------------------------*/
// export const createUser = (req, res) => {
//     const user = req.body;
//     const newUser = new CreateUser(user);
//     try {
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(409).json({message: error.message});
//     }
// }
/*--------------------------Don't uncomment this---------------------------*/