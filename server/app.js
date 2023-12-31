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
const fs = require("fs");
const https = require('https');

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

https.createServer({
    cert: fs.readFileSync("./SSL/code.crt"),
    key: fs.readFileSync("./SSL/code.key")
}, app).listen(3002, () => {
    console.log("Rodando em https");
})