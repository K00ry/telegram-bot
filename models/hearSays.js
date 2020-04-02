"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const H_S = new Schema({
    hears: String,
    says:String,

});


// const ProductSchema = new Schema({
//     genreEn: String,
//     genreFarsi: String,
//     genreId: String,
//     type: String,
//     img: String,
//     sizes: [sizeSchema]
// });
const HearsSays = mongoose.model("hearSays", H_S);
module.exports.HearsSays = HearsSays;