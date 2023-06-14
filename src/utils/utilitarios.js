//import moment from "moment";
import axios from "axios";

class UtilidadesCj {
    static obtenerDatosAxios = async (ruta, vervo, array) => {
        let config = {
            method: vervo,
            maxBodyLength: Infinity,
            url: ruta,
            headers: {
                "Content-Type": "application/json",
            },
            data: array,
        };
        try {
            const response = await axios.request(config);
            //console.log(response.data);
            return response.data;
        } catch (error) {
            //console.log(error);
            throw new Error("Error:" + error);
        }
    };
}

export default UtilidadesCj;
