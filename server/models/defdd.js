import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DefectsDropdownSchema = Schema({
    defect_name: String,
    location: [{
        loc: String
    }],
    defect_handlers: [{
        handlers: String
    }]
});

export const DefectDropDown = mongoose.model('DefectDropdown', DefectsDropdownSchema);
