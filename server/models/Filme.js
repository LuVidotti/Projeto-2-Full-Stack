const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Filme = new Schema({
    nome: {
        type: String,
        required: true
    },
    dataLancamento: {
        type: Date,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
})

mongoose.model('filmes', Filme);