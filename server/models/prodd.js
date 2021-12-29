import mongoose from 'mongoose';

const ProcessDropdownSchema = mongoose.Schema({
    process_name: String,
    process_Defects: [{
        defect_name: {
            type: String
        }
    }]
});

export const ProDropDown = mongoose.model('ProcessDropdown', ProcessDropdownSchema);