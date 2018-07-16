const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const db = require("./config/keys.js").mongoURI
const port = process.env.PORT || 3000
const dogs = require("./routes/api/dogList.js")



app.use(bodyParser.json())

mongoose.connect(db)
    .then(() => console.log("mongo connected"))
    .catch( err => console.log(err))

app.use('/api/dogs', dogs)

app.listen(port, () => console.log(`server started on port ${port}`))