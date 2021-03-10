const listaclientes = document.getElementById("lista-clientes");
const apellido = document.getElementById("apellido");
const nombre = document.getElementById("nombre");
const identificacion = document.getElementById("identificacion");
const pais= document.getElementById("pais")
const form = document.getElementById("form");
const botonGuardar = document.getElementById("botonguardar");
const indice = document.getElementById("indice");
const botoncerrar =document.getElementById("botoncerrar")
const cerrarmoda= document.getElementById("cerrar")

let clientes = [
  {
    nombre: "javier",
    apellido: "perez",
    identificacion: "1143400456",
    pais: "colombia"
  },
];

function listar() {
  const htmlclientes = clientes
    .map(
      (cliente, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${cliente.nombre}</td>
    <td>${cliente.apellido}</td>
    <td>${cliente.identificacion}</td>
    <td>${cliente.pais}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`
    )
    .join("");
  listaclientes.innerHTML = htmlclientes;
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
    const cliente = clientes[index];
    nombre.value = cliente.nombre;
    apellido.value = cliente.apellido;
    identificacion.value = cliente.identificacion;
    pais.value = cliente.pais;
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
      clientes[indice.value] = datos;
      break;
    default:
      clientes.push(datos);
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
    clientes = clientes.filter(
      (_cliente, indicevet) => indicevet !== index
    );
    listar();
  };
}
listar();
botonGuardar.onclick = enviardatos;
botoncerrar.onclick = resetmodal;
cerrarmoda.onclick = resetmodal;
