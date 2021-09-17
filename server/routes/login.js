import express from 'express';
import { renderLogin, createUser } from '../controllers/login.js';

const router = express.Router();

router.get('/', renderLogin);

/*-----------------------------------------------------*/
//here no one can create user
//for this we need to use middleware to check
//to see if it is the master login who is requesting 
//for the new registration of an employee   ******This is Important******
router.post('/', createUser);
/*-----------------------------------------------------*/

export default router;