import moment from "moment";
import jwt from "jsonwebtoken";
import db from "../Database/db.js";
import util from "util";
import { InpDropDown } from "../models/inpdd.js";
import { ProDropDown } from "../models/prodd.js";
import { DefectDropDown } from "../models/defdd.js";
import { CategoryDropDown } from "../models/catdd.js";
import { LineDropDown } from "../models/linedd.js";
const query = util.promisify(db.query).bind(db);

export const saveReport = (req, res) => {
  console.log(req.body);
  try {
    const {
      inspection,
      rework_details,
      rejection_details,
      rework_defects,
      rejection_defects,
    } = req.body;
    const report_date = moment().format("YYYY-MM-DD");
    const token = req.cookies.admin || req.cookies.master;
    const decoded_admin = jwt.verify(token, process.env.SECRET_AUTH + "");

    const report_values = [
      report_date,
      decoded_admin,
      inspection.plant_code,
      inspection.production_line,
      inspection.product_number,
      inspection.product_name,
      rework_details.process_name || "NA",
      parseInt(rework_details.process_quantity) || 0,
      rejection_details.rejection_name || "NA",
      parseInt(rejection_details.rejection_quantity) || 0,
      rework_details.rework_type,
    ];
    const add_report =
      "Insert Into report(report_date,admin_id,plant_code,production_line,product_number,product_name,rework_process,rework_quantity,rejection_process,rejection_quantity,report_type) values(?,?,?,?,?,?,?,?,?,?,?)";
    db.query(add_report, report_values, (error, results) => {
      if (error) throw new Error();
      if (rework_defects) {
        rework_defects.forEach((defect) => {
          const rework_defects_values = [
            parseInt(defect.rework_defect_quantity),
            defect.rework_defect,
            defect.rework_defect_location,
            defect.rework_category_defect,
            defect.rework_defect_details,
            defect.rework_rework_status,
            defect.rework_rework_details,
            defect.rework_rework_handler,
            results.insertId,
          ];
          const add_rework_Defect =
            "insert into rework_defects(rework_defect_quantity,rework_defect,rework_defect_location,rework_category_defect,rework_defect_details,rework_rework_status,rework_rework_details,rework_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
          defect.rework_defect
            ? db.query(
                add_rework_Defect,
                rework_defects_values,
                (error, results) => {
                  if (error) throw new Error();
                }
              )
            : null;
        });
      }
      if (rejection_defects) {
        rejection_defects.forEach((defect) => {
          const rejection_defects_values = [
            parseInt(defect.rejection_defect_quantity),
            defect.rejection_defect,
            defect.rejection_defect_location,
            defect.rejection_category_defect,
            defect.rejection_defect_details,
            defect.rejection_rework_status,
            defect.rejection_rework_details,
            defect.rejection_rework_handler,
            results.insertId,
          ];
          const add_rejection_Defect =
            "insert into rejection_defects(rejection_defect_quantity,rejection_defect,rejection_defect_location,rejection_category_defect,rejection_defect_details,rejection_rework_status,rejection_rework_details,rejection_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
          defect.rejection_defect
            ? db.query(
                add_rejection_Defect,
                rejection_defects_values,
                (error, results) => {
                  if (error) throw new Error();
                }
              )
            : null;
        });
      }
    });
    res.send({ message: "Report submitted successfully" });
  } catch (e) {
    res.status(401).send("Unauthorized: No Token Provided!");
  }
};

export const sendReport = async (req, res) => {
  const { from, to } = req.body;
  const getReports = "select * from report where report_date BETWEEN ? AND ?";
  const results = await query(getReports, [from, to]);
  res.send(results);
};

export const sendCompleteReport = async (req, res) => {
  try {
    const { id } = req.body;
    let complete_report = {};
    const report = await query("select * from report where report_id=?", [
      parseInt(id),
    ]);
    const rework_defects = await query(
      "select * from rework_defects WHERE report_id=?",
      [id]
    );
    const rejection_defects = await query(
      "select * from rejection_defects where report_id=?",
      [id]
    );
    complete_report = {
      report: report[0],
      rework_defects,
      rejection_defects,
    };
    res.send(complete_report);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Some Error in backend" });
  }
};

