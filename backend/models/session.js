import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    history: [],
}, { timestamps: true })

const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel;