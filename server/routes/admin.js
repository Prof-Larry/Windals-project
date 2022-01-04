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




  // const newDef = new DefectDropDown({
  //   defect_name: "d4",
  //   location: [{
  //     loc: "l1"
  //   }, {
  //     loc: "l2"
  //   }, {
  //     loc: "l3"
  //   }],
  //   category: [{
  //     cat: "c1",
  //   }],
  //   defect_handlers: [{
  //     handlers: "h1"
  //   }, {
  //     handlers: "h2"
  //   }]
  // });

  //newDef.save();
  // const newInp = new InpDropDown({
  //   plant_code: "A1",
  //   production_line: [{
  //     line: "wppl01"
  //   }, {
  //     line: "wppl02"
  //   }, {
  //     line: "wppl03"
  //   },{
  //     line: "wppl04"
  //   }],
  //   product: [{
  //     product_number: "1",
  //     product_name: "p1"
  //   }, {
  //     product_number: "2",
  //     product_name: "p2"
  //   }, {
  //     product_number: "3",
  //     product_name: "p3"
  //   }],
  //   process: [{
  //     process_name: "process1"
  //   }, {
  //     process_name: "process2"
  //   }, {
  //     process_name: "process3"
  //   }]
  // });
  // newInp.save();
  // const newDrop = new ProDropDown({
  //   process_name: "process4",
  //   process_Defects: [{
  //     defect_name: "Defect_1"
  //   }, {
  //     defect_name: "Defect_2"
  //   }]
  // });
  // newDrop.save();
  res.send("success");
})

export default router;
