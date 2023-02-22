require("dotenv").config();
const  express = require('express');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.set('strictQuery', true)
const fileUpload = require ('express-fileupload')
const cloudinary = require('cloudinary').v2
const productRouter = require('./routes/productsRouter')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//middleware
app.use(express.json());
app.use(fileUpload({useTempFiles: true}))
app.use('/api/v1/products',productRouter)

//error route
// app.use(notFound)
app.use((req,res) => {
    res.status(404).send('Route does not exist')
});


//DBconnections

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, 'localhost', ()=>{
            console.log(`listening on port ${PORT}..`);
        });
    }catch(error)  {
        console.log(error);
    }
};

startServer ();