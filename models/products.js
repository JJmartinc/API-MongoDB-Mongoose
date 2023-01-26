const mongoose = require('mongoose');
require('../utils/db_mongo');
const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Por fa, sólo imágenes JPG o PNG"
        }
    }
   
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Insertar un producto

/* const p = new Product({
    id: 6,
    provider: "C-12345678",
    title: "Ensalada 4 estaciones",
    price: 1.80,
    description: "Barrita jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
    
});
p.save().then((data)=>console.log(data));
   */