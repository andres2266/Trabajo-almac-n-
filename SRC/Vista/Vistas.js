
export class Vista{

    constructor(){

/**
   * Inicializa las referencias a los elementos del DOM:
   * - tabla: cuerpo de la tabla de productos.
   * - msg: contenedor de mensajes (avisos, errores, etc.).
   * - total: elemento que muestra el importe total.
   */

    
        this.tabla = document.getElementById("store").children[1];
        this.msg = document.getElementsByTagName("mensajes");
        this.total = document.getElementById("total");
    }
    

    /**
 * Extrae los datos principales de un producto en forma de array.
 *
 * @param {Product} product - Instancia del producto del que se obtendrán los datos.
 * @returns {Array} Array con los datos del producto en el orden:
 * [id, nombre, unidades, precio, importe total].
 */

    #datosDeTabla(Produc){
        let datosDeProducto = [];
        datosDeProducto.push(Produc.getId());
        datosDeProducto.push(Produc.getName());
        datosDeProducto.push(Produc.getUnits());
        datosDeProducto.push(Produc.getPrice());
        datosDeProducto.push(Produc.productImport());
        return datosDeProducto;    
    }

    #buscarFila(idDeProducto){
        let filas = this.tabla.children;
        for (let i = 0; i < filas.length; i++) {
            if(filas[i].children[0].textContent==idDeProducto){
                return i;
            }
            
        }  
    }

/**
 * Inserta una celda en la fila con los iconos de acción
 * (aumentar, disminuir, modificar, eliminar).
 *
 * @param {HTMLTableRowElement} fila - Fila de la tabla donde se insertará la celda.
 * @param {HTMLElement} aumentar - Icono/botón para aumentar unidades.
 * @param {HTMLElement} disminuir - Icono/botón para disminuir unidades.
 * @param {HTMLElement} modificar - Icono/botón para modificar el producto.
 * @param {HTMLElement} eliminar - Icono/botón para eliminar el producto.
 * @param {number} unidades - Cantidad actual de unidades del producto.
 */
    

    #insertarIcono(fila,aumentar,disminuir,modificar,eliminar,unidades){
       let columna = fila.insertCell();
       columna.appendChild(aumentar);
       columna.appendChild(disminuir);
       if(unidades<1){columna.querySelector('i.Disminuir').hidden = true }
       columna.appendChild(modificar);
       columna.appendChild(eliminar);
       columna.classList.add('table-light');
       columna.classList.add('5');
    //    columna.querySelectorAll('i').forEach(element => {
    //     element.hidden = true
    //    });
    }




    #añadirPropidades(fila,aumentar,disminuir,modificar,eliminar,unidades){
       aumentar.classList.add('bi','bi-chevron-compact-up');
       disminuir.classList.add('bi','bi-chevron-compact-down');
       modificar.classList.add('bi','bi-eyedropper');
       eliminar.classList.add('bi','bi-backspace-reverse');
       aumentar.classList.add('Aumentar');
       disminuir.classList.add('Disminuir');
       modificar.classList.add('Modificar');
       eliminar.classList.add('Eliminar');
       this.#insertarIcono(fila,aumentar,disminuir,modificar,eliminar,unidades);
    }



    /**
 * Añade las clases CSS necesarias a los iconos de acción
 * (aumentar, disminuir, modificar, eliminar) y los inserta en la fila.
 *
 * @param {HTMLTableRowElement} fila - Fila de la tabla donde se insertarán los iconos.
 * @param {HTMLElement} aumentar - Icono/botón para aumentar unidades.
 * @param {HTMLElement} disminuir - Icono/botón para disminuir unidades.
 * @param {HTMLElement} modificar - Icono/botón para modificar el producto.
 * @param {HTMLElement} eliminar - Icono/botón para eliminar el producto.
 * @param {number} unidades - Cantidad actual de unidades del producto.
 */

    #crearIconos(fila,unidades){
       let aumentar = document.createElement('i');
       let disminuir = document.createElement('i');
       let modificar = document.createElement('i');
       let eliminar = document.createElement('i');
       this.#añadirPropidades(fila,aumentar,disminuir,modificar,eliminar,unidades); 
    }
    
    /**
 * Renderiza un nuevo producto en la tabla de la vista.
 * Crea una nueva fila con los datos del producto y añade los iconos de acción.
 *
 * @param {Product} product - Instancia del producto a renderizar.
 */

    renderNewProduct(Produc){
        const datosProductos = this.#datosDeTabla(Produc);
        let fila = this.tabla.insertRow();
        fila.classList.add('5');
        for (let i = 0; i < datosProductos.length; i++) {
            let columna = fila.insertCell();
            columna.textContent = datosProductos[i];
            columna.classList.add('table-light');   
        }
        this.#crearIconos(fila,Produc.getUnits());
    }


