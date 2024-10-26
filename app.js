const express = require("express")
const mongoose = require("mongoose")
const app = express();



app.use(express.urlencoded({extended: true}))

app.use(express.json())
// mongodb+srv://Ayodele:Aderinwale12@cluster0.jxpibgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb+srv://Ayodele:Aderinwale12@cluster0.jxpibgm.mongodb.net" , 
	{
		dbName: ""
	}
)
.then(()=>{
	console.log("Database connected Successfully")
})




//passing params
app.all("/test", (req, res) => {
	// console.log(req.query)
	// res.send(req.query)
	// console.log(req.params)
	// res.send(req.params)
	console.log(req.body)
	res.send(req.body)
})


//getting a page which route is products
const productRoutes = require("./Routes/products.route.js")
app.use("/products", productRoutes)

//getting a page that is not on my app
app.use( (req, res, next)=> {
	const err = new Error ("This page cannot be found")
	err.status = 404
	next(err)
})

//handling error in express
app.use ((err, req, res, next ) => {
	res.status(err.status || 500)
	res.send({
		error: {
			status: err.status || 500,
			message : err.message
		}
	})
})
app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
