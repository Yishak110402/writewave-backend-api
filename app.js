const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes.js')
const postRouter = require('./routes/postRoutes.js')

app.use(express.json())
app.use(express.static("./public"))
app.use(cors())
app.use('/users', userRouter)
app.use('/posts', postRouter)

console.log(process.env.URL);
const mongoURL = "mongodb+srv://yishak:rfTtsGRqkPr5ILhL@write-wave.3yjawuk.mongodb.net/writewave?retryWrites=true&w=majority&appName=write-wave"
const localMongoURL = "mongodb://127.0.0.1:27017/writewave"


mongoose.connect(localMongoURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log("DB Connection Successful");
}).catch((err)=>{
    console.log(err.message);
})


app.get('/test',(req, res)=>{
    console.log("Test Successful");
    res.status(200).json({
        message:"Successful"
    })
})

app.listen(6969,()=>{
    console.log("listening on port 6969");
})