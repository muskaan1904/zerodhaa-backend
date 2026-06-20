const {model} =  require("mongoose");

// 2---need schema on bases we create model//used by mongodb to create collections
const {HoldingSchema} = require("../schemas/HoldingSchema");
// create model below here holding will convert in holdings in db that will be collection
const HoldingsModel = new model("holding", HoldingSchema);

module.exports={HoldingsModel};