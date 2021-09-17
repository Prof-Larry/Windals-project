import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const CreateUser = mongoose.model('User', UserSchema);
