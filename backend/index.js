require('dotenv').config();
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { default: Orders } = require('../dashboard/src/components/Orders');
// const{Orders} = require("../dashboard/src/components/Orders");
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { UserModel } = require('./model/UserModel');
// const { OrdersModel } = require('./model/OrdersModel');
// const { authRouter } = require("./routes/auth.routes.js");
const authRouter = require("./routes/auth.routes.js");
const { OrdersModel } = require('./model/OrdersModel');
const authMiddleware = require("./util/authMiddleware.js");
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();
app.use(
  cors({
     origin: ["http://localhost:3003", "http://localhost:3004"],
    credentials: true,
  })
);


app.use(bodyParser.json());
app.use(cookieParser());
// api route but temporary , we use this when we initialize dummy data
// get is route where we send and read , post when get informa from user

// app.get("/addHoldings", async(requestAnimationFrame,res)=>{
// // holdings
//     let tempHoldings= [
//       {
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//       },
//       {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//       },
//       {
//         name: "HINDUNILVR",
//         qty: 1,
//         avg: 2335.85,
//         price: 2417.4,
//         net: "+3.49%",
//         day: "+0.21%",
//       },
//       {
//         name: "INFY",
//         qty: 1,
//         avg: 1350.5,
//         price: 1555.45,
//         net: "+15.18%",
//         day: "-1.60%",
//         isLoss: true,
//       },
//       {
//         name: "ITC",
//         qty: 5,
//         avg: 202.0,
//         price: 207.9,
//         net: "+2.92%",
//         day: "+0.80%",
//       },
//       {
//         name: "KPITTECH",
//         qty: 5,
//         avg: 250.3,
//         price: 266.45,
//         net: "+6.45%",
//         day: "+3.54%",
//       },
//       {
//         name: "M&M",
//         qty: 2,
//         avg: 809.9,
//         price: 779.8,
//         net: "-3.72%",
//         day: "-0.01%",
//         isLoss: true,
//       },
//       {
//         name: "RELIANCE",
//         qty: 1,
//         avg: 2193.7,
//         price: 2112.4,
//         net: "-3.71%",
//         day: "+1.44%",
//       },
//       {
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: true,
//       },
//       {
//         name: "SGBMAY29",
//         qty: 2,
//         avg: 4727.0,
//         price: 4719.0,
//         net: "-0.17%",
//         day: "+0.15%",
//       },
//       {
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: true,
//       },
//       {
//         name: "TCS",
//         qty: 1,
//         avg: 3041.7,
//         price: 3194.8,
//         net: "+5.03%",
//         day: "-0.25%",
//         isLoss: true,
//       },
//       {
//         name: "WIPRO",
//         qty: 4,
//         avg: 489.3,
//         price: 577.75,
//         net: "+18.08%",
//         day: "+0.32%",
//       },
//     ];
//     // 3--create model for each object and then perform save operation in db
// // bases on model we create temoray model where we pass actiall dtaa

//     tempHoldings.forEach((item)=>{
//         let newHolding = new HoldingsModel({
//             name:item.name,
//             qty:item.qty,
//             avg:item.avg,
//             price:item.price,
//             net:item.net,
//             day:item.day,
//         });

//         newHolding.save();
//     });
//     res.send("Done!");
// });

// sen dpositions dummy dat ain db

// app.get("/addPositions", async(req,res)=>{
// // // positions dummy data send in mongodb
//     let tempPositions= [
// {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//     ];
// //     // 3--create model for each object and then perform save operation in db
// // // bases on model we create temoray model where we pass actiall dtaa

//     tempPositions.forEach((item)=>{
//         let newPosition = new PositionsModel({
//           product:item.product,
//             name:item.name,
//             qty:item.qty,
//             avg:item.avg,
//             price:item.price,
//             net:item.net,
//             day:item.day,
//             isLoss:item.isLoss,
//         });

//         newPosition.save();
//     });
//     res.send("Done!");
// });




// now we create a data api endpoint ,that wi;ll conect with db and fetch data from db and show on dashboard
// endpoint--allhodlings all hold read
app.get('/allHoldings', authMiddleware, async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user._id });
  res.json(allHoldings);
});

// these are endpoints of api now can connect with dashboard
app.get('/allPositions', authMiddleware, async (req, res) => {
  let allPositions = await PositionsModel.find({ userId: req.user._id });
  res.json(allPositions);
});

// orders for taking from user like qty 
app.post('/newOrder', authMiddleware, async (req, res) => {
  let newOrder = new OrdersModel({
    userId: req.user._id.toString(),
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,//buy or sell
  });

  newOrder.save();

  res.send("Order saved!");
});

// get all orders for logged-in user
// app.get('/allOrders', authMiddleware, async (req, res) => {
//   let allOrders = await OrdersModel.find({ userId: req.user._id });
//   res.json(allOrders);
// });

app.get('/allHoldings', async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});


// signup signin route

app.use("/auth", authRouter);



app.listen(PORT, () => {
  console.log("App started!");
  // mongoose.connect(uri);
  // console.log("DB connected");
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

});


