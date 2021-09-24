import express from 'express';
import { createAdmin, validateAdmin } from '../controllers/admin.js';
import { adminAuthenticate } from "../middlewares/middleware.js"

const router = express.Router();

router.post('/adminlogin', validateAdmin);
/*-----------------------------------------------------*/
//here no one can create user
//for this we need to use middleware to check
//to see if it is the master login who is requesting 
//for the new registration of an employee   ******This is Important******
router.post('/adminregister', createAdmin);
/*-----------------------------------------------------*/

router.get('/adminhome', adminAuthenticate, (req, res) => {
    res.send(req.rootUser);
})

export default router;