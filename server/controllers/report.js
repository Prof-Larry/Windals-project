export const saveReport = async (req, res, next) => {
    try {
        const { inspection, inp_report, pdi_report, rej_report, inpro_defect, pdi_defect, rej_defect } = req.body;
        const report_date = moment().format('YYYY-MM-DD');






        next();
    } catch (e) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}
