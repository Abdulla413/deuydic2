const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dialogSchema = new Schema({

    deutschq: {
        type: String,
        required: true,
        unique: [true, "بۇ دېئالوگ قوشۇلۇپ بولۇنغان"]
    },
    uyghurq: {
        type: String,
        // required: true
    },
    deutscha: {
        type: String,
        required: true,
        unique: [true, "بۇ دېئالوگ قوشۇلۇپ بولۇنغان"]
    },
    uyghura: {
        type: String,
        // required: true
    },
    topic: {
        type: String
    }

})

module.exports = mongoose.model("dialog", dialogSchema)

