import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategoryDropdownSchema = Schema({
    category: String,
    defects: [{
        defect: String
    }]
});

export const CategoryDropDown = mongoose.model('CategoryDropdown', CategoryDropdownSchema);
