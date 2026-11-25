const mongoose = require("mongoose");
const arSchema = mongoose.Schema({
    id:{type: Number, unique: true},
    sutiid:Number,
    ertek:Number,
    egyseg:String
});
module.exports = mongoose.model("ar", arSchema, "ar");