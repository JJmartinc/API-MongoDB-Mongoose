const express = require('express')
const checkApiKey = require('../middlewares/auth_api_key')
const productsApiController = require('../controllers/productsApiController')
const productsApiRouter = express.Router();

// Rutas de API de productos

// GET http://localhost:3000/api/products/3
// GET http://localhost:3000/api/products/4
// GET http://localhost:3000/api/products
productsApiRouter.get('/:title?',productsApiController.getProducts);

/*Objeto de prueba para crear*/
/*
{
    "title": "Barritas de tomate",
    "price": 1.2,
    "description": "Your perfect barrita de tomate in plaza mayor",
    "category": "food",
    "image": "https://estoyhechouncocinillas.com/wp-content/uploads/2015/08/tostadas_con_tomate.png"
}
*/
productsApiRouter.post('/',checkApiKey,productsApiController.createProduct);
//PUT
productsApiRouter.put('/:id',checkApiKey,productsApiController.editProduct);
// DELETE
//http://localhost:3000/api/products/?API_KEY=123abc
productsApiRouter.delete('/',checkApiKey, productsApiController.deleteProduct);
module.exports = productsApiRouter;