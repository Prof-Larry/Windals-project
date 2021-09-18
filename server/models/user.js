import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
});

// UserSchema.pre("save", function (next) {
//here we will check if the password is modified
//this will prevent the bcrypt to hash it again...
// })

export const CreateUser = mongoose.model('User', UserSchema);
