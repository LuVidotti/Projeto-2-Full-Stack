const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistroBusca = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    termoBuscado: {
        type: String,
        required: true
    },
    dataBusca: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("registroBuscas", RegistroBusca);