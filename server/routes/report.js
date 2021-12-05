import express from "express";
import {
  saveReport,
  sendReport,
  sendCompleteReport,
  updateReport
} from "../controllers/report.js";
import { adminAuthenticate } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/reportAuthorization", adminAuthenticate, (req, res) => {
  res.status(200).send(req.rootUser);
});

router.post("/submitReport", adminAuthenticate, saveReport);

router.post("/viewReport", adminAuthenticate, sendReport);

router.post("/viewCompleteReport", adminAuthenticate, sendCompleteReport);

router.put("/updateReport", adminAuthenticate, updateReport)


export default router;
