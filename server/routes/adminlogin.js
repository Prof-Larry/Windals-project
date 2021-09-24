import express from 'express';
import { createAdmin, validateAdmin } from '../controllers/admin.js';

const router = express.Router();

router.post('/adminlogin', validateAdmin);
/*-----------------------------------------------------*/
//here no one can create user
//for this we need to use middleware to check
//to see if it is the master login who is requesting 
//for the new registration of an employee   ******This is Important******
router.post('/register', createAdmin);
/*-----------------------------------------------------*/

export default router;