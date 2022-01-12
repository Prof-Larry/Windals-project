import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InspectionDropdownSchema = Schema({
  plant_code: String,
  production_line: [
    {
      line: String,
    },
  ],
  process: [
    {
      process_name: String,
    },
  ],
});

export const InpDropDown = mongoose.model(
  "InspectionDropdown",
  InspectionDropdownSchema
);
