import express from "express";
import {
  createAdmin,
  sendReworkDetails,
  validateAdmin,
} from "../controllers/admin.js";
import { adminAuthenticate } from "../middlewares/middleware.js";
import { DefectDropDown } from "../models/defdd.js";
import { ProDropDown } from "../models/prodd.js";
import { InpDropDown } from "../models/inpdd.js";

const router = express.Router();

router.post("/adminlogin", validateAdmin);

router.get("/adminlogout", (req, res) => {
  req.cookies.admin ? res.clearCookie("admin") : res.clearCookie("master");
  res.send({ message: "Logged out" });
})
/*-----------------------------------------------------*/
//here no one can create user
//for this we need to use middleware to check
//to see if it is the master login who is requesting
//for the new registration of an employee   ******This is Important******
router.post("/adminregister", createAdmin);
/*-----------------------------------------------------*/

router.get("/adminhome", adminAuthenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/myrework", adminAuthenticate, sendReworkDetails, (req, res) => {
  res.send(req.complete_reworks);
});

router.get("/getFromMongo", (req, res) => {
  const newDrop = new ProDropDown({
    process_name: "Something",
    process_Defects: [{
      defect_name: "Defect_1"
    }]
  });
  newDrop.save();
  res.send("success");
})

export default router;
