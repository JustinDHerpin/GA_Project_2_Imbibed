const mongoose = require('../db/connection')
const User = require('./user')

const wineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vineyard: String,
    countryState: String,
    region: String,
    vintage: String,
    type: String,
    varietal: String,
    pricePaid: { type: Number, min:0 },
    rating: { type: Number, min: 0, max: 100 },
    liked: {type: Boolean, default: false },
    tastingNotes: String,
    wineImg: String,
    memory: [
        {
        dateTried: String,
        event: String,
        memNotes: String,
        memImg: String
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    }, { timestamps: true })
    

const Wine = mongoose.model('Wine', wineSchema)
module.exports = Wine
    