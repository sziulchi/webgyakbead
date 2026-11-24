const mongoose = require("mongoose");
const tartalomSchema = new mongoose.Schema({

    id:{type: Number, unique: true},
    sutiid:Number,
    mentes:String

});
module.exports = mongoose.model("tartalom", tartalomSchema)