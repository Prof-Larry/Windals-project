import express from 'express';
import { saveReport } from '../controllers/report.js';
import { adminAuthenticate } from "../middlewares/middleware.js"

const router = express.Router();

router.get('/reportAuthorization', adminAuthenticate, (req, res) => {
    res.status(200).send(req.rootUser);
});

router.post('/submitReport', adminAuthenticate, saveReport);


export default router;