import mongoose from "mongoose"
mongoose.connect('mongodb://127.0.0.1:27017/jkt48').then(() => console.log('  Database: Connected to Database JKT48')).catch((err) => console.log(err))

// import mongoose from "mongoose"
// mongoose.connect(process.env.DATABASE, {

// }).then((res) => console.log('Database Connection Success.')).catch((err) => console.log(err))
