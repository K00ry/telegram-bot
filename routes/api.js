
const express = require('express');
const router = express.Router();
const HearSay = require('../models/hearSays').HearsSays;

router.get('/',(req,res)=>{

    HearSay.find({}, function(err, hears) {
        res.json({
            allHears: hears
        });
        if (err){
            res.json({
                err: err
            })
        }
    });
});


module.exports = router;