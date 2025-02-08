const express = require("express")
const app = express ()
const {default: mongoose} = require('mongoose')
const cors = require("cors")

const productRoute = require("./route/productRoute.js");
const userRoute = require("./route/userRoute.js");

app.use(express.json())

// routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

app.use(cors());


app.get('/',  (req, res) => {
    res.send('Hello Tochukwu, Welcome to Backend')
})

app.listen(7000, () => {
    console.log('server is running in port 7000')
})

mongoose.connect(
    "mongodb+srv://kvngfrank96:LSVQ4KRNSXCjLOHv@cluster0.pb3eb.mongodb.net/"
).then(() => {
    console.log("database connected")
})
.catch(() => {
    console.log("database not connected")
});