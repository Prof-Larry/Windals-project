import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

// const UserSchema = Schema({
//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     address: {
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

const DefectsDropdownSchema = Schema({
    defect_name: String,
    location: [{
        loc: String
    }],
    category: [{
        cat: String,
    }],
    defect_handlers: [{
        handlers: String
    }]
});


// UserSchema.methods.generateAuthToken = async function () {
//     try {
//         const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_AUTH + "");
//         this.tokens = this.tokens.concat({ token });
//         await this.save();
//         return token;
//     } catch (error) {
//         throw error;
//     }
// }

// //converting password into hash
// UserSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

export const DefectDropDown = mongoose.model('DefectDropdown', DefectsDropdownSchema);
