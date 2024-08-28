const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieparser = require("cookie-parser")
const { app, httpServer } = require("./socket/socket")


require("dotenv").config()


mongoose.connect(process.env.MONGO_URL)
// const app = express()
app.use(express.json())
app.use(express.static("dist"))


app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
app.use(cookieparser())


app.use("/api/todo", require("./routers/todoRoutes"))


app.use("*", (req, res)=> {
    res.status(404).json({message:"Resoure Not Found"})
})

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({message:"Something went wrong"})
})

mongoose.connection.once("open", ()=>{
    console.log("MONGO CONNECTED");
    httpServer.listen(process.env.PORT, console.log("SERVER RUNNING"))
})