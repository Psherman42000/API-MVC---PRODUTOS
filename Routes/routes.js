const express = require('express');
const productObject = require('../Model/productObject');
const execute = require('../Controllers/controllers');

const router = express.Router();

router.get('/', (req, res) => {
    return res.send(execute.getAll());
});

router.get('/:id', (req, res) => {
    try{
        return res.send(execute.getById(req.params.id));
    }catch(err){
        return res.status(400).send({error: "Solicitação Inválida"});
    }
});

router.post('/registrar', (req, res) => {
    try{
        product = new productObject(req.body.name, req.body.description, req.body.price);
    }catch(err){
        return res.status(400).send({error: "Solicitação Inválida"});
    }

    if(execute.register(product.getProduct()))
        return res.send({message: "Produto registrado com sucesso"});
    
    return res.status(500).send({error: "Erro ao registrar novo produto"});
});

router.put('/atualizar/:id', (req, res) => {
    try{
        product = {
            id: req.body.id,
            name: req.body.name, 
            description: req.body.description, 
            price: req.body.price
        }
    }catch(err){
        return res.status(400).send({error: "Solicitação Inválida"});
    }

    if(execute.update(product))
        return res.send({message: "Produto atualizado com sucesso"});
    
    return res.status(500).send({error: "Erro ao atualizar produto"});
});

router.delete('/excluir/:id', (req, res) => {
    try{
        if(execute.remove(req.params.id))
            return res.send({message: "produto removido com sucesso"});
    }catch(err){
        return res.status(400).send({error: "Solicitação Inválida"});
    }

    return res.send({message: "erro ao remover produto"});
});

module.exports = router;