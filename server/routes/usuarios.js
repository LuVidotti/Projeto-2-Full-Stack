const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../models/Usuario');
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuarios');
const SECRET = 'segredo_jwt';

function verifyToken(req,res,next) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(403).json({message: 'Erro, token nao fornecido'});
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            res.status(400).json({message: 'Erro, token invalido', erro:err});
        }

        Usuario.findOne({_id: decoded.userId}).then((user) => {
            req.user = user;
            next();
        })
    })
}

router.post('/cadastrar', (req,res) => {
    let erros = [];
    
    if(!req.body.usuario || typeof req.body.usuario === undefined || req.body.usuario === null) {
        erros.push('Erro, usuario invalido');
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        erros.push('Erro, senha invalida');
    }

    if(req.body.senha.length < 4) {
        erros.push('Erro, a senha deve ter pelo menos 4 caracteres');
    }

    if(req.body.senha2 !== req.body.senha) {
        erros.push('Erro, as senhas devem coincidir');
    }

    if(erros.length > 0) {
        res.status(400).json(erros);
    } else {
        const salt = bcrypt.genSaltSync(10); //adicionando criptografia na senha
        const hash = bcrypt.hashSync(req.body.senha, salt);

        const novoUsuario = {
            usuario: req.body.usuario,
            senha: hash
        }

        new Usuario(novoUsuario).save().then((usuarioCriado) => {
            res.status(201).json({message: 'Usuario adicionado com sucesso!!!', usuario:usuarioCriado});
        }).catch((erro) => {
            res.status(500).json({message: 'erro interno no servidor', error: erro.message});
        })
    }
})

router.post('/login', (req,res) => {
    let user = req.body.usuario;
    let password = req.body.senha;

    if(!user || typeof user === undefined || user === null) {
      return res.status(404).json({ status: false, message: "Usuário ou senha invalidos" });
    }

    if(!password || typeof password === undefined || password === null) {
      return res.status(404).json({ status: false, message: "Usuário ou senha invalidos" });
    }

        Usuario.findOne({usuario: user}).then((usuario) => {
            if(!usuario) {
                return res.status(404).json({message: 'Erro, este usuario nao existe'});
            }

            bcrypt.compare(password, usuario.senha).then((batem) => {
                if(!batem) {
                   return res.status(401).json({message: 'Senha incorreta'});
                }

                const token = jwt.sign({userId: usuario._id}, SECRET, {
                expiresIn: '50 min'
            });
		
            if(token)
                return res.status(200).json({message: 'Login realizado com sucesso!!!', token: token });
            })
        })
})


module.exports = {
    router: router,
    verifyToken: verifyToken
};