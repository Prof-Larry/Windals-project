import express from 'express';
import { renderLogin, createUser, validateUser } from '../controllers/login.js';

const router = express.Router();

router.get('/login', renderLogin);
router.post('/login', validateUser);
/*-----------------------------------------------------*/
//here no one can create user
//for this we need to use middleware to check
//to see if it is the master login who is requesting 
//for the new registration of an employee   ******This is Important******
router.post('/register', createUser);
/*-----------------------------------------------------*/

export default router;