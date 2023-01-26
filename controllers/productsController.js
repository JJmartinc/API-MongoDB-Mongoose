// Controlador - Lógica de negocio de la app

const Product = require('../models/products');

const Provider = require('../models/providers');


const getProducts = async (req,res) => {
    if (req.params.id) { // con ID
        try {
            let product = await Product.find({id:req.params.id},'-_id -__v').populate('provider', '-_id -__v');
            if (product.length > 0) {
                res.status(200).json(product[0]); // Respuesta de la API para 1 producto
            }
            else {
                res.status(404).json({msj:"producto no encontrado con ID "+req.params.id}); // Respuesta de la API para 1 producto
            }    
        }
        catch(err){
            res.status(400).json({msj: err.message});
        }
    } else { // sin ID --> TODOS los products
        try {
            let products = await Product.find({},'-_id -__v').populate('provider', '-_id -__v');
            res.status(200).json(products); // Respuesta de la API para muchos productos
        }
        catch(err){
            res.status(400).json({msj: err.message});
        }
    }}
module.exports = {
    getProducts
    
}