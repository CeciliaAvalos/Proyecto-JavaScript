let nombreCompleto = prompt("Bienvenidos a la tienda de Delicias Sandy! Ingrese su nombre completo")
let edad = parseInt (prompt('Hola'+ " " + nombreCompleto +" " +"ingrese su edad"))
if (edad>=18) {
    alert("Usted es mayor de edad, puede continuar con su compra")
    let num= parseInt (prompt('seleccione un numero del 1 al 3 para seleccionar su producto' + " " + '1-tarta frutal'+" "+ " "+ '2-tarta toffi' + " " +'3-tarta de ricotta')) 

    do {
        num
    } while ( parseInt (num >=1 && num <=3));
    switch (num) {
        case 1:
            let tarta_frutal= (!isNaN (1))
            mensaje = confirm('usted ah seleccionado' + " " + '"Tarta frutal", su costo es de $1300')
                let costo1= confirm ("Desea agregar envio?")
                var cost1= 1300
                var envio= 500
                let total_uno= alert ('El total de su compra es de'+ " "+ '$'+ (suma= parseInt (cost1+ envio)))
            
            break;
            case 2:
                let tarta_toffi = (!isNaN(2))
                mensaje = confirm('Usted ha seleccionado' + " "+ '"Tarta Toffi", su costo es de $1200')
                let costo2= confirm ("Desea agregar envio?")
                    var cost2= 1300
                    var envio= 500
                    let total_dos= alert ('El total de su compra es de'+ " "+ '$'+ (suma= parseInt (cost2+ envio))) 
            break;
            case 3:
                let tarta_ricotta = (!isNaN(3))
                mensaje = confirm('Usted ha seleccionado' + " "+ '"Tarta de Ricotta", su costo es de $950')
                let costo3= confirm ("Desea agregar envio?")
                    var cost3= 950
                    var envio= 500
                    let total_tres= alert ('El total de su compra es de'+ " "+ '$'+ (suma= parseInt (cost3+ envio))) 
            break;
    }
    
    } else { while (edad <=17) {
    alert("usted es menor de edad, no puede ingresar al sitio")
    }

    
    }


