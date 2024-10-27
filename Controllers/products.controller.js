const mongoose = require("mongoose")
const CreateError = require("http-errors")

const Product = require('../Model/products.model')

module.exports = {
	getAllProducts : async (req, res, next) => {
		try{
			//this is to find all products from the database
			const allProducts = await Product.find()
			res.send(allProducts)
			
			//this is to remove the __v from the object list
			//const allProducts = await Product.find({}, {__v: 0})
	
			//this is to filter and find the object that has correllation of what is being demanded
			//const allProducts = await Product.find({price: 1234456 }, {})
	
			//this is to get the object pair that is needed
			// const allProducts = await Product.find({}, {name: 1, price: 1})
		}catch(error){
			console.log(error.message)
		}
		// res.send("I'm getting a list of all products")
	},
	
	createNewProduct :  async (req, res, next) => {
		try {
			const product = new Product(req.body)
			const result = await product.save()
			res.send(result);
		} catch (error) {
			console.log(error.message)
			if(error.name === "ValidationError"){
				next(CreateError( 422, error.message))
				return
			}
			next(error)
		}
	
		// console.log(req.body)
		// const product = new Product ({
		// 	name: req.body.name,
		// 	price: req.body.price
		// })
		// product.save()
		// .then( result => {
		// 	console.log(result)
		// 	res.send(result)
		// })
		// .catch(err => {
		// 	console.log(err.message)
		// })
	},
	getById : async (req, res, next) => {
		//store the id in variable
		const id = req.params.id;
		try{
			//Using find one
			// const product = await Product.findOne({_id: id})
			const product = await Product.findById(id);
	
			if(!product){
				throw CreateError(404, "This item does not exit")
			}
			res.send(product)
		} catch (error) {
			if(error instanceof mongoose.CastError){
				next(CreateError(400, 'invalid product'))
				return;
			}
			
		next(error)
		}
	},
	updateProduct :  async (req, res, next) => {
		try{
			const id = req.params.id
			const update = req.body
			option = {new: true}
	
			const result = await Product.findByIdAndUpdate(id, update, option)
			res.send(result)
			
			if(!result){
				throw CreateError(404, "This item does not exit")
			}
			
		} catch (error) {
			console.log(error.message)
			if (error instanceof mongoose.CastError) {
			 next(CreateError(400, "ivalid product id"))
			 return
			}	
		}
		// ("Updating a single product")
	},
	deleteProduct : async (req, res, next) => {
		const id = req.params.id
		try{
			const deletedItem = await Product.findByIdAndDelete(id)
			res.send(deletedItem)
	
			if(!deletedItem){
				throw CreateError(404, "This item does not exit")
			}
		} catch (error) {
			console.log(error.message)
			if(error instanceof mongoose.CastError){
				next(CreateError(400, 'invalid product'))
				return;
			}
		}
		// ("deleting a single product")
	} 
} 