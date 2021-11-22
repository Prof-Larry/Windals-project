import moment from "moment";
import jwt from "jsonwebtoken";
import db from "../Database/db.js";

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
    // ------------Temporary assignment for debugging----------
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
    // ------------Temporary assignment for debugging----------

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

export const sendReport = (req, res) => {
  const { from, to } = req.body;
  const findReports = "select * from report where report_date between ? and ?";
  db.query(findReports, [from, to], (error, results) => {
    if (error) return res.send({ message: "Some Technical Error" });
    return res.send(results);
  });
};

export const sendCompleteReport = (req, res) => {
  const { id } = req.params;
  const complete_report = {};
  db.query("select * from report where report_id=?", [id], (error, results) => {
    if (error) return res.send({ message: "No report has been found!!!" });

    const report = results[0];
    complete_report = { report };
  });
  db.query(
    "select * from inprocess_defects where report_id=?",
    [id],
    (error, results) => {
      if (error) return res({ message: "No inprocess_defects" });

      complete_report = { ...complete_report, results };
    }
  );
  db.query(
    "select * from pdi_defects where report_id=?",
    [id],
    (error, results) => {
      if (error) return res({ message: "No pdi_defects" });

      complete_report = { ...complete_report, results };
    }
  );
  db.query(
    "select * from rejection_defects where report_id=?",
    [id],
    (error, results) => {
      if (error) return res({ message: "No rejection_defects" });

      complete_report = { ...complete_report, results };
    }
  );

  return res.send(complete_report);
};
