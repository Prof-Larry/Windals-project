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
  res.send("Hello I am currently being deployed!!");
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
  //   plant_code: "Pune",
  //   production_line: [
  //     {
  //       line: "John Deere",
  //     },
  //     {
  //       line: "Dana",
  //     },
  //     {
  //       line: "MVML",
  //     },
  //     {
  //       line: "TMTL",
  //     },
  //     {
  //       line: "TML",
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
  //   process_name: "process1",
  //   process_categories: arr.map((a, index) => {
  //     return {
  //       category_name: a
  //     }
  //   })
  // });
  // newDrop.save();

  // const newCat = new CategoryDropDown({
  //   category: "Weld Defect",
  //   defects: arr.map(a => {
  //     return {
  //       defect: a
  //     }
  //   })
  // });
  // newCat.save();

  // const newLine = new LineDropDown({
  //   production_line: "TML",
  //   product: arr.map((a, index) => {
  //     return {
  //       product_number: a,
  //       product_name: names[index]
  //     }
  //   })
  // })
  // newLine.save();
  res.send("success");
});

export default router;
