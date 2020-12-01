const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./account/userRoute"); 

const app = express();

require("./config/db")(app);
app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json())
app.use(morgan("dev"));

app.get("/",(reg,res)=>{
    console.log("First Route");
})
app.use("/user", userRoutes);
//app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
    console.log(`App is travelling on Port ${PORT}`)
})