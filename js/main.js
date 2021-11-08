class Producto {
  constructor(nombre, unidad, precio, cantidad) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.unidad = unidad;
  }
  sumaIva() {
    this.precio = this.precio * 1.21;
  }
}

const productos = [];
let nombre = "";
let unidad = "";
let precio = "";
let cantidad = "";
let totalizador = 0;
let i = 0;
let salida = "";
let a = 1;

let entrada = document.getElementById("Nombre");
entrada.onchange = () => {
  for (const producto of productos) {
    if (
      document.getElementById("Nombre").value.toUpperCase() == producto.nombre
    ) {
      alert("este producto ya lo ingresaste");
    }
  }
};

let boton = document.getElementById("agregar");
boton.onclick = () => {
  if (
    document.getElementById("Nombre").value == "" ||
    document.getElementById("Unidad").value == "" ||
    document.getElementById("Precio").value == "" ||
    document.getElementById("Cantidad").value == ""
  ) {
    alert("faltan datos");
  } else {
    $("#santi").empty();
    nombre = document.getElementById("Nombre").value;
    unidad = document.getElementById("Unidad").value;
    precio = parseInt(document.getElementById("Precio").value);
    cantidad = parseInt(document.getElementById("Cantidad").value);
    console.log("anda el agregar");
    totalizador = totalizador + parseFloat(precio) * parseInt(cantidad);
    let productoNuevo = new Producto(nombre, unidad, precio, cantidad);
    productos.push(productoNuevo);

    localStorage.setItem(a, JSON.stringify(productoNuevo));
    a = a + 1;

    document.getElementById("Nombre").value = "";
    document.getElementById("Unidad").value = "";
    document.getElementById("Precio").value = "";
    document.getElementById("Cantidad").value = "";

    console.log("esto se guardó en el localstorage");
    $("#santi").append("<h3>Productos </h3>" + (a - 1) + "<h3> agregado</h3>");
  }
};
let boton2 = document.getElementById("totalizar");
boton2.onclick = () => {
  $("#santi").empty();
  for (const producto of productos) {
    producto.sumaIva();
  }

  for (const producto of productos) {
    console.log(producto.nombre);
    console.log(producto.cantidad + " " + producto.unidad);
    console.log("precio por unidad con iva= " + producto.precio);
    console.log("");
    let prodNom = document.createElement("div");
    $("#santi").append(`<div id="div1">
<h3> ${producto.nombre} </h3> 
<h3>${producto.cantidad + " " + producto.unidad}</h3>
<h3>${"precio por unidad con iva= " + producto.precio}</h3>
`);
  }
  console.log("El stock está valorizado en: " + totalizador * 1.21);
  let stockValor = document.createElement("p");
  stockValor.innerHTML = "El stock está valorizado en: " + totalizador * 1.21;
  $("#santi").append(stockValor);
};
const URLGET = "https://jsonplaceholder.typicode.com/posts";

//Agregamos un botón con jQuery y pedimos info al proveedor con AJAX
$("#santi2").append('<button id="btn1">Consulta Servidor</button>');

$("#btn1").click(() => {
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta;
      for (const dato of misDatos) {
        $("body").append(`<div style="background-color: lightgray">
                                   <h3>${dato.title}</h3>
                                   <p>${dato.id}</p>
                                  </div>`);
      }
    }
  });
});

$("#santi2").css({
  display: "flex",
  "align-items": "right",
  "justify-content": "flex-start",
  "align-content": "right",
  "flex-direction": "column",
  "flex-wrap": "nowrap",
});

$("#santi").css({
  display: "flex",
  "align-items": "center",
  "justify-content": "flex-start",
  "align-content": "center",
  "flex-direction": "column",
  "flex-wrap": "nowrap",
});
