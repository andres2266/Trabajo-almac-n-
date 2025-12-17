
import { Produc } from "../Modelo/Produc.js";
import { Vista } from "../Vista/Vistas.js"; 
import { Store } from "../Modelo/Store.js";
    
 export class Controlador{

  /**
   * Crea una nueva instancia del Controlador.
   * Inicializa la vista y la tienda con un ID por defecto.
   *
   * @property {Vista} vista - Instancia de la clase Vista encargada de la interfaz.
   * @property {Store} store - Instancia de la clase Store que gestiona los productos.
   */
     constructor(){
      this.vista = new Vista();
      this.store = new Store(1) 
     }

/**
 * Crea un nuevo producto, lo añade al store y lo renderiza en la vista.
 *
 * @param {string} name - Nombre del producto.
 * @param {number} price - Precio unitario del producto.
 * @param {number} units - Cantidad inicial de unidades.
 * @param {number} id - Identificador único del producto.
 */

     renderNewProduct(name,price,units,id){
        const producto = new Produc(name,price,units,id);
        this.store.addProduct(producto);
        this.vista.renderNewProduct(producto);
     }



/**
 * Elimina un producto de la vista y del store.
 *
 * @param {number} id - Identificador único del producto a eliminar.
 */

      renderDelProduct(id){
        this.vista.renderDelProduct(id);
        this.store.delProduct(id);
      }

/**
 * Actualiza el stock de un producto en el store y refleja el cambio en la vista.
 *
 * @param {number} id - Identificador único del producto.
 * @param {number} valor - Cantidad de unidades a modificar (puede ser positiva o negativa).
 */

      CambiarStock(id,valor){
       this.store.changeProductUnits(id,valor);
       const produc = this.store.findProduct(id);
       this.vista.aumentarStock(produc.getUnits(),produc.productImport(),id);
      }


/**
 * Solicita a la vista que actualice el formulario de un producto.
 *
 * @param {number} id - Identificador único del producto.
 * @param {string} nombre - Nombre del producto.
 * @param {number} unidades - Cantidad de unidades disponibles.
 * @param {number} precio - Precio unitario del producto.
 * @param {number} fila - Índice o referencia de la fila en la tabla de productos.
 */

      cambiarFormulario(id,nombre,unidades,precio,fila){
      
        this.vista.cambiarFormulario(id,nombre,unidades,precio,fila);
      }

/**
 * Modifica un producto en el store y refleja los cambios en la vista.
 *
 * @param {string} name - Nuevo nombre del producto.
 * @param {number} price - Nuevo precio unitario del producto.
 * @param {number} units - Nueva cantidad de unidades disponibles.
 * @param {number} id - Identificador único del producto.
 * @param {HTMLElement} tr - Fila de la tabla en la vista que representa al producto.
 */      

      cambiarProducto(name,price,units,id,tr){
        this.store.modifyProduct(name,price,units,id);
        this.vista.modificarProducto(name,price,units,tr);
      }

 /**
 * Solicita a la vista que restablezca los valores de un producto en el formulario.
 *
 * @param {string} nombre - Nombre del producto.
 * @param {number} unidades - Cantidad de unidades disponibles.
 * @param {number} precio - Precio unitario del producto.
 */     

      restablecerValores(nombre,unidades,precio){
        this.vista.restablecerValores(nombre,unidades,precio);
      }

      /**
 * Valida el formulario del producto utilizando las reglas de la vista.
 *
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio unitario del producto.
 * @param {number} unidades - Cantidad de unidades disponibles.
 * @param {number} id - Identificador único del producto.
 * @param {boolean} modificacion - Indica si se trata de una modificación (true) o creación (false).
 * @returns {boolean} `true` si todas las validaciones son correctas, `false` en caso contrario.
 */

      validacioFormulario(nombre,precio,unidades,id,modificacion){
       
        let validacionDeFormulario = true;
        let validacionEspacial = true;
        validacionDeFormulario = this.vista.validacioFormulario(nombre,precio,unidades,id);
        validacionEspacial = this.vista.validacionesEspeciales(id,this.store.getArray(),modificacion);
        if(!validacionDeFormulario||!validacionEspacial){
          return false;
        }
        return true     
      }
}
