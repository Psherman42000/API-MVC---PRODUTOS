const fs = require("fs");
const path = require("path");

function requireProductData(){
    return require('../Product Data/productData.json');
}

/*
    retorna todos os produtos salvos
*/
function getAll(){
    return requireProductData().products
}

/*
    retorna o produto de id especificado
    params id
*/
function getById(id){
    productData = requireProductData();
    product = productData.products.filter(item => String(item.id) === String(id));

    if(product)
        return product;
    
    return false;
}

/*
    registra um novo produto
    params produto
*/
function register(product){
    let productData = requireProductData();
    productData.products.push(product);
    fs.writeFile(path.join(__dirname, '../Product Data/productData.json'), JSON.stringify(productData, null, 4), err => {
        if(err) throw err;
    });

    return true;
}

/*
    remove o produto de id especificado
    params id
*/
function remove(id){
    let productData = requireProductData();
    productData.products = productData.products.filter(item => String(item.id) !== String(id));

    fs.writeFile(path.join(__dirname, '../Product Data/productData.json'), JSON.stringify(productData, null, 4), err => {
        if(err) throw err;
    });

    return true;
}

/*
    atualiza o produto de id especificado
    params product
*/
function update(product){
    remove(product.id);
    register(product);

    return true;
}

module.exports = {getAll, register, update, getById, remove};