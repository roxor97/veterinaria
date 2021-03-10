const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const propietario = document.getElementById("propietario");
const form = document.getElementById("form");
const botonGuardar = document.getElementById("botonguardar");
const indice = document.getElementById("indice");
let mascotas = [
  {
    tipo: "gato",
    nombre: "manchas",
    propietario: "javier",
  },
];

function listarmascotas() {
  const htmlmascotas = mascotas
    .map(
      (mascota, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.propietario}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`
    )
    .join("");
  listaMascotas.innerHTML = htmlmascotas;
  Array.from(document.getElementsByClassName("editar")).forEach(
    (botoneditar, index) => (botoneditar.onclick = editar(index))
  );
  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botoneliminar, index) => (botoneliminar.onclick = eliminar(index))
  );
}

function editar(index) {
  return function cuandohagoclick() {
    botonGuardar.innerHTML = "Editar";
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    tipo.value = mascota.tipo;
    propietario.value = mascota.propietario;
    indice.value = index;
  };
}

function enviardatos(evento) {
  evento.preventDefault();
  const datos = {
    tipo: tipo.value,
    nombre: nombre.value,
    propietario: propietario.value,
  };
  const accion = botonGuardar.innerHTML;
  switch (accion) {
    case "Editar":
      mascotas[indice.value] = datos;
      break;
    default:
      mascotas.push(datos);
      break;
  }
  listarmascotas();
  resetmodal();
}

function resetmodal() {
  nombre.value = "";
  tipo.value = "";
  propietario.value = "";
  indice.value = "";
  botonGuardar.innerHTML = "Crear";
}

function eliminar(index) {
  return function clickeliminar() {
    mascotas = mascotas.filter(
      (_mascota, indicemascota) => indicemascota !== index
    );
    listarmascotas();
  };
}
listarmascotas();
botonGuardar.onclick = enviardatos;