export const updateReport = (req, res) => {
  if (req.cookies.master) {
    const { completeReport, i_defects, p_defects, r_defects } = req.body;
    const query =
      "update report set plant_code=?,production_line=?,product_number=?,product_name=?,inprocess_name=?,inprocess_total_quantity=?,pdi_name=?,pdi_total_quantity=?,rejection_name=?,rejection_total_quantity=? where report_id=?";
    const updatedValues = [
      completeReport.plant_code,
      completeReport.production_line,
      completeReport.product_number,
      completeReport.product_name,
      completeReport.inprocess_name,
      parseInt(completeReport.inprocess_total_quantity),
      completeReport.pdi_name,
      parseInt(completeReport.pdi_total_quantity),
      completeReport.rejection_name,
      parseInt(completeReport.rejection_total_quantity),
      completeReport.report_id,
    ];
    db.query(query, updatedValues, (error, result) => {
      if (error)
        res.status(401).send({ message: "Something error in the query" });
    });
    i_defects.forEach((def) => {
      const inp_query =
        "update inprocess_defects set inprocess_defect_quantity=?,inprocess_defect=?,inprocess_defect_location=?,inprocess_category_defect=?,inprocess_defect_details=?,inprocess_rework_status=?,inprocess_rework_details=?,inprocess_rework_handler=? where defect_id=?";
      const inpValues = [
        parseInt(def.inprocess_defect_quantity),
        def.inprocess_defect,
        def.inprocess_defect_location,
        def.inprocess_category_defect,
        def.inprocess_defect_details,
        def.inprocess_rework_status,
        def.inprocess_rework_details,
        def.inprocess_rework_handler,
        def.defect_id,
      ];
      db.query(inp_query, inpValues, (error, result) => {
        if (error)
          res.status(401).send({ message: "Something error in the query" });
      });
    });
    p_defects.forEach((def) => {
      const pdi_query =
        "update pdi_defects set pdi_defect_quantity=?,pdi_defect=?,pdi_defect_location=?,pdi_category_defect=?,pdi_defect_details=?,pdi_rework_status=?,pdi_rework_details=?,pdi_rework_handler=? where defect_id=?";
      const pdiValues = [
        parseInt(def.pdi_defect_quantity),
        def.pdi_defect,
        def.pdi_defect_location,
        def.pdi_category_defect,
        def.pdi_defect_details,
        def.pdi_rework_status,
        def.pdi_rework_details,
        def.pdi_rework_handler,
        def.defect_id,
      ];
      db.query(pdi_query, pdiValues, (error, result) => {
        if (error)
          res.status(401).send({ message: "Something error in the query" });
      });
    });
    r_defects.forEach((def) => {
      const rej_query =
        "update rejection_defects set rejection_defect_quantity=?,rejection_defect=?,rejection_defect_location=?,rejection_category_defect=?,rejection_defect_details=?,rejection_rework_status=?,rejection_rework_details=?,rejection_rework_handler=? where defect_id=?";
      const rejValues = [
        parseInt(def.rejection_defect_quantity),
        def.rejection_defect,
        def.rejection_defect_location,
        def.rejection_category_defect,
        def.rejection_defect_details,
        def.rejection_rework_status,
        def.rejection_rework_details,
        def.rejection_rework_handler,
        def.defect_id,
      ];
      db.query(rej_query, rejValues, (error, result) => {
        if (error)
          res.status(401).send({ message: "Something error in the query" });
      });
    });
    res.status(201).send({ message: "Report Updated Successfully" });
  } else {
    res.send({ message: "Unauthorized" });
  }
};

export const sendPlantCodes = async (req, res) => {
  const getData = await InpDropDown.find();
  const plantCodes = getData.map((pcode) => {
    return pcode.plant_code;
  });
  res.send(plantCodes);
};

export const sendInspectionDropDown = async (req, res) => {
  const { plant_code } = req.body;
  const getDropDown = await InpDropDown.find({ plant_code });
  res.send(getDropDown);
};

export const sendProcessDropDown = (req, res) => {};

export const sendDefectDropDown = (req, res) => {};

export const sendCategories = async (req, res) => {
  const { process } = req.body;
  const getCategories = await ProDropDown.find({ process_name: process });
  res.send(getCategories);
};

export const sendLocation = async (req, res) => {
  const { defect_name } = req.body;
  const defectInfo = await DefectDropDown.find({ defect_name: defect_name });
  res.send(defectInfo);
};

export const sendDefects = async (req, res) => {
  const { category_name } = req.body;
  const getDefects = await CategoryDropDown.find({ category: category_name });
  res.send(getDefects);
};

export const sendProducts = async (req, res) => {
  const { production_line_name } = req.body;
  const getProducts = await LineDropDown.find({
    production_line: production_line_name,
  });
  res.send(getProducts);
};
