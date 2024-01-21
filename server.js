require('dotenv').config() 
const { errorHandler } = require('./middleware/errorMiddleware');

const express = require('express')
const mongoose = require('mongoose')

//routes
const categoryRoutes = require('./category/category.routes')
const videoRoutes = require('./video/video.routes')
const audioRoutes = require('./audio/audio.routes')

// const dQuestionRoutes = require('./question/question.routes')

//express app
const app = express();

//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


//routes
app.use('/api/category',categoryRoutes)
app.use('/api/video',videoRoutes)
app.use('/api/audio',audioRoutes)

// app.use('/api/question',dQuestionRoutes)
app.use('/api/auth', require('./auth/userRoutes'));


app.use(errorHandler);


//Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests 
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port', process.env.PORT )
        })
    })
    .catch((error) => {
        console.log(error)
    })


process.env