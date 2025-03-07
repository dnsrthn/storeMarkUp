import { Schema, model } from "mongoose";

const categorySchema = Schema({
    nameCategory: {
        type: String,
        required: [true, "Name category is required"],
        unique: true
    },
    categoryDescription: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model('Category', categorySchema);