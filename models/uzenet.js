const mongoose = require("mongoose");
const uzenetSchema = new mongoose.Schema({
    nev: {
        type: String,
        required: [true, "Kötelező mező"],
        minlength: [3, "Kötelező mező (3 karakter)"]
    },
    email: {
        type: String,
        required: [true, "Az e-mail kötelező!"],
        match: [/^\S+@\S+\.\S+$/, "Érvénytelen e-mail cím"]
    },
    uzenet: {
        type: String,
        required: [true, "Az üzenet kötelező!"],
        minlength: [4, "Kötelező mező (4 karakter)"]
    }
}, { timestamps: true });
module.exports = mongoose.model("uzenet", uzenetSchema, "uzenet");