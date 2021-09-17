import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
    date: new Date(),
    name: String,
    email: {
        type: email
    }
}, {
    timestamps: true
});