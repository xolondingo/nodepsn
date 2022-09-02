// Definiciones
const express = require('express');
const router = express.Router();

// Importacion del gestor de la base de datos
 const pool = require('../database');

router.get('/',  async (req, res) => {
    const peliculas = await pool.query('SELECT id_peliculas, titulo, categoria, genero, duracion, anio from peliculas;');
    res.render('peliculas/listado', { peliculas: peliculas });
});

// Inicializaciones
module.exports = router;