import express from 'express';
const router = express.Router();

// importar el modelo tatuaje
import tatuaje from '../models/tatuaje';

// Agregar una tatuaje
router.post('/nuevo', async(req, res) => {
  const body = req.body;  
  try {
    const tatuajeDB = await tatuaje.create(body);
    res.status(200).json(tatuajeDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
// Get con parámetros
router.get('/listar/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const tatuajeDB = await tatuaje.findOne({_id});
    res.json(tatuajeDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/listar', async(req, res) => {
  try {
    const tatuajeDb = await tatuaje.find();
    res.json(tatuajeDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
// Delete eliminar un tatuaje
router.delete('/borrar/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const tatuajeDb = await tatuaje.findByIdAndDelete({_id});
    if(!tatuajeDb){
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.json(tatuajeDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
// Put actualizar un tatuaje
router.put('/actualizar/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const tatuajeDb = await tatuaje.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(tatuajeDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
// Exportamos la configuración de express app
//Agregar una imagen
router.put('/nuevaImagen/:id', async(req, res) => {
  const _id = req.params.id;
  const imagen = req.body.imagen;  
  try {
    const tatuajeDB = await tatuaje.findByIdAndUpdate(
      _id,
      {$push:{"imagenes": imagen}},
      {new: true});
    res.json(tatuajeDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
//Quitar una imagen
router.put('/quitarImagen/:id', async(req, res) => {
  const _id = req.params.id;
  const imagen = req.body.imagen;  
  try {
    const tatuajeDB = await tatuaje.findByIdAndUpdate(
      _id,
      {$pull:{"imagenes": imagen}},
      {new: true});
    res.json(tatuajeDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
module.exports = router;
