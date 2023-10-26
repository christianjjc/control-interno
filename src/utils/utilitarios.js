import axios from "axios";

class UtilidadesCj {
  static obtenerDatosAxios = async (ruta, vervo, array = "") => {
    const data = JSON.stringify(array);
    const config = {
      method: vervo,
      maxBodyLength: Infinity,
      url: ruta,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      throw new Error("Error obtenerDatosAxios:" + error);
    }
  };

  static primeraLetaMayus = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  static etiquetasPaginacion = (cantPaginas) => {
    let array = [];
    for (let i = 0; i < cantPaginas; i++) {
      array.push({ num: i });
    }
    return array;
  };

  static arrayPaginado = (array, pagina, cantMax) => {
    if (pagina < 1) {
      pagina = 1;
    }
    const inicio = (pagina - 1) * cantMax;
    const fin = pagina * cantMax;
    const arrayXpagina = array.slice(inicio, fin);
    return arrayXpagina;
  };

  static spinnerTF = (trueFalse) => {
    const spinner = document.querySelector(`#divSpinner`);
    const overlay = document.querySelector(`#divOverlay`);
    if (trueFalse) {
      spinner.style.display = "block";
      overlay.style.display = "block";
    } else {
      spinner.style.display = "none";
      overlay.style.display = "none";
    }
  };

  static ocultaMensaje = (elementId) => {
    try {
      setTimeout(() => {
        try {
          document.getElementById(elementId).classList.add("d-none");
        } catch (error) {
          console.error(error);
        }
      }, 5 * 1000);
    } catch (error) {
      return false;
    }
  };

  static getDataOne = async (url, id, fn) => {
    try {
      UtilidadesCj.spinnerTF(true);
      if (id === "new") {
        fn([""]);
      } else {
        const result = await UtilidadesCj.obtenerDatosAxios(url + id, "GET");
        fn(result);
      }
      UtilidadesCj.spinnerTF(false);
    } catch (error) {
      UtilidadesCj.spinnerTF(false);
      console.error(error);
    }
  };

  /**
   *
   * GET-DATA-ALL
   * Esta función devuelve un array o lista a partir de ingresar un texto.
   * El texto se toma como parámetro para devolver los registros que lo contengan.
   *
   * @param {*} valor Es el valor que se está buscando o el texto ingresado.
   * @param {*} url la URL a la que se hará el FETCH.
   * @param {*} maxRegs la cantidad máxima de registros por página.
   * @param {*} paginaActual Es la página que se va a mostrar al inicio. Se ha colocado 1, pero puede ser otra.
   * @param {*} fnSetPaginas set de useState - setea en el componente la cantidad de páginas que se devolverán luego de calcularlas.
   * @param {*} fnSetLista set de useState - setea en el componente la LISTA o ARRAY a devolver. Aquí es donde se llena el objeto LISTA.
   *
   */
  static getDataAll = async (valor, url, maxRegs, paginaActual, fnSetPaginas, fnSetLista) => {
    try {
      UtilidadesCj.spinnerTF(true);
      const arrayTotal = await UtilidadesCj.obtenerDatosAxios(url + "all/", "POST", { valor: valor });
      const cantidadBotones = UtilidadesCj.etiquetasPaginacion(Math.ceil(arrayTotal.length / maxRegs));
      fnSetPaginas(cantidadBotones);
      const result = await UtilidadesCj.arrayPaginado(arrayTotal, paginaActual, maxRegs);
      fnSetLista(result);
      UtilidadesCj.spinnerTF(false);
    } catch (error) {
      UtilidadesCj.spinnerTF(false);
      console.error(error);
    }
  };

  static getDataenArray = async (url, valor = "", fn) => {
    try {
      UtilidadesCj.spinnerTF(true);
      const result = await UtilidadesCj.obtenerDatosAxios(url, "POST", { valor: valor });
      fn(result);
      UtilidadesCj.spinnerTF(false);
      return result;
    } catch (error) {
      UtilidadesCj.spinnerTF(false);
      console.error(error);
    }
  };

  static fnEliminaItem = async (id, nombre, URL, fn) => {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar "${nombre.toUpperCase()}?"`);
    if (confirmacion) {
      try {
        UtilidadesCj.spinnerTF(true);
        const data = { id: id };
        const result = await UtilidadesCj.obtenerDatosAxios(URL, "DELETE", data);
        fn(result);
        UtilidadesCj.spinnerTF(false);
        return true;
      } catch (error) {
        UtilidadesCj.spinnerTF(false);
        console.error("Error al eliminar", error);
        return false;
      }
    } else {
      return false;
    }
  };

  static cargaArrayEnCombo = (strIdCmb, miArray, propiedadID, propiedadNombre) => {
    const cmb = document.querySelector(`#${strIdCmb}`);
    let html = ``;
    for (const eL of miArray) {
      //html += `<option value="${eL.id}">${eL.nombre}</option>`;
      html += `<option value="${eL[propiedadID]}">${eL[propiedadNombre]}</option>`;
    }
    cmb.innerHTML = html;
  };
}

export default UtilidadesCj;
