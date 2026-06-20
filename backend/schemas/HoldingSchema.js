const {Schema}= require("mongoose");

// 1--as file name same  it will tell mongoose which properties are expected from data /on this schema bases we creae model holdingsModel
const HoldingSchema =  new Schema({

    userId: { type: String, required: true },
    name:String,
    qty:Number,
    avg:Number,
    price:Number,
    net:String,
    day:String,
});

module.exports={HoldingSchema};