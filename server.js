const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const db = require("./config/keys.js").mongoURI
const port = process.env.PORT || 3000
const dogs = require("./routes/api/dogList.js")
const methodOverride = require("method-override")
const GridfsStorage = require("multer-gridfs-storage")
const mongoURI =  require('./config/keys.js')

const conn = mongoose.createConnection(mongoURI) 

let gfs

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

const storage = new GridfsStorage({
    url: mongoURI,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err)
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname)
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    }
                    resolve(fileInfo)
                })
            })
        }
})
const upload = multer({ storage })


app.use(methodOverride("_method"))
app.use(bodyParser.json())

mongoose.connect(db)
    .then(() => console.log("mongo connected"))
    .catch( err => console.log(err))

app.use('/api/dogs', dogs)

app.listen(port, () => console.log(`server started on port ${port}`))