import mongoose from "mongoose";
import { Schema } from "mongoose";

const product = new Schema({
    name: String,
    email: String,
    password: String,
    pin:String,
    role: String
});

export default mongoose.model("product", product);