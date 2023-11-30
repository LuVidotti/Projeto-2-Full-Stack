const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3001;
const filmes = require('./routes/filmes');
const usuarios = require('./routes/usuarios').router;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "http://localhost:5173"}});

//config
    //mongoose
    mongoose.connect('mongodb://127.0.0.1:27017/bancofilmes').then(() => {
        console.log('conectado ao banco de dados!!!');
    }).catch((erro) => {
        console.log('Erro ao se conectar com banco de dados, erro: '+erro);
    })

    //cors
    app.use(cors());

    //body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //socket.io
    io.on('connection', (socket) => {
        console.log('Usuario conectado: '+socket.id);

        socket.on("filme_adicionado", (message) => {
            console.log(message.message);
            socket.broadcast.emit("gerar_notificacao", {notificacao: message});
        })
    })

//rotas
app.use('/api/filmes', filmes);
app.use('/api/usuarios', usuarios);


//server
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})