const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating a follow up guideline for a product or user
const ProductSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
})

const Product = mongoose.model('product', ProductSchema)
module.exports = Product;