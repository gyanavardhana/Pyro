const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./DB/db");
const userRoutes = require("./Routes/userRoute");

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});