/**
 * Elimina de la tabla la fila correspondiente al producto con el id indicado.
 *
 * @param {number|string} id - Identificador único del producto a eliminar.
 */

    renderDelProduct(id){
        let filas = this.tabla.children;
        for (let i = 0; i < filas.length; i++) {
            if(filas[i].children[0].textContent==id){
                filas[i].remove();
            }
     
        }
}

/**
 * Actualiza el stock y el importe de un producto en la tabla.
 * Si las unidades superan el máximo permitido (100), muestra un aviso en la interfaz.
 *
 * @param {number} unid - Nuevas unidades del producto.
 * @param {number} nuevoImporte - Nuevo importe total del producto.
 * @param {number|string} id - Identificador único del producto.
 */


    aumentarStock(unid,nuevoInporte,id){
        let filas = this.tabla.children;
        for (let i = 0; i < filas.length; i++) {
            if(filas[i].children[0].textContent==id){
                if(unid<100){
                filas[i].children[2].textContent=unid;
                filas[i].children[4].textContent=nuevoInporte;
                }else{
                let div = document.createElement('div');
                div.classList.add('avisos');
                let p = document.createElement('P');
                p.textContent = "Las unidades maximo es 100 ";
                p.classList.add("mensajeEspecial");
                div.appendChild(p);
                document.body.insertAdjacentElement('afterend',div);
                }
            } 
    }
}


/**
 * Disminuye en una unidad el stock de un producto en la tabla
 * y recalcula su importe total.
 *
 * @param {HTMLTableRowElement} fila - Fila de la tabla que representa al producto.
 */

    disminuirStock(columna){
        let uds = columna.children[2]
        let importe = fila.children[4];
        let precio = fila.children[3];
        uds.textContent = Number(uds.textContent)-1;
        importe.textContent = Number(importe.textContent*precio.textContent);
    }

/**
 * Configura el formulario para modificar un producto existente.
 * - Bloquea el campo de ID para evitar cambios.
 * - Cambia el texto del botón de añadir a "Cambiar".
 * - Añade una clase especial al botón de reset.
 *
 * @param {number} id - Identificador único del producto que se va a modificar.
 */

    cambiarFormulario(id){
        document.getElementById('NuevoProducto').children[0].children[1].value=id
       document.getElementById('NuevoProducto').children[0].children[1].disabled = true;
       document.getElementById('Añadir').textContent='Cambiar';
       document.getElementById('Reset').classList.add('ResetProduc');
       document.getElementById('NuevoProducto').children[0].children[1].disabled = true;
    }

