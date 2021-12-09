import moment from "moment";
import jwt from "jsonwebtoken";
import db from "../Database/db.js";
import util from "util"
const query = util.promisify(db.query).bind(db);


export const saveReport = (req, res) => {
  try {
    const {
      inspection,
      inp_report,
      pdi_report,
      rej_report,
      inpro_defect,
      pdi_defect,
      rej_defect,
    } = req.body;
    const report_date = moment().format("YYYY-MM-DD");
    const token = req.cookies.admin || req.cookies.master;
    const decoded_admin = jwt.verify(token, process.env.SECRET_AUTH + "");
    inp_report.inprocess_total_defective_quantity = 0;
    inpro_defect.forEach((defect) => {
      inp_report.inprocess_total_defective_quantity += parseInt(
        defect.inprocess_defect_quantity
      );
    });
    pdi_report.pdi_total_defective_quantity = 0;
    pdi_defect.forEach((defect) => {
      pdi_report.pdi_total_defective_quantity += parseInt(
        defect.pdi_defect_quantity
      );
    });
    rej_report.rejection_total_defective_quantity = 0;
    rej_defect.forEach((defect) => {
      rej_report.rejection_total_defective_quantity += parseInt(
        defect.rej_defect_quantity
      );
    });

    const report_values = [
      report_date,
      decoded_admin,
      inspection.plant_code,
      inspection.production_line,
      inspection.product_number,
      inspection.product_name,
      inp_report.inprocess_name,
      parseInt(inp_report.inprocess_total_quantity),
      inp_report.inprocess_total_defective_quantity,
      pdi_report.pdi_name,
      parseInt(pdi_report.pdi_total_quantity),
      pdi_report.pdi_total_defective_quantity,
      rej_report.rejection_name,
      parseInt(rej_report.rejection_total_quantity),
      rej_report.rejection_total_defective_quantity,
    ];
    const add_report =
      "Insert Into report(report_date,admin_id,plant_code,production_line,product_number,product_name,inprocess_name,inprocess_total_quantity,inprocess_total_defective_quantity,pdi_name,pdi_total_quantity,pdi_total_defective_quantity,rejection_name,rejection_total_quantity,rejection_total_defective_quantity) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(add_report, report_values, (error, results) => {
      if (error) throw new Error();

      inpro_defect.forEach((defect) => {
        const inprocess_defects_values = [
          parseInt(defect.inprocess_defect_quantity),
          defect.inprocess_defect,
          defect.inprocess_defect_location,
          defect.inprocess_category_defect,
          defect.inprocess_defect_details,
          defect.inprocess_rework_status,
          defect.inprocess_rework_details,
          defect.inprocess_rework_handler,
          results.insertId,
        ];
        const add_inprocess_Defect =
          "insert into inprocess_defects(inprocess_defect_quantity,inprocess_defect,inprocess_defect_location,inprocess_category_defect,inprocess_defect_details,inprocess_rework_status,inprocess_rework_details,inprocess_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
        db.query(
          add_inprocess_Defect,
          inprocess_defects_values,
          (error, results) => {
            if (error) throw new Error();
          }
        );
      });
      pdi_defect.forEach((defect) => {
        const pdi_defects_values = [
          parseInt(defect.pdi_defect_quantity),
          defect.pdi_defect,
          defect.pdi_defect_location,
          defect.pdi_category_defect,
          defect.pdi_defect_details,
          defect.pdi_rework_status,
          defect.pdi_rework_details,
          defect.pdi_rework_handler,
          results.insertId,
        ];
        const add_pdi_Defect =
          "insert into pdi_defects(pdi_defect_quantity,pdi_defect,pdi_defect_location,pdi_category_defect,pdi_defect_details,pdi_rework_status,pdi_rework_details,pdi_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
        db.query(add_pdi_Defect, pdi_defects_values, (error, results) => {
          if (error) throw new Error();
        });
      });
      rej_defect.forEach((defect) => {
        const rejection_defects_values = [
          parseInt(defect.rej_defect_quantity),
          defect.rej_defect,
          defect.rej_defect_location,
          defect.rej_category_defect,
          defect.rej_defect_details,
          defect.rej_rework_status,
          defect.rej_rework_details,
          defect.rej_rework_handler,
          results.insertId,
        ];
        const add_rejection_Defect =
          "insert into rejection_defects(rejection_defect_quantity,rejection_defect,rejection_defect_location,rejection_category_defect,rejection_defect_details,rejection_rework_status,rejection_rework_details,rejection_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
        db.query(
          add_rejection_Defect,
          rejection_defects_values,
          (error, results) => {
            if (error) throw new Error();
          }
        );
      });
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
    const report = await query("select * from report where report_id=?", [parseInt(id)]);
    const inprocess_defects = await query("select * from inprocess_defects WHERE report_id=?", [id]);
    const pdi_defects = await query("select * from pdi_defects where report_id=?", [id]);
    const rejection_defects = await query("select * from rejection_defects where report_id=?", [id]);
    complete_report = { report: report[0], inprocess_defects, pdi_defects, rejection_defects };
    res.send(complete_report);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Some Error in backend" });
  }
};

