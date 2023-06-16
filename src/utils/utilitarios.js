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
}

export default UtilidadesCj;
