const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Filme');
const Filme = mongoose.model('filmes');
const usuarios = require('../routes/usuarios');
const redis = require('express-redis-cache');
require('../models/RegistroBusca');
const RegistroBusca = mongoose.model('registroBuscas');
const logger = require('../logger');

const cache = redis();

const caracteresProibidos = /[<>(){}[\];,.]/;

function validarCaracteresIndesejados(input) {
    return caracteresProibidos.test(input);
}

router.post('/', usuarios.verifyToken, (req,res) => {
    let erros = [];

    if(validarCaracteresIndesejados(req.body.nome)) {
        logger.error("Erro, ha alguns caracteres invalidos no campo nome")
        erros.push({message: "Erro, ha alguns caracteres invalidos no campo nome"});
    } 

    if(validarCaracteresIndesejados(req.body.descricao)) {
        logger.error("Erro, ha alguns caracteres invalidos no campo descricao")
        erros.push({message: "Erro, ha alguns caracteres invalidos no campo descricao"});
    } 
    
    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null || req.body.nome === "") {
        logger.error("Erro, nome invalido")
        erros.push({message: 'Erro, nome invalido'});
    }

    if(!req.body.dataLancamento || typeof req.body.dataLancamento === undefined || req.body.dataLancamento === null || req.body.dataLancamento === "") {
        logger.error("Erro, data invalida");
        erros.push({message: 'Erro, data invalida'});
    }

    if(!req.body.descricao || typeof req.body.descricao === undefined || req.body.descricao === null || req.body.descricao === "") {
        logger.error("Erro, descricao invalida")
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
            logger.info("Um filme foi adicionado", {filmeSalvo: filmeSalvo});
            res.status(201).json({ message: 'Filme adicionado com sucesso!!!', filmeSalvo });
        }).catch((erro) => {
            logger.error("Erro ao salvar filme", erro);
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
    const user = req.user;

    Filme.find({nome: termoPesquisa}).then((filmes) => {
        const novaBusca = {
            usuarioId: user._id,
            termoBuscado: termoPesquisa,
        }
        new RegistroBusca(novaBusca).save().then((busca) => {
            logger.info("busca registrada com sucesso!!!", {busca: busca});
        }).catch((erro) => {
            logger.error("Erro ao registrar busca", erro)
        })
        res.status(200).json(filmes);
    }).catch((erro) => {
        logger.error("Erro interno no servidor", erro);
        res.status(500).json({message: 'Erro interno no servidor', erro});
    })
})


module.exports = router;