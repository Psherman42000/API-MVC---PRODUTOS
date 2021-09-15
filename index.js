const express = require('express');
const router = require('./Routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/produtos', router);

app.listen(3000);

console.log('API Is Running...');