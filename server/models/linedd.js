import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LineDropdownSchema = Schema({
  production_line: String,
  product: [
    {
      product_number: String,
      product_name: String,
    },
  ],
});

export const LineDropDown = mongoose.model("LineDropdown", LineDropdownSchema);
