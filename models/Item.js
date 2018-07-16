const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        data: Buffer, contentType: string
    }
})

module.exports = Item = mongoose.model("item", ItemSchema)