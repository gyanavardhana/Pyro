const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Array of ProductIds
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // Array of favourite ProductIds
});

const User = mongoose.model('User', userSchema);
module.exports = User;
