const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb+srv://mamao:mamao@cluster0.4hsyc.mongodb.net/mamao?retryWrites=true&w=majority';
// mongodb+srv://<username>:<password>@cluster0.4hsyc.mongodb.net/<dbname>?retryWrites=true&w=majority

module.exports = {
    /**
     * realiza conexão com o banco
     * 
     * @returns {Promise}
     */
    connect: () => {
        return mongoose.createConnection(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}