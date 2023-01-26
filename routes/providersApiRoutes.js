const express = require('express')
const checkApiKey = require('../middlewares/auth_api_key')
const providersApiController = require('../controllers/providersApiController')
const providersApiRouter = express.Router();

// Rutas de API de providers

// GET http://localhost:3000/api/providers/
// GET http://localhost:3000/api/providers/Teatro Marquina
// GET http://localhost:3000/api/providers/Rice
providersApiRouter.get('/:company?',providersApiController.getProviders);

/*Objeto de prueba para crear*/
/*
{
    
    "company_name": "Dulcialndia",
    "CIF": "B86691060",
    "address": "La plaza",
    "url_web":"https://www.tortillasmarquina.com"
}
*/

// POST http://localhost:3000/api/providers?API_KEY=123abc
providersApiRouter.post('/',checkApiKey,providersApiController.createProvider);


// DELETE
//http://localhost:3000/api/providers?API_KEY=123abc
providersApiRouter.delete('/',checkApiKey, providersApiController.deleteProvider);


module.exports = providersApiRouter;