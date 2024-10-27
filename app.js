const express = require("express")
const mongoose = require("mongoose")
const app = express();
const dotevn = require("dotenv").config()
//adopting the http error inside our app
const createError = require("http-errors")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
// mongodb+srv://Ayodele:Aderinwale12@cluster0.jxpibgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(process.env.URI , 
	{
		dbName: process.env.database
	}
)
.then(()=>{
	console.log("Database connected Successfully")
})
.catch(err => console.log(err.message));

mongoose.connection.on("connected", ()=>{
	console.log("mongoose successfully connected")
})

// mongoose.connection.on("connected", () => {
// 	console.log("Mongoose connected to database Successfully")
// })

// mongoose.connection.on("error", (err) => {
// 	console.log(err.message)
// })

// mongoose.coneection.on("disconnected", () => {
// 	console.log("mongoose disconnected from the database")
// } )
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
//handling built in error
// app.use( (req, res, next)=> {
// 	const err = new Error ("This page cannot be found")
// 	err.status = 404
// 	next(err)
// })

//Using Error from npm package
app.use((req, res, next)=>{
	n
	next(createError(404, "Page Not Found, Try again later"))
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

 const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log("Server is running on port " + port)
})
