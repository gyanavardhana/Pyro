const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    Type: {type: String, required: true},
    Airtemperature: { type: Number, required: true },
    Processtemperature: { type: Number, required: true },
    Rotationalspeed: { type: Number, required: true },
    Torque: { type: Number, required: true },
    Toolwear: { type: Number, required: true },
    count: { type: Number, default: 1 }, // Initially set to one, can be changed
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // UserId who created this product
    outputid: { type: Schema.Types.ObjectId, ref: 'ProductOutput'} // OutputId of the prediction
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
