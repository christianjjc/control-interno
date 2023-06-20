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

  static getDataAll = async (valor, url, maxRegs, paginaActual, fnSetPaginas, fnSetListaProveedores) => {
    try {
      UtilidadesCj.spinnerTF(true);
      const arrayTotal = await UtilidadesCj.obtenerDatosAxios(url + "all/", "POST", { valor: valor });
      const cantidadBotones = UtilidadesCj.etiquetasPaginacion(Math.ceil(arrayTotal.length / maxRegs));
      fnSetPaginas(cantidadBotones);
      const proveedores = await UtilidadesCj.arrayPaginado(arrayTotal, paginaActual, maxRegs);
      fnSetListaProveedores(proveedores);
      UtilidadesCj.spinnerTF(false);
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
}

export default UtilidadesCj;
