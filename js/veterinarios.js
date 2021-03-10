const listaveterinarios = document.getElementById("lista-veterinarios");
const apellido = document.getElementById("apellido");
const nombre = document.getElementById("nombre");
const identificacion = document.getElementById("identificacion");
const pais= document.getElementById("pais")
const form = document.getElementById("form");
const botonGuardar = document.getElementById("botonguardar");
const indice = document.getElementById("indice");
const botoncerrar =document.getElementById("botoncerrar")
const cerrarmoda= document.getElementById("cerrar")

let veterinarios = [
  {
    nombre: "javier",
    apellido: "perez",
    identificacion: "1143400456",
    pais: "colombia"
  },
];

function listar() {
  const htmlveterinarios = veterinarios
    .map(
      (veterinario, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${veterinario.nombre}</td>
    <td>${veterinario.apellido}</td>
    <td>${veterinario.identificacion}</td>
    <td>${veterinario.pais}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`
    )
    .join("");
  listaveterinarios.innerHTML = htmlveterinarios;
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
    const veterinario = veterinarios[index];
    nombre.value = veterinario.nombre;
    apellido.value = veterinario.apellido;
    identificacion.value = veterinario.identificacion;
    pais.value = veterinario.pais;
    indice.value = index;
  };
}

function enviardatos(evento) {
  evento.preventDefault();
  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    identificacion: identificacion.value,
    pais: pais.value,
  };
  const accion = botonGuardar.innerHTML;
  switch (accion) {
    case "Editar":
      veterinarios[indice.value] = datos;
      break;
    default:
      veterinarios.push(datos);
      break;
  }
  listar();
  resetmodal();
}

function resetmodal() {
  nombre.value = "";
  apellido.value = "";
  identificacion.value = "";
  pais.value = "Pais";
  indice.value="";
  botonGuardar.innerHTML = "Crear";
}

function eliminar(index) {
  return function clickeliminar() {
    veterinarios = veterinarios.filter(
      (_veterinario, indicevet) => indicevet !== index
    );
    listar();
  };
}
listar();
botonGuardar.onclick = enviardatos;
botoncerrar.onclick = resetmodal;
cerrarmoda.onclick = resetmodal;
