
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

//next es una fucion que se llama cuando el middleware se procesa
const validarCampos =(req,res,next)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

const validarCorreo = async(correo = '') =>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        return res.status(400).json({
            mensaje: 'EL CORREO ESTÁ REGISTRADO'
        });
    }
}

module.exports={
    validarCampos,
    validarCorreo
}