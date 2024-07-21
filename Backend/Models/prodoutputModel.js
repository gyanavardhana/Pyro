const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOutputSchema = new Schema({
  prediction: { type: String, required: true },
  probability_maintenance_needed: { type: Number, required: true },
  probability_no_maintenance: { type: Number, required: true },
  productid: { type: Schema.Types.ObjectId, ref: 'Product', required: true } // ProductId of the product
});

const ProductOutput = mongoose.model('ProductOutput', productOutputSchema);
module.exports = ProductOutput;
