const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
            .connect(process.env.MONGODB_URI)
            .then(() => console.log('MongoDb Connected!'))
    } catch (error) {
        console.log('Connection Failed: ', error)
    }
}

module.exports = connectDB