const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brewery: String,
    type: String,
    countryStateCity: String,
    abv: String,
    aroma: String,
    appearance: String,
    flavor: String,
    pricePaid: { type: Number, min:0 },
    rating: { type: Number, min: 0, max: 100 },
    liked: {type: Boolean, default: false },
    tastingNotes: String,
    beerImg: String,
    memory: [
        {
        dateTried: String,
        event: String,
        memNotes: String,
        memImg: String
        }
    ],
    }, { timestamps: true })
    

const Beer = mongoose.model('Beer', beerSchema)
module.exports = Beer
    