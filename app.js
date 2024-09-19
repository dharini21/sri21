const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())


const userRoutes = require('././routes/userRoutes.js')
app.use('/api', userRoutes)
const adminRoutes = require('./routes/adminRoutes.js')
app.use('/api', adminRoutes)
const doctorRoutes = require('././routes/doctorRoutes.js')
app.use('/api', doctorRoutes)


mongoose.connect('mongodb://localhost:27017/UDM').then(() => {
    console.log("connected..");
}).catch((error) => {
    console.error(error, 'connection failed')
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})


