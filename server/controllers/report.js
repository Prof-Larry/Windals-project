import moment from 'moment';

export const saveReport = (req, res) => {
    try {
        const { inspection, inp_report, pdi_report, rej_report, inpro_defect, pdi_defect, rej_defect } = req.body;
        const report_date = moment().format('YYYY-MM-DD');

        console.log(inspection);
        console.log(inp_report);
        console.log(pdi_report);
        console.log(rej_report);
        console.log(inpro_defect);
        console.log(pdi_defect);
        console.log(rej_defect);

        res.send({ message: "Report submitted successfully" });
    } catch (e) {
        res.status(401).send("Unauthorized: No Token Provided!");
    }
}
