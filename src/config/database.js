const mongoose = require('mongoose');

const connectionDb = async () =>{
    await mongoose.connect('mongodbURI:')
}

module.exports = connectionDb;

