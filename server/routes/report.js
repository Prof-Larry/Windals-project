import express from "express";
import {
  saveReport,
  sendReport,
  sendPlantCodes,
  sendCompleteReport,
  sendInspectionDropDown,
  sendProcessDropDown,
  sendDefectDropDown,
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

router.put("/updateReport", adminAuthenticate, updateReport);

router.get("/plantcodes", adminAuthenticate, sendPlantCodes);

router.post("/inspectionDropDown", adminAuthenticate, sendInspectionDropDown);

router.post("/processDropDown", adminAuthenticate, sendProcessDropDown);

router.post("/defectDropDown", adminAuthenticate, sendDefectDropDown);
export default router;
