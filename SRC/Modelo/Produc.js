

export class Produc{
    /**
 * Identificador único del producto.
 * @type {number}
 */
    #id
    /**
 * Nombre del producto.
 * @type {string}
 */
    #name;
    /**
 * Precio unitario del producto.
 * @type {number}
 */
    #price;
    /**
 * Cantidad de unidades disponibles.
 * @type {number}
 */
    #units

    /**
   * Crea una nueva instancia de Product.
   *
   * @param {string} name - Nombre del producto.
   * @param {number} price - Precio unitario del producto.
   * @param {number} [units=0] - Cantidad inicial de unidades (por defecto 0).
   * @param {number} id - Identificador único del producto.
   */
    constructor(name,price,units= 0,id){
        this.#name = name;
        this.#price = price;
        this.#units = units;
        this.#id = id;
    }

    changeUnits(unidades){
        if(this.#units-unidades<0&&unidades<0){
            return false;
        }else{
             this.#units = unidades+Number(this.#units);
             return true;
        }
    }

    /**
 * Calcula el importe total del producto (precio × unidades).
 *
 * @returns {number} El importe total del producto.
 */

    productImport(){
        return this.#price * this.#units;
    }

/**
 * Devuelve una representación en cadena del producto,
 * incluyendo nombre, unidades, precio unitario e importe total.
 *
 * @returns {string} Cadena con el formato: "Nombre (unidades): precio €/u => importeTotal"
 */

    toString(){
        return ` ${this.#name} ( ${this.#units} ): ${this.#price} €/u => ${this.productImport().toFixed(2)} `;
    }

    /**
   * Devuelve el identificador único del producto.
   * @returns {number} ID del producto.
   */

    getId(){
        return this.#id;
    }

    /**
   * Devuelve el precio unitario del producto.
   * @returns {number} Precio del producto.
   */

    getPrice(){
        return this.#price;
    }

    /** 
     * Devuelve la cantidad de unidades disponibles. * 
     * @returns {number} Unidades del producto. */

    getUnits(){
        return this.#units;
    }

    /**
   * Devuelve el nombre del producto.
   * @returns {string} Nombre del producto.
   */

    getName(){
        return this.#name;
    }

    /**
   * Actualiza el nombre del producto.
   * @param {string} name - Nuevo nombre del producto.
   */

    setName(name){
        this.#name=name;
    }


/**
   * Actualiza la cantidad de unidades disponibles.
   * @param {number} units - Nueva cantidad de unidades.
   */

    setUnits(units){
        this.#units =units;
    }

/**
   * Actualiza el precio unitario del producto.
   * @param {number} price - Nuevo precio del producto.
   */    

    setPrice(prece){
        this.prece = prece
    }

}




