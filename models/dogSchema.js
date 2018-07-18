const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    toy: {
        type: String
    },
    nickname:{
        type: String
    }
})

module.exports = Item = mongoose.model("item", ItemSchema)