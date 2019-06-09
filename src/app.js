const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('../src/helpers');
//   BOOTSTRAP  >
const dirNode_modules = path.join(__dirname , '../node_modules');

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
// -------------->

const directorioPublico = path.join(__dirname,'../public');
const directorioPartials = path.join(__dirname,'../partials');
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','hbs');

app.get('/',(req,res) => {
    res.render('interesado');
});

app.get('/aspirante',(req,res) => {
    res.render('aspirante');
});

app.get('/Coordinador/NuevoCurso',(req,res) => {
    res.render('Coordinador/NuevoCurso');
});

app.post('/Coordinador/CrearCurso',(req,res) => {
    res.render('Coordinador/CrearCurso',{
        nombre: req.body.nombre,
        id: parseInt(req.body.id),
        descripcion: req.body.descripcion,
        valor: parseFloat(req.body.valor),
        modalidad: req.body.modalidad,
        intensidad: parseInt(req.body.intensidad),
        estado: req.body.estado
    });
});

app.get('/Coordinador/VerCursos',(req,res) => {
    res.render('Coordinador/VerCursos');
});

app.get('/Coordinador/CerrarCursos',(req,res) => {
    res.render('Coordinador/CerrarCursos');
});

app.post('/Matricular',(req,res) => {
    res.render('Matricular',{
        nombre: req.body.nombre,
        id: parseInt(req.body.id),
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono),
        idcurso: parseInt(req.body.idcurso),
    });
});

app.post('/Coordinador/Cerrar',(req,res) => {
    res.render('Coordinador/Cerrar',{
        idcurso: parseInt(req.body.idcurso)
    });
    console.log('wenas');
});

app.get('*',(req,res)=>{
    res.render('error');
})

app.listen(3000,(err)=>{
    if(err) throw (err);
    console.log('puerto 3000')
})