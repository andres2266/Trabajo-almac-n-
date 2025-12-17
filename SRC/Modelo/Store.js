    import { Produc } from "./Produc.js";

 export class Store{

    /**
    * Lista de productos de la tienda.
    * @type {Array}
    */

     #producs = []


    /**
     * Crea una nueva instancia de Store.
    *
    * @param {number} id - Identificador único de la tienda.
    */

     constructor(id){
        this.id = id;
     }

     /**
      * 
      * Buscar un producto existente
      * 
      * @param {number} idDeProducto El ID del producto a buscar. 
      * @returns{Produc|undefined} El producto encontrado, o `undefined` si no existe
      */

     findProduct(idDeProducto){
      let posision =  this.#producs.findIndex(n=>n.getId()==idDeProducto);
      return this.#producs[posision];
     }


     /**
      * 
      * Añade un producto
      * 
      * @param {Produc} El producto que quieres insertar
      * @returns {Produc|false} El producto insertado o 'false' si no se inserto
      */

     addProduct(Produc){
        if(!this.#producs.some(n=>n.getId()==Produc.getId())){
            this.#producs.push(Produc);
            return Produc;
        }
            return false;
     }

     /**
      * Elimina un producto
      * 
      * @param {number} Id del elemeto que quieres eleminar 
      * @returns {false} Devuelve false si no se elimino el producto
      */

     delProduct(id){
        if(!this.#producs.some(n=>n.getId() == id)&&this.#producs[id].getUnits()>0){
              let pocicionEliminada = this.#producs.findIndex(n=>n.getId()==id)
              this.#producs.splice(pocicionEliminada,pocicionEliminada);
              return
        }
        return false;
     }

     /**
 * Modifica las unidades de un producto existente.
 *
 * @param {number} id - El identificador único del producto.
 * @param {number} unidades - La nueva cantidad de unidades a asignar.
 */

     changeProductUnits(id,unidades){
        let pocicionModificada = this.#producs.findIndex(n=>n.getId()==id);
        
        this.#producs[pocicionModificada].changeUnits(unidades); 
    };


    /**
 * Modifica las propiedades de un producto existente.
 *
 * @param {string} nombre - Nuevo nombre del producto.
 * @param {number} precio - Nuevo precio del producto.
 * @param {number} unidades - Nueva cantidad de unidades.
 * @param {number} id - Identificador único del producto a modificar.
 */

    modifyProduct(nombre,precio,unidades,id){
        const posision = this.#producs.findIndex(n=>n.getId() === id);
        this.#producs[posision].setName(nombre);
        this.#producs[posision].setPrice(precio);
        this.#producs[posision].setUnits(unidades);
    }

/**
 * Calcula la suma de los precios unitarios de todos los productos.
 *
 * @returns {number} La suma de los precios de todos los productos.
 */

    totalImport(){
        let sumaDePrecios = this.#producs.reduce((acomulador,valorActual) => acomulador + valorActual.getPrice(),0);
        return sumaDePrecios;
    }



    underStock(unidades){
        let menorUnidades = this.#producs.map(n=>n.getUnits()<unidades);
        return menorUnidades;
    }

/**
 * Ordena los productos por unidades en orden descendente.
 *
 * @returns {Produc[]} Lista de productos ordenados de mayor a menor según sus unidades.
 */
    
    orderByUnits(){
       return this.#producs.sort((a,b)=>b.getUnits()-a.getUnits());
    }

/**
 * Ordena los productos por nombre en orden alfabético ascendente.
 *
 * @returns {Producto[]} Lista de productos ordenados por nombre.
 */

    orderByName(){
        return this.#producs.sort((a,b)=>a.getName().localeCompare(b.getName()));
    }

/**
 * Devuelve el array interno de productos.
 *
 * @returns {Producto[]} Lista completa de productos almacenados en la tienda.
 */

    getArray(){
        return this .#producs;
    }
}