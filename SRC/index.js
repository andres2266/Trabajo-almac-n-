import { Controlador } from "./Controlador/Controlador.js";
import { Produc } from "./Modelo/Produc.js";
const controlador = new Controlador;



/**
 * Realiza una petición HTTP usando fetch y devuelve la respuesta en formato JSON.
 *
 * @param {string} url - URL del recurso a solicitar.
 * @param {object} [options] - Opciones de configuración para fetch (método, headers, body, etc.).
 * @returns {Promise<object>} Promesa que se resuelve con el JSON de la respuesta.
 * @throws {Error} Lanza un error si la respuesta no es correcta o si ocurre un fallo en la petición.
 */

  async function request(url,options){
      try {
         let resultado = await fetch(url,options);
         if(!resultado.ok){
            throw `Error ${resultado.status} - ${resultado.textContent}`;
         }
         return await resultado.json();
      } catch (error) {
         
      }
   }


/**
 * Envía una petición DELETE a la API para borrar un recurso por su id.
 *
 * @param {number|string} id - Identificador único del recurso a eliminar.
 * @param {string} url - URL base de la API.
 * @returns {Promise<object>} Promesa que se resuelve con la respuesta de la API.
 */


function borrarDeApi(id,url){
   let option ={
      method:"DELETE",
      headers: {"Content-Type": "application/charset=utf-8"}
   }
   borrar = request(url+ "/" + id , option)
}   

/**
 * Envía una petición POST a la API para crear un nuevo producto.
 *
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio unitario del producto.
 * @param {number} unidades - Cantidad de unidades disponibles.
 * @param {number|string} id - Identificador único del producto.
 * @param {string} url - URL base de la API.
 * @returns {Promise<object>} Promesa que se resuelve con la respuesta de la API.
 */

function crearProductoApi(nombre,precio,unidades,id){
  const produc = {
      id: id,
      nombre:nombre,
      precio:precio,
      unidades:unidades
   }

   const opcion ={
      method: "POST",
      headers: {"Content-Type": "application/charset=utf-8"},
      body: JSON.stringify(produc)
   }

   request('http://localhost:3000/productos',opcion)


}

/**
 * Envía una petición PUT a la API para modificar un producto existente.
 *
 * @param {number|string} id - Identificador único del producto.
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio unitario del producto.
 * @param {number} unidades - Cantidad de unidades disponibles.
 * @param {string} url - URL base de la API.
 * @returns {Promise<object>} Promesa que se resuelve con la respuesta de la API.
 */

   function modificarApi(id,nombre,precio,unidades){
      const produc = {
      id: id,
      nombre:nombre,
      precio:precio,
      unidades:unidades
   }

   const opcion ={
      method: "PUT",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(produc)
   }

   request('http://localhost:3000/productos/' + mod ,opcion)
   }


   /**
 * Maneja el evento del formulario de producto.
 * Si el botón pulsado es "Añadir" y los datos son válidos,
 * renderiza el nuevo producto en la vista y lo envía a la API.
 *
 * @param {Event} evento - Evento disparado por el formulario o botón.
 */

function datosProducto(evento){

   if(evento.target.textContent=='Añadir'){
    let id = document.querySelector('form#NuevoProducto').children[0].children[1]
    let nombre = document.querySelector("form#NuevoProducto").children[1].children[1];
    let precio = document.querySelector("form#NuevoProducto").children[2].children[1];
    let unidades = document.querySelector("form#NuevoProducto").children[3].children[1];
    let valido = controlador.validacioFormulario(nombre,precio,unidades,id,false);
   
    if(nombre!=""&&precio!=""&&unidades!=""&&id!=""&& valido){
    controlador.renderNewProduct(nombre.value,precio.value,unidades.value,id.value);
    crearProductoApi(nombre.value,precio.value,unidades.value,id.value)
    }
    }
 };

 /**
 * Maneja el evento de eliminación de un producto en la tabla.
 * - Elimina la fila correspondiente en la vista.
 * - Envía una petición DELETE a la API para borrar el producto.
 *
 * @param {Event} evento - Evento disparado por el botón de eliminar.
 */

function renderDelProduct(evento){
    if(evento.target.classList.contains('Eliminar')){
      const borrar = evento.target
      const columna =borrar.parentNode
      const fila  = columna.parentNode
      controlador.renderDelProduct(fila.children[0].textContent);
      borrarDeApi(fila.children[0].textContent,'http://localhost:3000/productos');

    } 
}


/**
 * Maneja el evento de modificación de stock en la tabla.
 * - Si el botón pulsado es "Aumentar", incrementa el stock en 1.
 * - Si el botón pulsado es "Disminuir", decrementa el stock en 1.
 *
 * @param {Event} evento - Evento disparado por los botones de stock.
 */

function modificarStock(evento){
if(evento.target.classList.contains('Aumentar')){
      const aumnentar = evento.target;
      const fila = aumnentar.closest('tr');
      controlador.CambiarStock(fila.children[0].textContent,1);
}else if(evento.target.classList.contains('Disminuir')){
      const aumnentar = evento.target;
      const fila = aumnentar.closest('tr');
      controlador.CambiarStock(fila.children[0].textContent,-1);
}
    
}

/**
 * Controla la visibilidad y estado del icono/botón "Disminuir"
 * según el número de unidades en la fila de la tabla.
 *
 * - Si las unidades son menores que 1, oculta/deshabilita el botón "Disminuir".
 * - Si las unidades son mayores que 0, muestra/habilita el botón "Disminuir".
 *
 * @param {Event} evento - Evento disparado por los botones de stock.
 */
