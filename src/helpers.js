const hbs = require('hbs');
const funciones = require('./funciones');

hbs.registerHelper('CrearCurso',(nombre, id, descripcion, valor, modalidad, intensidad, estado) => {
      const curso = {nombre,
            id,
            descripcion,
            valor,
            modalidad,
            intensidad,
            estado
        }
        let txt = funciones.crear(curso);
        console.log(txt);
        if(txt == undefined){
            return "Archvio creado con exito";
        }else{
            return txt; 
        }
});

hbs.registerHelper('Matricular' ,(nombre ,id ,correo ,telefono ,idcurso) => {
  const aspirante = {nombre,
        id,
        correo,
        telefono
    }
    const relacion = {
      id,
      idcurso
    }
    
    let txt = funciones.crearRelacion(relacion);
    console.log(txt);
    if(txt == undefined){
        funciones.crearAspirante(aspirante);
        return "Archvio creado con exito";
    }else{
        return txt; 
    }
});


hbs.registerHelper('listarCursos',()=>{
    listaEstudiantes = require('./../src/Cursos.json');
    let texto = "<br><table class='table'>\
    <thead class='thead-dark'>\
        <th>id</th>\
        <th>Nombre</th>\
        <th>Descripcion</th>\
        <th>Valor</th>\
        <th>Modalidad</th>\
        <th>Intensidad</th>\
        <th>Estado</th>\
    </thead>\
    <tbody>";

    listaEstudiantes.forEach(estudiante => {
       texto += '<tr>'
      + '<td>'+estudiante.id+'</td>'
     +   '<td>'+estudiante.nombre+'</td>'
      +  '<td>'+estudiante.descripcion+'</td>'
        +   '<td>'+estudiante.valor+'</td>'
        + '<td>'+estudiante.modalidad+'</td>'
        + '<td>'+estudiante.intensidad+'</td>'
        + '<td>'+estudiante.estado+'</td>'
        +'</tr>';
    });
    texto += '</tbody></table>'
    return texto;
});

hbs.registerHelper('listarCursosDisponibles2',()=>{
    listaEstudiantes = require('./../src/Cursos.json');
    let texto = "<table class='table'><div class='accordion' id='accordionExample'>";
    i = 1;
    listaEstudiantes.forEach(estudiante => {
      if(estudiante.estado == "disponible"){
       texto += `<div class="card">
       <div class="card-header" id="heading${i}">
         <h2 class="mb-0">
           <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
             <h4> Nombre: </h4> <h5>  ${estudiante.nombre} </h5> 
             <h4> Descripcion: </h4> <h5>  ${estudiante.descripcion}</h5>
             <h4> Valor: </h4> <h5> ${estudiante.valor}</h5>
           </button>
         </h2>
       </div>
   
       <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
         <div class="card-body">
         modalidad: ${estudiante.modalidad} <br>
         descripcion: ${estudiante.descripcion} <br>
                intensidad horaria: ${estudiante.intensidad}h <br>
         </div>
       </div>
     </div>`
        i = i+1;
      }
    });
    texto += '</div></div>';
    return texto;
});

hbs.registerHelper('listarCursosDisponibles',()=>{
  listaEstudiantes = require('./../src/Cursos.json');
  let texto = "<select name='idcurso' class='form-control'>";

  listaEstudiantes.forEach(estudiante => {
    if(estudiante.estado == "disponible"){
     texto +=  '<option value='+estudiante.id+'>'+estudiante.nombre+'</option>';
    }
  });
  texto += '</select>';
  return texto;
});

hbs.registerHelper('Cerrar',(idcurso)=>{
      funciones.CerrarCurso(idcurso);
});