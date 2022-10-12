const productos = [
    { nombre:"Tarta Frutal", precio: 1600},
    { nombre:"Tarta Toffi", precio: 1500},
    { nombre:"Tarta de Coco", precio: 1200},
    { nombre:"Pastafrola", precio: 950},
    { nombre:"Tarta de Ricotta", precio: 1200},
    { nombre:"Torta Clasica", precio: 3600},
    { nombre:"Torta Personalizada Premium", precio: 5000},
    { nombre:"Torta Personalizada Simple", precio: 4300},
    { nombre:"Minicake Simple", precio: 1600},
    { nombre:"Minicake Personalizada", precio: 2000}
];
let carrito = []

let selection = prompt ("Bienvenido a la tienda de Delicias Sandy, desea agregar algun producto? Escribe Si o No dependiendo de su respuesta")
while(selection == "si" && selection != "no"){
    alert ("Por favor ingresa si o no")
    selection = prompt ("Escriba si o no para ingresar al carrito")
    if (selection === "no"){
        alert ("Vuelva pronto!")
    
    }else if (selection == "si"){
        alert ("A continuacion le mostraremos el listado de productos a elegir.")
        let todoslosProductos = productos.map ((producto) => producto.nombre + " " + "$" + producto.precio)
        alert (todoslosProductos.join ("-"))
        
        while (selection != "no"){
            let producto = prompt ("Agrega un producto a tu carrito")
            let precio = 0

                do{
                    let producto = prompt ("Agrega un producto a tu carrito")
                    if (producto == "Tarta Frutal" || producto == "Tarta Toffi" || producto == "Tarta de Coco" || producto == "Pastafrola" || producto == "Tarta de Ricotta" || producto == "Torta Clasica" || producto == "Torta Personalizada Premium" || producto == "Torta Personalizada Simple" || producto == "Minicake Simple" || producto == "Minicake Personalizada"){
                        switch (producto){
                            case "Tarta Frutal":
                                precio = 1600
                                break;
                            
                            case "Tarta Frutal":
                                precio = 1600
                                break;
                
                            case "Tarta Toffi":
                                precio = 1500
                                break;
                
                            case "Tarta de Coco":
                            precio = 1200
                                break;
                
                            case "Pastafrola":
                                precio = 950
                                break;
                    
                            case "Tarta de Ricotta":
                                precio = 1200
                                break;
                
                            case "Torta Clasica":
                                precio = 3200
                                break;
                
                            case "Torta Personalizada Premium":
                                precio =5000
                                break;
                
                            case "Torta Personalizada Simple":
                                precio = 4300
                                break;
                                    
                            case "Minicake Simple":
                                precio = 1600
                                break;
                
                            case "Minicake Premium":
                                precio = 2000
                                break;
                                default:
                                break;
                    
                            }
                            let unidades = parseInt (prompt("Cuantas unidades desea llevar?"))
                            carrito.push ({producto, unidades, precio})
                            console.log (carrito)
                            
                        } else{
                            alert ("Por favor ingrese una selecion valida!!!")
                        }
                        
                        
                        selection = prompt ("Desea agregar algo mas?")
                        
                    
                } while(selection == "si" && selection !="no");
            }
        

    }
    carrito.forEach ((resumendeCompra) => {
        console.log (`producto: ${resumendeCompra.producto}, unidades: ${carrito.unidades}, total a pagar por producto: ${resumendeCompra.unidades * resumendeCompra.precio}`)
    })
    const total = carrito.reduce ((acc, elem) => acc + elem.precio * elem.unidades, 0)
    console.log (`El total a pagar por su compra es de: ${total}`)
    alert ("Gracias por su compra")
}