function quitaIcono(evento){
   if(evento.target.classList.contains('Disminuir')){
      console.log("12")
      const disminuir = evento.target;
      let filas = disminuir.closest('tr');
      let unidades = filas.children[2].textContent;
      if(unidades<1){
         filas.children[5].querySelector('i.Disminuir').disabled = true
         filas.children[5].querySelector('i.Disminuir').hidden = true;
      }
   }else if(evento.target.classList.contains('Aumentar')){
      console.log("sad")
      const disminuir = evento.target;
      let filas = disminuir.closest('tr');
      let unidades = filas.children[2].textContent;
      if(unidades>0){
         filas.children[5].querySelector('i.Disminuir').disabled = false;
          filas.children[5].querySelector('i.Disminuir').hidden = false;
      }
   }

}

   function mostrariConos(evento){
      if(evento.target.classList.contains('5')){
         const fila = evento.target.closest('tr');
          fila.children[5].querySelectorAll('i').forEach(element => {
          element.hidden = false;
          }); 
      }
   }

   function mostrarIconos(evento){
      if(evento.target.classList.contains('5')){
         const fila = evento.target.closest('tr');
         fila.children[5].querySelector('i.Eliminar').hidden = true;
         fila.children[5].querySelector('i.Modificar').hidden = true;
         fila.children[5].querySelector('i.Aumentar').hidden = true;
         if(fila.children[2].textContent>0){
            fila.children[5].querySelector('i.Disminuir').hidden = true;
         }
         };
   }

   /**
 * Busca y devuelve la fila de la tabla que corresponde al producto con el id indicado.
 *
 * @param {HTMLInputElement|string|number} id - Campo de entrada o valor del identificador del producto.
 * @returns {HTMLTableRowElement|null} La fila encontrada o `null` si no existe.
 */

   function buscaFila(id){
   let filas = document.getElementById("store").children[1];
   console.log(filas.children.length)
   for (let i = 0; i < filas.children.length; i++) {
      if(filas.children[i].children[0].textContent==id.value){
         return filas.children[i]; 
      }
   }
}

/**
 * Maneja el evento de modificación de un producto en la tabla.
 * - Carga los datos de la fila en el formulario para edición.
 * - Envía la actualización del producto a la API.
 *
 * @param {Event} evento - Evento disparado por el botón de modificar.
 */

   function modificarFormulario(evento){
      if(evento.target.classList.contains('Modificar')){
         const fila = evento.target.closest('tr');
         let id = fila.children[0].textContent;
         let nombre = fila.children[1].textContent;
         let unidades = fila.children[2].textContent;
         let precio = fila.children[3].textContent;
         controlador.cambiarFormulario(id,nombre,unidades,precio,fila);
         modificarApi(nombre,unidades,precio,id)
      }
   }

 
/**
 * Maneja el evento de modificación de un producto desde el formulario.
 * - Valida los datos introducidos.
 * - Actualiza la fila correspondiente en la vista.
 * - Envía la actualización del producto a la API.
 *
 * @param {Event} evento - Evento disparado por el botón "Cambiar".
 */
   function modificarValores(evento){
      if(evento.target.textContent=='Cambiar'){
         let id = document.querySelector('form#NuevoProducto').children[0].children[1];
         let fila = buscaFila(id);
         let nombre = document.querySelector("form#NuevoProducto").children[1].children[1];
         let precio = document.querySelector("form#NuevoProducto").children[2].children[1];
         let unidades = document.querySelector("form#NuevoProducto").children[3].children[1];
         let validacion = controlador.validacioFormulario(nombre,precio,unidades,id,true);
         if(nombre.value!=""&&precio.value!=""&&unidades.value!=""&&validacion){
         controlador.cambiarProducto(nombre.value,precio.value,unidades.value,id.value,fila);
      }
   }
}

/**
 * Restaura los valores originales de un producto en el formulario
 * cuando se pulsa el botón con clase "ResetProduc".
 *
 * @param {Event} evento - Evento disparado por el botón de reset.
 */

   function restablecerValores(evento){
      if(evento.target.classList.contains=='ResetProduc'){
      let id = document.getElementById('idAgregado').value
      let fila = buscaFila(id);
      let nombre = fila.children[1].textContent;
      let unidades = fila.children[2].textContent;
      let precio = fila.children[3].textContent;
      controlador.restablecerValores(nombre,unidades,precio)
      }

   }

/**
 * Carga los productos desde la API y los renderiza en la vista.
 *
 * @returns {Promise<void>} Promesa que se resuelve cuando los productos han sido cargados y renderizados.
 */

  async function cargarProductos(){
     const option = {
         method : "GET",
         headers: {"Content-Type": "application/charset=utf-8"}
      }
      let datosProductos = await request('http://localhost:3000/productos',option);
      datosProductos.forEach(element => {
         controlador.renderNewProduct(element.nombre,element.precio,element.unidades,element.id)
      });

   }

      // document.getElementById('table').addEventListener('mouseover',mostrarIconos);
      
      // document.getElementById('table').addEventListener('mouseout',ocultarIconos);

      document.getElementById("Añadir").addEventListener('click',datosProducto);
  
      document.getElementById("table").addEventListener('click',renderDelProduct);
   
      document.getElementById("table").addEventListener("click",modificarStock);

      document.getElementById('table').addEventListener('click',quitaIcono);

      document.getElementById('table').addEventListener('click',modificarFormulario);


   
      document.getElementById('Añadir').addEventListener('click',modificarValores);

      // Reset de valores

      document.getElementById('Reset').addEventListener('click',restablecerValores);

      // Carga inicial
      window.addEventListener('DOMContentLoaded', cargarProductos )

       

      
      

   