import mongoose from "mongoose";

const Schema = mongoose.Schema;

// const AdminSchema = Schema({
//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     empid: {
//         type: String,
//         required: true
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     tokens: [{
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// });

const InspectionDropdownSchema = Schema({
    plant_code: String,
    production_line: [{
        line: String
    }],
    product: [{
        product_number: String,
        product_name: String
    }],
    process: [{
        process_name: String
    }]
});


// AdminSchema.methods.generateAuthToken = async function () {
//     try {
//         const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_AUTH + "");
//         this.tokens = this.tokens.concat({ token });
//         return token;
//     } catch (error) {
//         throw error;
//     }
// }

// //converting password into hash
// AdminSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

export const InpDropDown = mongoose.model('InspectionDropdown', InspectionDropdownSchema);
// export const Admin = mongoose.model('Admin', AdminSchema);
