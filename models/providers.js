const mongoose = require('mongoose');
require('../utils/db_mongo');

const objectSchema = {
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    CIF: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    url_web: {
        type: String,
        required: true
    }
}


// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const provider = mongoose.model('provider', providerSchema);

module.exports = provider;

// Insertar un proveedor
/* 
const createprovider = new provider({
company_name: "SaladFoods",
    CIF: "C-12345678",
    address:" Spain-La Rioja",
    url_web: "provider@mail.com"
    
});
createprovider.save().then((data)=>console.log(data));
 */