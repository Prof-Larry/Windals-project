import express from "express";
import {
  saveReport,
  sendReport,
  sendCompleteReport,
} from "../controllers/report.js";
import { adminAuthenticate } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/reportAuthorization", adminAuthenticate, (req, res) => {
  res.status(200).send(req.rootUser);
});

router.post("/submitReport", adminAuthenticate, saveReport);

router.get("/viewReport", adminAuthenticate, sendReport);

router.get("/viewReport/:id", adminAuthenticate, sendCompleteReport);

export default router;
