import moment from 'moment';
import jwt from 'jsonwebtoken';
import db from '../Database/db.js';

export const saveReport = (req, res) => {
    try {
        const { inspection, inp_report, pdi_report, rej_report, inpro_defect, pdi_defect, rej_defect } = req.body;
        const report_date = moment().format('YYYY-MM-DD');
        const token = req.cookies.admin || req.cookies.master;
        const decoded_admin = jwt.verify(token, process.env.SECRET_AUTH + "");
        console.log(decoded_admin);
        // ------------Temporary assignment for debugging----------
        inp_report.inprocess_total_defective_quantity = "30"
        pdi_report.inprocess_total_defective_quantity = "30"
        rej_report.inprocess_total_defective_quantity = "30"
        // ------------Temporary assignment for debugging----------


        const report_values = [report_date, decoded_admin, inspection.plant_code, inspection.production_line, inspection.product_number, inspection.product_name, inp_report.inprocess_name, parseInt(inp_report.inprocess_total_quantity), parseInt(inp_report.inprocess_total_defective_quantity), pdi_report.pdi_name, parseInt(pdi_report.pdi_total_quantity), parseInt(pdi_report.pdi_total_defective_quantity), rej_report.rejection_name, parseInt(rej_report.rejection_total_quantity), parseInt(rej_report.rejection_total_defective_quantity)];
        const add_report = "Insert Into report(report_date,admin_id,plant_code,production_line,product_number,product_name,inprocess_name,inprocess_total_quantity,inprocess_total_defective_quantity,pdi_name,pdi_total_quantity,pdi_total_defective_quantity,rejection_name,rejection_total_quantity,rejection_total_defective_quantity) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        db.query(add_report, report_values, (error, results) => {
            if (error) throw new Error();

            inpro_defect.forEach(defect => {
                const inprocess_defects_values = [parseInt(defect.inprocess_defect_quantity), defect.inprocess_defect, defect.inprocess_defect_location, defect.inprocess_category_defect, defect.inprocess_defect_details, defect.inprocess_rework_status, defect.inprocess_rework_details, defect.inprocess_rework_handler, results.insertId];
                const add_inprocess_Defect = "insert into inprocess_defects(inprocess_defect_quantity,inprocess_defect,inprocess_defect_location,inprocess_category_defect,inprocess_rework_status,inprocess_rework_details,inprocess_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
                db.query(add_inprocess_Defect, inprocess_defects_values, (error, results) => {
                    if (error) throw new Error();
                });
            });
            pdi_defect.forEach(defect => {
                const pdi_defects_values = [parseInt(defect.pdi_defect_quantity), defect.pdi_defect, defect.pdi_defect_location, defect.pdi_category_defect, defect.pdi_defect_details, defect.pdi_rework_status, defect.pdi_rework_details, defect.pdi_rework_handler, results.insertId];
                const add_pdi_Defect = "insert into pdi_defects(pdi_defect_quantity,pdi_defect,pdi_defect_location,pdi_category_defect,pdi_rework_status,pdi_rework_details,pdi_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
                db.query(add_pdi_Defect, pdi_defects_values, (error, results) => {
                    if (error) throw new Error();
                });
            });
            rej_defect.forEach(defect => {
                const rejection_defects_values = [parseInt(defect.rejection_defect_quantity), defect.rejection_defect, defect.rejection_defect_location, defect.rejection_category_defect, defect.rejection_defect_details, defect.rejection_rework_status, defect.rejection_rework_details, defect.rejection_rework_handler, results.insertId];
                const add_rejection_Defect = "insert into rejection_defects(rejection_defect_quantity,rejection_defect,rejection_defect_location,rejection_category_defect,rejection_rework_status,rejection_rework_details,rejection_rework_handler,report_id) values (?,?,?,?,?,?,?,?,?)";
                db.query(add_rejection_Defect, rejection_defects_values, (error, results) => {
                    if (error) throw new Error();
                });
            });
        });
        res.send({ message: "Report submitted successfully" });
    } catch (e) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}
