const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model('usuarios', Usuario);