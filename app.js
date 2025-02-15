const express = require("express")
const app = express ()
const dotenv = require("dotenv")
const {default: mongoose} = require('mongoose')
const cors = require("cors")
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

dotenv.config();

const productRoute = require("./route/productRoute.js");
const userRoute = require("./route/userRoute.js");

app.use(express.json())

// routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

// app.use(cors());


app.get('/',  (req, res) => {
    res.send('Hello Tochukwu, Welcome to Backend')
})

app.listen(process.env.PORT, () => {
    console.log('server is running in port 7000')
})

mongoose.connect(
    process.env.MONGODB_URL
).then(() => {
    console.log("database connected")
})
.catch(() => {
    console.log("database not connected")
});