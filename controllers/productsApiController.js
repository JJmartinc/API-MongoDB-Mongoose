// Controlador - Lógica de negocio de la app
const Product = require('../models/products');

const getProducts = async (req, res) => {
    if (req.params.title) {
      // con ID
    try {
        let product = await Product.find({ title: req.params.title }, "-_id -__v")
          .populate('provider', 'company_name url_web -_id'); // find({})devuelve por id menos los especificados despues de la coma (proyeccion)
        if (product.length > 0) {
          res.status(200).json(product[0]); // Respuesta de la API para 1 producto, no un array de objetos
        } else {
        res
            .status(404)
            .json({ msj: "Product not found " + req.params.title });
        }
    } catch (err) {
        res.status(400).json({
        msj: err.message,
        });
    }
    } else {
      // sin ID --> TODOS los products
    try {
        let products = await Product.find({}, "-_id -__v")
        .populate('provider','company_name url_web -_id')
           // find({})devuelve todos
        res.status(200).json(products); // Respuesta de la API para todos productos
    } catch (err) {
        res.status(400).json({
        msj: err.message,
        });
    }
    }
};

const createProduct = async (req,res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar
    
    try{
        // Para guardar en una BBDD MongoDB
        let response = await new Product(newProduct);
        let answer = await response.save(); // objeto de vuelta de guardar en la bbdd
        console.log("Este es el console.log de lo que devuelve la api", answer);

        res.status(201).json({
            msj: `Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`,
            "product": answer
        });
    }catch(err){
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });

    }
}

const deleteProduct = async (req,res)=>{
    const msj ="Has enviado un DELETE para borrar product";
    console.log(msj);
    res.json({"message":msj});
}
module.exports = {
    getProducts,
    createProduct,
    deleteProduct
    //editProduct,
    
}

// OTRA MANERA

// const products = {
//     getProducts: async (req, res) => {
//         if (req.params.id) {
//             try {
//                 let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
//                 let products = await response.json(); //{}
//                 res.render('products', { "products": [products] }); // Pinta datos en el pug
//             }
//             catch (error) {
//                 console.log(`ERROR: ${error.stack}`);
//             }
//         } else {
//             try {
//                 let response = await fetch(`https://fakestoreapi.com/products`); // []
//                 let products = await response.json(); // []
//                 res.render('products', { products }); // Pinta datos en el pug
//             }
//             catch (error) {
//                 console.log(`ERROR: ${error.stack}`);
//             }
//         }
//     },
//     createProduct: async (req, res) => {
//         console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
//         const newProduct = req.body; // {} nuevo producto a guardar
    
//         // Líneas
//         //para guardar 
//         // en una BBDD SQL o MongoDB
    
//         let response = await fetch('https://fakestoreapi.com/products', {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newProduct)
//         })
//         let answer = await response.json(); // objeto de vuelta de la petición
//         console.log("Este es el console.log de lo que devuelve la api",answer);
    
//         res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
//     },
//     deleteProduct: async (req, res) =>  console.log("Borrando pruducto"),
//     editProduct: async (req, res) =>  console.log("Borrando pruducto")
// }

// module.exports = products;