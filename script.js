

let timestamp;

document.addEventListener('DOMContentLoaded', function () {
  const Proyectos = [];
  var visible = document.getElementById("Mostrar");
  const OpcionesProyecto = document.getElementById('OpcionesProyecto');


  function nuevoProyecto(Evento) {
    Evento.preventDefault();
    const titulo = document.getElementById('Titulo').value;
    const descripcion = document.getElementById('Descripcion').value;
    const vencimiento = document.getElementById('vencimiento').value;

    Proyectos.push({
      id: Proyectos.length + 1,
      titulo: titulo,
      descripcion: descripcion,
      vencimiento: vencimiento,
      Tareas: []
    })
    MostrarProyecto(titulo, descripcion, vencimiento);
    actualizarOpcionesProyecto();
    Evento.target.reset();
  }

  function MostrarProyecto(titulo, descripcion, vencimiento) {
    const nuevoProyectoHTML =
    `<div class="card" data-titulo="${titulo}">
        <h3>${titulo}</h3>
        <p> <strong> Descripción: </strong> ${descripcion}</p>
        <p> <strong> Vencimiento: </strong> ${vencimiento}</p> 
        <div class="tareas"></div>
    </div>`;
    visible.insertAdjacentHTML('beforeend', nuevoProyectoHTML);
  }

  function AgregarTarea(Evento) {
    Evento.preventDefault();

    const tituloTarea = document.getElementById('TituloTarea').value;
    const vencimiento = document.getElementById('FechaTarea').value;
    const Descripcion_ = document.getElementById('Descripcion_').value;
    const ProyectoElegido = document.getElementById('OpcionesProyecto').value;
    const ProyectoEncontrado = Proyectos.find(((Proyectos) => Proyectos.titulo === ProyectoElegido));


    if (ProyectoEncontrado) {
      ProyectoEncontrado.Tareas.push({
        titulo: tituloTarea,
        vencimiento: vencimiento,
        descripcion: Descripcion_
      });
      MostrarTarea(ProyectoElegido, tituloTarea, Descripcion_,vencimiento);
      Evento.target.reset();
    }

    else {
      console.error('El proyecto seleccionado no existe.');
    }
  }

  function MostrarTarea(tituloProyecto, tituloTarea,descripcion,vencimiento) {
    console.log(descripcion);
    const proyectoCard = document.querySelector(`div[data-titulo="${tituloProyecto}"]`);
    if (proyectoCard) {
        const tareasContainer = proyectoCard.querySelector('.tareas');
        console.log(descripcion);
        const tareaHTML = `
            <div class="task">
            <hr>
                <input type="checkbox" id="${tituloTarea}" name="${tituloTarea}">
                <label for="${tituloTarea}">${tituloTarea}</label>
                <label for="${descripcion}">${descripcion}</label>
                <label for="${vencimiento}">${vencimiento}</label>
            </div>`;
        tareasContainer.insertAdjacentHTML('beforeend', tareaHTML);
    }
}

  function actualizarOpcionesProyecto() {
    OpcionesProyecto.innerHTML = '';
    Proyectos.forEach(proyecto => {
      OpcionesProyecto.innerHTML += `<option value="${proyecto.titulo}">${proyecto.titulo}</option>`;
    });
  }

  function Buscar() {
    const fecha = document.getElementById('fechaElegida').value;
    let buscarHTML = '';
    const buscar = document.querySelector('.resultadoBusqueda');
    buscar.innerHTML = ''; 
    Proyectos.forEach(proyecto => {
      if (proyecto.vencimiento === fecha) {
        buscarHTML += `<p>${proyecto.titulo}</p><br>`;
      }
    });
    if(buscarHTML == '') buscarHTML= `<b> No hay ningún proyecto que cumpla con esa fecha.</b>`
    buscar.innerHTML = buscarHTML;
  }

  document.getElementById('cardForm').addEventListener('submit', nuevoProyecto);
  document.getElementById('IngresarTarea').addEventListener('submit', AgregarTarea);
  document.getElementById('Buscar').addEventListener('submit', function (event) {
    event.preventDefault();
    Buscar();
  });

  actualizarOpcionesProyecto();
});
