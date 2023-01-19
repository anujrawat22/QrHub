const mongoose = require("mongoose")

const qrSchema = mongoose.Schema({
    userId : {
        type : Types.ObjectId,
        required : true,
        ref : "users"
    },
    connectedDeviceId : {
        type : Types.ObjectId,
        ref : "connectedDevices",
    },
    lastUsedDate : {type : Date,default : null},
    isActive : {type : Boolean,default : false},
    disabled : {type : Boolean, default : false},
})

module.exports = mongoose.model("qrcode",qrSchema)