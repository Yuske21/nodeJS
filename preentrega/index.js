/**
 * TALENTO TECH 
 * BackEnd NODEJS: Preentrega.
 * Alumno: Rueda, Julio Guillermo.
 * Fecha Final de Entrega : 28/09/2026.
 **/

console.log("Inicializando...Preentrega Node.js");

const args = process.argv.slice(2);
console.log(args);

/* Obtener Producto/os */
async function obternerProductos(url) {
    try {
        const response = await fetch(`https://fakestoreapi.com/${url}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error en ", args[0], error);
    }
}

/* Crear Producto */
async function crearProductos(producto) {
    try {
        const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            const data = await response.json()
            console.log("ID del Producto Creado es: ", data.id)
        }
    } catch (error) {
        console.log("Error en ", args[0], error)
    }
}

/* Eliminar Producto */

async function eliminarProducto(producto) {
    try {
        const response = await fetch(`https://fakestoreapi.com/${producto}`, {
            method: "DELETE"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error en ", args[0], error);
    }
}

switch (args[0]) {
    case "GET":
        if (args[1] || args[1] == "products") {
            const productos = await obternerProductos(args[1]);
            console.log(productos)
        } else {
            console.log("Comando recibido es Incorrecto en el:", args[0]);
        }
        break;
    case "POST":
        if (args[1] && args[2] && args[3] && args[4] && args[1].startsWith("products")) {
            await crearProductos({ title: args[2], price: args[3], category: args[4] })
            console.log("Producto creado exitosamente.")
        } else {
            console.log("Comando recibido es Incorrecto en el:", args[0])
        }
        break;
    case "DELETE":
        if (args[1].startsWith("products/") && args[1].length > 9) {
            const respuesta = await eliminarProducto(args[1])
            console.log("Se a eliminado el producto", respuesta)
        } else {
            console.log("Comando recibido es Incorrecto en el:", args[0])
        }
        break;
    default:
        console.log("No existe el comando ingresado:", args[0])
}