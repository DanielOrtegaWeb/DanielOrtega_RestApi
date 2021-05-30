//Desestructuracion del response
const { response } = require('express');
//Importar el paquete para encriptacion
const bcryptjs=require('bcryptjs');
//Importar el modelo
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {
    //res.send('SERVIDOR REST');
    const usuarios = await Usuario.find();
    res.json({
        mensaje: 'GET API CONTROLADOR',
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
        
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        mensaje: 'PUT API CONTROLADOR',
        usuario
    });
}
const usuariosPost = async (req, res=response) => {

    
    //Separar los campos que se van a enviar 
    const {nombre,correo,password, rol} = req.body;
    //Validar si el correo existe,findOne realiza la busqueda
    const existeCorreo=await Usuario.findOne({correo});
    if(existeCorreo){
        //retornar un estado de error para este ejemplo es el 400
        return res.status(400).json({
            mensaje:'EL CORREO ESTA REGISTRADO'
        });
    }
    //Creamos la instancia 
    const usuario = new Usuario({nombre,correo,password, rol});
    //encriptar la contraseña, en la documentacion revisar un salt es el numero de vueltas
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);
    //Grabar el registro
    await usuario.save();
    res.json({
        mensaje: 'POST API CONTROLADOR',
        usuario
    });
}
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        mensaje: 'DELETE API CONTROLADOR',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}