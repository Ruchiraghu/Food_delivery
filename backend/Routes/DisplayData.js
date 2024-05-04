const express = require('express');
const router = express.Router()

router.post('/foodData',(req,res)=>{
    try{
        const responseData = {
            food_items:global.food_items,
            foodCategory:global.foodCategory
        };
        res.send(responseData);
        
    }catch(error){
        console.error(error.message);
        res.status(500).send("server error")
    }
})
module.exports = router;