const mongoose = require("mongoose");
const sutiSchema = mongoose.Schema({

    id: {type: Number, unique: true},
    nev:String,
    tipus: String,
    dijazott: Number

});
module.exports = mongoose.model("Suti", sutiSchema);