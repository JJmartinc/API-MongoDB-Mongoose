// Controlador - Lógica de negocio de la app

const Provider = require('../models/providers');


const getProviders = async (req, res) => {
    if (req.params.company_name) { // con ID
        try {
            let provider = await Provider.find({ company_name: req.params.company_name }, '-_id -__v');
            if (provider.length > 0) {
                res.status(200).json(provider[0]); // Respuesta de la API para 1 producto
            }
            else {
                res.status(404).json({ msj: "proveedor no encontrado " + req.params.company_name }); // Respuesta de la API para 1 producto
            }
        }
        catch (err) {
            res.status(400).json({ msj: err.message });
        }
    } else { // sin ID --> TODOS los providers
        try {

            let providers = await Provider.find({}, '-_id -__v');
            res.status(200).json(providers); // Respuesta de la API para muchos productos
        }
        catch (err) {
            res.status(400).json({ msj: err.message });
        }
    }
}

const createProvider = async (req, res) => {
    console.log("Esto es el console.log de lo que introducimos por thunderclient", req.body); // Objeto recibido de producto nuevo
    const newProvider = req.body; // {} nuevo producto a guardar

    try {
        // para guardar en una BBDD MongoDB
        let response = await new Provider(newProvider)//llamada asincrona a la bbdd 

        let answer = await response.save(); // objeto de vuelta de la petición de guardar en la bbdd, confirmas que se guarda
        console.log("Este es el console.log de lo que devuelve la api", answer);

        res.status(201).json({
            msj: `Proveedor ${answer.company_name} guardado en el sistema con ID: ${answer._id}`,
            "proveedor": answer
        });
    } catch (err) {
        console.log("Este es el error que devuelve la api", err.message);
        res.status(400).json({
            msj: err.message
        });
    }

}

const deleteProvider = async (req, res) => {
    Provider.findOneAndDelete({ _id: req.body.id }, function (err, docs) {
        if (err) {
            res.status(400).json({
                msj: err.message,
            });
        }
        else {
            res.status(200).json({
                msj: "Proveedor borrado : " + docs,
            });

        }
    });
}
module.exports = {
    getProviders,
    createProvider,
    deleteProvider
}