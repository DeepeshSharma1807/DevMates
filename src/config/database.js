const mongoose = require('mongoose');

const connectionDb = async () =>{
    await mongoose.connect('mongodb+srv://deepeshsharma258025_db_user:Deep108@cluster0.9fhoypk.mongodb.net/devmates')
}

module.exports = connectionDb;

