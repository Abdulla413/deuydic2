const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const editorSchema = new Schema({

    name: {
        type: String,
        required: [false, "ئىسىم قوشۇڭ"],
    },

    email: {
        type: String,
        required: [true, " ئېمىل قوشۇڭ"],
        unique: true

    },
    password: {
        type: String,
        required: [true, " مەخپى نومۇرىنى كىرگۈزۈڭ "],
    },

    rohset: {
        type: String,
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Editor", editorSchema)

