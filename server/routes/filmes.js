const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Filme');
const Filme = mongoose.model('filmes');
const usuarios = require('../routes/usuarios');
const redis = require('express-redis-cache');

const cache = redis();

const caracteresProibidos = /[<>(){}[\];,.]/;

function validarCaracteresIndesejados(input) {
    return caracteresProibidos.test(input);
}

router.post('/', usuarios.verifyToken, (req,res) => {
    let erros = [];

    if(validarCaracteresIndesejados(req.body.nome)) {
        erros.push({message: "Erro, ha alguns caracteres invalidos no campo nome"});
    } 

    if(validarCaracteresIndesejados(req.body.descricao)) {
        erros.push({message: "Erro, ha alguns caracteres invalidos no campo descricao"});
    } 
    
    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null || req.body.nome === "") {
        erros.push({message: 'Erro, nome invalido'});
    }

    if(!req.body.dataLancamento || typeof req.body.dataLancamento === undefined || req.body.dataLancamento === null || req.body.dataLancamento === "") {
        erros.push({message: 'Erro, data invalida'});
    }

    if(!req.body.descricao || typeof req.body.descricao === undefined || req.body.descricao === null || req.body.descricao === "") {
        erros.push({message: 'Erro, descricao invalida'});
    }

    if(erros.length > 0) {
        res.status(422).json(erros);
    } else {
        const novoFilme = {
            nome: req.body.nome,
            dataLancamento: req.body.dataLancamento,
            descricao: req.body.descricao
        }

        new Filme(novoFilme).save().then((filmeSalvo) => {
            res.status(201).json({ message: 'Filme adicionado com sucesso!!!', filmeSalvo });
        }).catch((erro) => {
            console.error(erro);
            res.status(500).json({ message: 'Erro interno no servidor', error: erro.message });
        });
    }
})

router.get('/', (req,res) => {
    Filme.find().then((filme) => {
        res.status(200).json(filme);
    }).catch((erro) => {
        res.status(500).json(erro);
    })
})

router.get('/:nomeFilme', usuarios.verifyToken, cache.route({expire: 10}), (req,res) => {
    const termoPesquisa = RegExp(req.params.nomeFilme, 'i');

    Filme.find({nome: termoPesquisa}).then((filmes) => {
        res.status(200).json(filmes);
    }).catch((erro) => {
        res.status(500).json({message: 'Erro interno no servidor', erro});
    })
})


module.exports = router;