/**
 * Restablece el formulario a su estado inicial para añadir un nuevo producto.
 * - Habilita el campo de ID.
 * - Cambia el texto del botón a "Añadir".
 * - Elimina la clase especial del botón de reset.
 */

    #restablecerFormulario(){
        document.getElementById('NuevoProducto').children[0].children[1].disabled = false;
        document.getElementById('Añadir').textContent='Añadir';
        document.getElementById('Reset').classList.remove('ResetProduc')
    }



    /**
 * Modifica los datos de un producto en la fila de la tabla
 * y recalcula su importe total. Después, restablece el formulario.
 *
 * @param {string} nombre - Nuevo nombre del producto.
 * @param {number} precio - Nuevo precio unitario del producto.
 * @param {number} unidades - Nueva cantidad de unidades disponibles.
 * @param {HTMLTableRowElement} tr - Fila de la tabla que representa al producto.
 */
    modificarProducto(nombre,precio,unidades,tr){
        tr.children[1].textContent=nombre;
        tr.children[2].textContent=unidades;
        tr.children[3].textContent=precio;
        tr.children[4].textContent= (tr.children[3].textContent * tr.children[2].textContent);
        this.#restablecerFormulario()
    }

    /**
 * Rellena el formulario de producto con los valores indicados.
 *
 * @param {string} nombre - Nombre del producto.
 * @param {number} unidades - Cantidad de unidades disponibles.
 * @param {number} precio - Precio unitario del producto.
 */

    restablecerValores(nombre,unidades,precio){
          document.getElementById('NuevoProducto').children[0].children[1].value=nombre;
           document.getElementById('NuevoProducto').children[1].children[1].value=precio;
            document.getElementById('NuevoProducto').children[2].children[1].value=unidades;
        
    }

    /**
 * Elimina los párrafos de validación que estén justo después
 * de los campos del formulario (nombre, precio, unidades, id).
 *
 * @param {HTMLElement} nombre - Campo de entrada para el nombre del producto.
 * @param {HTMLElement} precio - Campo de entrada para el precio del producto.
 * @param {HTMLElement} unidades - Campo de entrada para las unidades del producto.
 * @param {HTMLElement} id - Campo de entrada para el identificador del producto.
 */

    #eliminarParrafos(nombre,precio,unidades,id){
        let campos = [nombre,precio,id,unidades];
        for (let i = 0; i < campos.length; i++) {
          if(campos[i].nextElementSibling&&campos[i].nextElementSibling.tagName==='P'){
            campos[i].nextElementSibling.remove()
          }
        }
    
        
    }


    /**
 * Valida que los campos obligatorios (nombre, precio, id) no estén vacíos.
 * Si alguno está vacío, inserta un mensaje de error justo después del campo.
 *
 * @param {HTMLElement} nombre - Campo de entrada para el nombre del producto.
 * @param {HTMLElement} precio - Campo de entrada para el precio del producto.
 * @param {HTMLElement} id - Campo de entrada para el identificador del producto.
 * @returns {boolean} `true` si todos los campos están completos, `false` si alguno está vacío.
 */

    #validarCaposObligatorios(nombre,precio,id){
        
            let campos = [nombre,precio,id]
            let campoBacio = true;
            for (let i = 0; i < campos.length; i++) {
                let mensajeDeError = document.createElement('p');
                mensajeDeError.textContent = "El campo es obligatorio";
                mensajeDeError.classList.add("mensajeError");
                if(campos[i].validity.valueMissing){
                    campos[i].insertAdjacentElement('afterend',mensajeDeError);
                    campoBacio = false;
                }
 
            }
        return campoBacio;

    }

    /**
 * Elimina el contenedor de avisos si existe en el DOM.
 * Se utiliza para limpiar mensajes informativos o de error.
 */

    eliminardiv(){
        if(document.querySelector('div.avisos')){
        document.querySelector('div.avisos').remove()
        }

    }

    /**
 * Valida que el identificador del producto no se repita al añadir uno nuevo.
 * Si el id ya existe en la colección, muestra un aviso en la interfaz.
 *
 * @param {HTMLInputElement} id - Campo de entrada para el identificador del producto.
 * @param {Array<Product>} arrayId - Colección de productos existentes.
 * @param {boolean} modificacion - Indica si se está modificando un producto (true) o añadiendo uno nuevo (false).
 * @returns {boolean} `true` si la validación es correcta, `false` si el id está repetido.
 */
    validacionesEspeciales(id,arrayId,modificacion){
        if(!modificacion){
        this.eliminardiv()
        let valido = true;
        if(arrayId.some(n=>n.getId()==id.value)){
         let div = document.createElement('div');
         div.classList.add('avisos');
         let p = document.createElement('P');
         p.classList.add("mensajeEspecial")
         p.textContent = " El id no  puede repertirce ";
         div.appendChild(p);
        document.body.insertAdjacentElement('afterend',div);
        valido = false;
        }
        return valido;
        }
        return true;
    }

    /**
 * Valida los campos del formulario de producto aplicando reglas de obligatoriedad,
 * patrones, longitudes y rangos. Inserta mensajes de error junto a los campos
 * cuando la validación falla.
 *
 * @param {HTMLInputElement} nombre - Campo de entrada para el nombre del producto.
 * @param {HTMLInputElement} precio - Campo de entrada para el precio del producto.
 * @param {HTMLInputElement} unidades - Campo de entrada para las unidades del producto.
 * @param {HTMLInputElement} id - Campo de entrada para el identificador del producto.
 * @returns {boolean} `true` si el formulario es válido, `false` si hay errores.
 */

        
    validacioFormulario(nombre,precio,unidades,id){
        let formularioValido = true;
        this.#eliminarParrafos(nombre,precio,unidades,id);
        formularioValido = this.#validarCaposObligatorios(nombre,precio,id);

        if(id.validity.patternMismatch){
            
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = " El valor introducido no cumple con lo pedido ";
            mensajeDeError.classList.add("mensajeError");
            id.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }
        
         if(nombre.validity.tooShort){
            
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = "Debes introducir al menos 5 caracteres"
            mensajeDeError.classList.add("mensajeError");
            nombre.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }
        if(nombre.validity.tooLong){
             let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = "Debes introducir como máximo 25 caracteres"
            mensajeDeError.classList.add("mensajeError");
            nombre.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }

        if(unidades.validity.patternMismatch){
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = " El valor introducido no cumple con lo pedido ";
            mensajeDeError.classList.add("mensajeError");
            unidades.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }

        if(unidades.value<0){
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = "Las unidades mínimo es 0"
            mensajeDeError.classList.add("mensajeError");
            unidades.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }
        if(unidades.value>100){
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = "Las unidades maximo es 100"
            mensajeDeError.classList.add("mensajeError");
            unidades.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }
        if(precio.value<0){
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = "El valor minimo es 0"
            mensajeDeError.classList.add("mensajeError");
            precio.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }
        if(precio.value>999.99){
            let mensajeDeError = document.createElement('p');
            mensajeDeError.textContent = "El valor maximo es 999.99"
            mensajeDeError.classList.add("mensajeError");
            precio.insertAdjacentElement('afterend',mensajeDeError);
            formularioValido =false;
        }
    
        return formularioValido;
    }


}
