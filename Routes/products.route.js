const express = require("express")
const router = express.Router()

const Product = require('../Model/products.model')

router.get("/", (req, res, next) => {
	res.send("I'm getting a list of all products")
})
router.post ("/", (req, res, next) => {
	console.log(req.body)
	const product = new Product ({
		name: req.body.name,
		price: req.body.price
	})
	product.save()
	.then( result => {
		console.log(result)
		res.send(result)
	})
	.catch(err => {
		console.log(err.message)
	})
})

// USING IDS
router.get("/:id", (req, res, next) => {
	// res.send("getting a single product")
	next(new Error ("this page is fulty"))
})
router.patch("/:id", (req, res, next) => {
	res.send("Updating a single product")
})
router.delete("/:id", (req, res, next) => {
	res.send("deleting a single product")
})


module.exports = router