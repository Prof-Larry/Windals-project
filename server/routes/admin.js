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
import { CategoryDropDown } from "../models/catdd.js";
import { LineDropDown } from "../models/linedd.js";

const router = express.Router();

router.post("/adminlogin", validateAdmin);

router.get("/test", (req, res) => {
  res.send("Hello I am deployed!!");
});

router.get("/adminlogout", (req, res) => {
  req.cookies.admin ? res.clearCookie("admin") : res.clearCookie("master");
  res.send({ message: "Logged out" });
});
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
  res.send({ ...req.complete_reworks, user: req.userID });
});

router.get("/getFromMongo", (req, res) => {
  // const newDef = new DefectDropDown({
  //   defect_name: "Defect4",
  //   location: [
  //     {
  //       loc: "l1",
  //     },
  //     {
  //       loc: "l1",
  //     },
  //   ],
  //   defect_handlers: [
  //     {
  //       handlers: "h1",
  //     },
  //   ],
  // });

  // newDef.save();
  // const newInp = new InpDropDown({
  //   plant_code: "A4",
  //   production_line: [
  //     {
  //       line: "wppl01",
  //     },
  //     {
  //       line: "wppl02",
  //     },
  //   ],
  //   product: [
  //     {
  //       product_number: "1",
  //       product_name: "p1",
  //     },
  //   ],
  //   process: [
  //     {
  //       process_name: "process1",
  //     },
  //   ],
  // });
  // newInp.save();
  // const newDrop = new ProDropDown({
  //   process_name: "process4",
  //   process_categories: [
  //     {
  //       category_name: "C1",
  //     },
  //     {
  //       category_name: "C2",
  //     },
  //   ],
  // });
  // newDrop.save();

  // const newCat = new CategoryDropDown({
  //   category: "C4",
  //   defects: [
  //     {
  //       defect: "Defect1",
  //     },
  //     {
  //       defect: "Defect2",
  //     },
  //     {
  //       defect: "Defect3",
  //     },
  //   ],
  // });
  // newCat.save();

  // const newLine = new LineDropDown({
  //   production_line: "wppl05",
  //   product: [
  //     {
  //       product_number: "p1",
  //       product_name: "N1",
  //     },
  //     {
  //       product_number: "p2",
  //       product_name: "N2",
  //     },
  //     {
  //       product_number: "p3",
  //       product_name: "N3",
  //     },
  //     {
  //       product_number: "p4",
  //       product_name: "N4",
  //     },
  //   ],
  // });
  // newLine.save();
  res.send("success");
});

export default router;
