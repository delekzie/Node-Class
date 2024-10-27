const express = require("express")
const router = express.Router()

const Product = require('../Model/products.model')
const productController = require('../Controllers/products.controller')

//getting a list of all products from your database
router.get("/", productController.getAllProducts)
//creating a product in our database / add to database
router.post ("/", productController.createNewProduct)
// gettin a product by its ID
router.get("/:id", productController.getById)
//how to update a product using id
router.patch("/:id", productController.updateProduct)
//how to delete data from our database
router.delete("/:id", productController.deleteProduct )


module.exports = router