let insertDOMcontent = document.querySelector("#shopContent");
let listaCarrito = document.querySelector("#listaCarrito");

let productosSeleccionados = [];

const productos = [
    {   
        id: 1,
        nombre:"Tarta Frutal", 
        precio: 1600, 
        img: "https://i.pinimg.com/564x/3a/ec/3b/3aec3b109648f2d2b30effc7dd3cbdfa.jpg"
    },

    {   
        id: 2,
        nombre:"Tarta Toffi", 
        precio: 1500, 
        img: "https://i.pinimg.com/564x/00/9b/70/009b709067399675cd28f01181bf27db.jpg"
    },
    { 
         id: 3,
         nombre:"Tarta de Coco", 
         precio: 1200, 
         img: "https://i.pinimg.com/564x/c0/7c/25/c07c25b91fbedf274309cb7c2857dc3c.jpg"
        },
    { 
        id: 4, 
        nombre:"Pastafrola", 
        precio: 950, 
        img: "https://i.pinimg.com/564x/de/02/d3/de02d36a699d0112bde0b3546aace51e.jpg"
    },
    { 
        id: 5, 
        nombre:"Tarta de Ricotta", 
        precio: 1200, 
        img: "https://i.pinimg.com/564x/da/90/a7/da90a7c00fc7e170d5f2990459462d6b.jpg"
    },
    { 
        id: 6, 
        nombre:"Torta Clasica", 
        precio: 3600, 
        img: "https://i.pinimg.com/564x/6c/2b/ad/6c2bad32a47b6ec00fc498dbd305c29a.jpg"
    },
];

document.addEventListener("DOMContentLoaded", () => {
    productosSeleccionados = JSON.parse(localStorage.getItem("productos")) || [];
    agregarProductoAlcarro();
});
function sincronizarConLocalStorage(){
    localStorage.setItem("producto", JSON.stringify(productosSeleccionados));
};
function printData( object) {
    object.forEach(( element, index ) => {
        insertDOMcontent.innerHTML += `<div class="col-md-4">
                <div class="card mb-4">
                    <img class="imgFitFull" src="${element.img}${index}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <div class="info-card">
                      <h5 class="card-title">${element.nombre}</h5>
                      <p class="precio"><span class="descuento">15%</span>  <span class="u-pull-right">$${element.precio}</span></p>
                      <hr>
                      <p class="card-text"></p>
                      <div class="d-grid gap-2">
                      <a href="#" class="btn btn-info agregar-carrito" id="${element.id}">Agregar al carrito</a>
                      </div>
                    </div>
                    </div>
                  </div>
            </div>`;
    });
}

function agregarProductoAlcarro() {

    listaCarrito.innerHTML = ``;
    
    productosSeleccionados.forEach((element,index) => {
      

        listaCarrito.innerHTML += `<tr>
            <td><img class="imgFitMiniatura" src="${element.img}${index}" alt="${element.nombre}"></td>
            <td>${element.nombre}</td>
            <td class="text-center">${element.precio}$</td>
            <td class="text-center">1</td>
            <td class="text-center"><a href="#" id="${element.id}" class="borrar-producto" data-id="1">X</a></td>
          </tr>`;
    });

    let buttonDelete = document.querySelectorAll('#listaCarrito tr td a');
    
    buttonDelete.forEach(element => {
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            let id = e.target.id
 
            productosSeleccionados = productosSeleccionados.filter( productos => productos.id !== id );
            console.log('Salida de productosSeleccionados', productosSeleccionados)
            agregarCursoAlcarro()
        })
    })

    sincronizarConLocalStorage();
}

function buscarProducto ( idProductos, buscarProducto ){

    let productosSeleccionados = buscarProducto.find((element) => idProductos == element.id);
    
    let productos = [];
   
    productos.push(productosSeleccionados);
    
    productosSeleccionados = [...productosSeleccionados, ...productos];

    agregarProductoAlcarro();
};


printData(productos);

let buttonCard = document.querySelectorAll("#insertDOMcontent .card a");

buttonCard.forEach((element) => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.id;
        buscarProducto(id, productos);
    });
});
