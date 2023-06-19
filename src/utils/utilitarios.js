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

    //static comodin = encodeURIComponent("%");
    static comodin = "%";

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
}

export default UtilidadesCj;
