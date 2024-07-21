const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./DB/db");
const userRoutes = require("./Routes/userRoute");
const mlRoutes = require("./Routes/mlRoute");
const settingRoutes = require("./Routes/settingRoute");
const leaderRoutes = require("./Routes/leaderRoute");
const leaderboardRoutes= require("./Routes/leaderboardRoute");
const reportRoutes= require("./Routes/reportRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/ml', mlRoutes);
app.use('/setting', settingRoutes);
app.use('/leader', leaderRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/report', reportRoutes);

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});