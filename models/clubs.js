'use strict';
const mongoose = require('mongoose');

const clubNames = mongoose.Schema({

    name:{type:String,defualt:''},
    country:{type:String,defaul:''},
    image:{type:String,defualt:'default.png'},
    fans:[{

        username:{type:String,default:''},
        email:{type:String,defualt:''}
    }]


});

module.exports = mongoose.model('Club',clubNames);
