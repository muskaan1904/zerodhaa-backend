const {Schema} = require("mongoose");
// whoes has placed this order
const OrdersSchema = new Schema({
    userId: { type: String, required: true },
    name:String,
    qty:Number,
    price:Number,
    mode:String,//buy or sell
});

module.exports = {OrdersSchema};