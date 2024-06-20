const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const connectToDB = require("./db");


connectToDB();
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}

));


app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

next();
})
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


app.use('/api/',require("./Routes/createUser"))
app.use('/api/',require("./Routes/DisplayData"))
app.use('/api/',require("./Routes/OrderData"))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
