const fs = require("fs");
const path = require("path");

/*
    salva o ultimo id utilizado
    params id
*/
function updateId(id){
    let productData =  require('../Product Data/productData.json');
    productData.idCounter = id;
    fs.writeFile(path.join(__dirname, '../Product Data/product.json'), JSON.stringify(productData, null, 4), err => {
        if(err) throw err;
    });

    return true;
}

/*
    retorna um novo id que pode ser usado no novo produto
*/
function getNewId(){
    let  id = require('../Product Data/productData.json').idCounter + 1;
    updateId(id);
    return id;
}

/*
    gera um novo objeto product
    params nome, descricao, preço
*/
function productObject(name, description, price){
    let product = {
        id: getNewId(),
        name: name,
        description: description,
        price: price
    }

    function getProduct(){
        return product;
    }

    function setName(name){
        product.name = name;
    }

    function setDescription(description){
        product.description = description;
    }

    function setPrice(price){
        product.price = price;
    }

    function getName(){
        return product.name;
    }

    function getDescription(){
        return product.description;
    }

    function getPrice(){
        return product.price;
    }

    return {getName, getPrice, getDescription, getProduct, setName, setPrice, setDescription};
}

module.exports = productObject;