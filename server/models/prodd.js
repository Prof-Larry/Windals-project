import mongoose from 'mongoose';

const ProcessDropdownSchema = mongoose.Schema({
    process_name: String,
    process_categories: [{
        category_name: {
            type: String
        }
    }]
});

export const ProDropDown = mongoose.model('ProcessDropdown', ProcessDropdownSchema);