export const updateReport = (req, res) => {
  if (req.cookies.master) {
    const { completeReport, i_defects, p_defects, r_defects } = req.body;
    const query = "update report set plant_code=?,production_line=?,product_number=?,product_name=?,inprocess_name=?,inprocess_total_quantity=?,pdi_name=?,pdi_total_quantity=?,rejection_name=?,rejection_total_quantity=? where report_id=?"
    const updatedValues = [completeReport.plant_code, completeReport.production_line, completeReport.product_number, completeReport.product_name, completeReport.inprocess_name, parseInt(completeReport.inprocess_total_quantity), completeReport.pdi_name, parseInt(completeReport.pdi_total_quantity), completeReport.rejection_name, parseInt(completeReport.rejection_total_quantity), completeReport.report_id];
    db.query(query, updatedValues, (error, result) => {
      if (error) res.status(401).send({ message: "Something error in the query" });
    });
    i_defects.forEach(def => {
      const inp_query = "update inprocess_defects set inprocess_defect_quantity=?,inprocess_defect=?,inprocess_defect_location=?,inprocess_category_defect=?,inprocess_defect_details=?,inprocess_rework_status=?,inprocess_rework_details=?,inprocess_rework_handler=? where defect_id=?";
      const inpValues = [parseInt(def.inprocess_defect_quantity), def.inprocess_defect, def.inprocess_defect_location, def.inprocess_category_defect, def.inprocess_defect_details, def.inprocess_rework_status, def.inprocess_rework_details, def.inprocess_rework_handler, def.defect_id]
      db.query(inp_query, inpValues, (error, result) => {
        if (error) res.status(401).send({ message: "Something error in the query" });
      });
    })
    p_defects.forEach(def => {
      const pdi_query = "update pdi_defects set pdi_defect_quantity=?,pdi_defect=?,pdi_defect_location=?,pdi_category_defect=?,pdi_defect_details=?,pdi_rework_status=?,pdi_rework_details=?,pdi_rework_handler=? where defect_id=?";
      const pdiValues = [parseInt(def.pdi_defect_quantity), def.pdi_defect, def.pdi_defect_location, def.pdi_category_defect, def.pdi_defect_details, def.pdi_rework_status, def.pdi_rework_details, def.pdi_rework_handler, def.defect_id]
      db.query(pdi_query, pdiValues, (error, result) => {
        if (error) res.status(401).send({ message: "Something error in the query" });
      });
    })
    r_defects.forEach(def => {
      const rej_query = "update rejection_defects set rejection_defect_quantity=?,rejection_defect=?,rejection_defect_location=?,rejection_category_defect=?,rejection_defect_details=?,rejection_rework_status=?,rejection_rework_details=?,rejection_rework_handler=? where defect_id=?";
      const rejValues = [parseInt(def.rejection_defect_quantity), def.rejection_defect, def.rejection_defect_location, def.rejection_category_defect, def.rejection_defect_details, def.rejection_rework_status, def.rejection_rework_details, def.rejection_rework_handler, def.defect_id]
      db.query(rej_query, rejValues, (error, result) => {
        if (error) res.status(401).send({ message: "Something error in the query" });
      });
    })
    res.status(201).send({ message: "Report Updated Successfully" });
  } else {
    res.send({ message: "Unauthorized" });
  }

}
