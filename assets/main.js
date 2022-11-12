//SWEET ALERT DE INICIO

Swal.fire({
    title: 'Es mayor de edad?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'SI',
    denyButtonText: `NO`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Bienvenido!', '', 'success')
      document.getElementById("containerTitulo").innerHTML += `
      <div id="containerTitulo" class="container mb-3">
        <h1 id="tituloPrincipal">Tienda Delicias Sandy!</h1>
        <h2>Seleccione el tipo de producto que desea comprar!</h2>
        <div id="orden1">
          <div id="filtroProductos" class="row px-2 gap-3 pt-3"></div>
        </div>
        <div id="orden2">
          <div id="productosFiltrados" class="row px-2 gap-3 pt-3"></div>
        </div>
      </div>
      
      <div id="orden3">
        <div id = "containerCarrito">
        <b><h3>Su Carrito!</h3></b>
          <table id="tablaCarrito" class="table">
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Quitar</th>
            </tr>
          </table>
        </div>
      </div>
      
      <div id="totalCarrito" class="estiloTotal" class="alert alert-primary" role="alert"></div>
      <div id="centroBotonFinalizarCompra">
        <button id="finCompra" type="submit" class="btn btn-primary">Finalizar Compra</button>
      <div>
      `;
      const finalizarCompraBtn = document.getElementById(`finCompra`)
      finalizarCompraBtn.addEventListener('click', () => {
        Swal.fire({
          title: 'Su compra se ha relizado con exito!!!',
          text: 'Gracias por elegirnos',
          confirmButtonText: 'Ok',
          icon: 'success',
        });
      document.getElementById("containerTitulo").innerHTML += `
      <div id="containerTitulo" class="container mb-3"></div>
      <div id = "containerCarrito"></div>`;
      });
      cargarFiltros();
      cargarProductosDelLocalStorage();
      
      
  
  
    } else if (result.isDenied) {
      Swal.fire('Usted no es mayor de edad, no puede acceder a la tienda', '', 'info')
      document.getElementById("containerTitulo").innerHTML += `
      <div id="containerTitulo" class="resultadoDenegado" class="container mb-3">
      <h1 class="sinAcceso">USTED NO PUEDO ACCEDER AL SITIO!!!</h1>
      </div>
      `;
    }
  })
  //CLASES

class Carrito {
    constructor() {
      this.productosEnElCarrito = []
      this.total = 0
    }
    agregarAlCarrito (producto) {
    
      const productoPorAgregar = producto
  
      // BUSCO EL PRODUCTO EN EL CARRITO 
  
      const posicionEnElCarrito = this.productosEnElCarrito.findIndex((productoEnElCarrito) => productoEnElCarrito.id === producto.id)
  
      //FIND INDEX DEVUELVE -1 SI NO ENCUENTRA EL PRODUCTO EN EL CARRITO, SI LO ENCUENTRA DEVUELVE LA POSICION
  
      if (posicionEnElCarrito === -1) {
        productoPorAgregar.cantidad = 1
        this.productosEnElCarrito.push(producto)
      } else {
        this.productosEnElCarrito[posicionEnElCarrito].cantidad = this.productosEnElCarrito[posicionEnElCarrito].cantidad + 1
      }
      this.calcularPrecioTotalMasIva()
    }
    borrarDelCarrito (id) {
      this.productosEnElCarrito = this.productosEnElCarrito.filter((prodEnElCart) => prodEnElCart.id !== id)
      this.calcularPrecioTotalMasIva()
    }
  
    mostrarCarrito () {
      return this.productosEnElCarrito
    }
    calcularPrecioTotalMasIva () {
      this.total = this.productosEnElCarrito.reduce((acc, val) => acc + (val.precio * val.cantidad) * 1.21, 0)
      return this.total
    }
  }
  
  class Productos {
    constructor() {
      this.productos = []
    }
    cargarProducto (producto) {
      // validar si el producto ya existe
      this.productos.push(producto)
    }
  
    mostrarProductos () {
      return this.productos
    }
  }
  
  class Producto {
    constructor(id, nombre, tipo, precio, cantidad) {
      this.id = id
      this.nombre = nombre
      this.tipo = tipo
      this.precio = precio
      this.cantidad = 1
    }
  }
  //CREO UN NUEVO CARRITO

const carrito = new Carrito()

const productos = new Productos()


let productosCargadosDelJson = [];
const agregarProductosALaClase = async () => {

  const productosFetch = await fetch('./assets/productos.json').then(resp => resp.json()).then(data => data)
  productosCargadosDelJson = productosFetch;
  productosCargadosDelJson.forEach((producto) => {
    const nuevoProducto = new Producto(
      producto.id,
      producto.nombre,
      producto.tipo,
      producto.precio,
      producto.cantidad
    )

    productos.cargarProducto(nuevoProducto)
  })
}

agregarProductosALaClase()


//SELECCIONO LAS CATERGORIAS

const cargarFiltros = async () => {
    const contenedorFiltros = document.getElementById('filtroProductos')
  
    const categoriasFetch = await fetch('./assets/categorias.json').then(resp => resp.json()).then(data => data)
  console.log(categoriasFetch)
    

    categoriasFetch.forEach((categoria) => {
      const filtro = document.createElement('div')
      filtro.classList.add('card')
      filtro.classList.add('col')
      filtro.style.maxWidth = '300px'
      filtro.id = categoria.id
  
      filtro.innerHTML = `
      <img
        src=${categoria.imagen}
        class="card-img-top"
        alt="imagen de productos"
      />
      <div class="card-body">
        <h4 style={text-transform:'capitalize'}>${categoria.nombre}</h4>
        <button id="botonCategoria${categoria.nombre}" type="button" class="btn btn-primary">Seleccionar</button>
      </div>
      `
  
      contenedorFiltros.append(filtro)
      const agregarEventoABoton = document.getElementById(`botonCategoria${categoria.nombre}`)
      agregarEventoABoton.addEventListener('click', () => {
        mostrarProductosFiltrados(categoria.nombre)
      })
    })
  }

//VALIDO QUE LA SELECCION DE PRODUCTO NO SE REPITA

const mostrarProductosFiltrados = (nombre) => {
  // limpiar el contenedor de productos filtrados...
  if (document.getElementById('productosFiltrados').firstChild) {
    const borrarDiv = document.getElementById('productosFiltrados')
    borrarDiv.innerHTML = ``
  }

  //FILTRO LOS PRODUCTOS

  const filtrarProductos = productosCargadosDelJson.filter((producto) => producto.tipo === nombre)
  const contenedorProductos = document.getElementById('productosFiltrados')

  for (const producto of filtrarProductos) {
    const contenedorCard = document.createElement('div')
    contenedorCard.classList.add('card')
    contenedorCard.classList.add('col')
    contenedorCard.style.maxWidth = '300px'
    contenedorCard.innerHTML = `

      <div class="">
        <div class="col">
          <img src=${producto.imagen} class="img-fluid rounded-start" alt="">
        </div>
        <div>
          <div class="card-body">
            <h5 class="card-title"> ${producto.nombre} </h5>
            <p class="card-text">Breve descripcion del producto a comprar</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <h3> ${producto.precio} </h3>
            <button id='boton${producto.id}' type="submit" class="btn btn-primary">Agregar al Carrito</button>
          </div>
        </div>
      </div>

    `
    contenedorProductos.append(contenedorCard)


    document.getElementById(`boton${producto.id}`).addEventListener('click', function () {
      agregarCarrito(producto);
      Swal.fire({
        title: 'Felicitaciones!',
        text: 'Se Agrego el producto al carrito correctamente',
        confirmButtonText: 'Ok',
        icon: 'success',
      });
    })
  }

}

// FUNCION PARA PINTAR EL CARRITO

const dibujarCarrito = () => {
  const contenedorCarrito = document.getElementById('tablaCarrito')

  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = ''
  contenedorCarrito.innerHTML = `
    <tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Cantidad</th>
    <th>Quitar</th>
    </tr>
  `
  carrito.mostrarCarrito().forEach((prodEnElCarrito) => {
    contenedorCarrito.innerHTML += `
    <tr>
      <th>${prodEnElCarrito.id}</th>
      <th>${prodEnElCarrito.nombre}</th>
      <th>${prodEnElCarrito.precio}</th>
      <th>${prodEnElCarrito.cantidad}</th>
      <th><button id="botonEliminar${prodEnElCarrito.id}" class="btn btn-danger">X</button></th>
    </tr>
    `
  })

  carrito.mostrarCarrito().forEach((prodEnElCarrito) => {
    document.getElementById(`botonEliminar${prodEnElCarrito.id}`).addEventListener('click', function () {
      borrarDelCarrito(prodEnElCarrito.id);
      
    })
  })

  const total = document.getElementById('totalCarrito');
  const totalString = carrito.total

  total.innerHTML = ''

  total.innerHTML = `
    <div id="totalCarrito" class="alert alert-primary" role="alert">
        El total dentro del carrito incluyendo IVA (21%) es de : $${totalString}
    </div>
    `;
}

//AGREGO PRODUCTOS AL CARRITO DE COMPRAS

function agregarCarrito (productoComprado) {
  // aca hago la modificación para que siempre pinte el carrito completo
  carrito.agregarAlCarrito(productoComprado)

  dibujarCarrito()

  //guardo las compras del carrito en el localStorage
  let productosEnCarritoLocalParseado = [];
  const productosEnCarritoLocal = localStorage.getItem('carritoDeCompras')
  if (productosEnCarritoLocal) {
    productosEnCarritoLocalParseado = JSON.parse(productosEnCarritoLocal);
  }
  localStorage.setItem('carritoDeCompras', JSON.stringify(carrito))
}

function borrarDelCarrito (id) {
  carrito.borrarDelCarrito(id)
  dibujarCarrito();
}

//MUESTRO LA INFORMACION DEL LOCAL STORAGE

const cargarProductosDelLocalStorage = () => {
  const carritoString = localStorage.getItem('carritoDeCompras');
  if (carritoString) {
    const carritoParseado = JSON.parse(carritoString);

    carritoParseado.productosEnElCarrito.forEach((producto) => {
      carrito.agregarAlCarrito(producto)
    });

    dibujarCarrito()
  }
}

cargarProductosDelLocalStorage()





