import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import { Link, useParams } from "react-router-dom";

const ProveedoresMant = () => {
    const URL_API_PROVEEDOR = "http://localhost:8080/proveedores/";
    const [proveedor, setProveedor] = useState([]);
    const { id } = useParams();

    const getProveedor = async () => {
        try {
            if (id === "new") {
                setProveedor([""]);
            } else {
                const result = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDOR + id, "get");
                setProveedor(result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProveedor();
    }, []);

    return (
        <section id="mantProveedores" className="bg-light">
            <div className="row">
                <div className="col">
                    <h2>Maestro de Proveedores</h2>
                </div>
            </div>

            {proveedor.map((item, index) => (
                <div className="row px-4" key={`prov-mant-${item?.id_proveedor}-${index}`}>
                    <div className="row d-flex flex-sm-wrap my-3">
                        <div className="col-12 col-md-4 fw-bold">
                            <label htmlFor="txtrazonsocial" className="form-label">
                                Razón Social:
                            </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <input
                                id="txtrazonsocial"
                                className="form-control"
                                type="text"
                                placeholder="Razón Social"
                                aria-label="txtrazonsocial"
                                defaultValue={item?.razon_social}
                            />
                        </div>
                    </div>
                    <div className="row d-flex flex-sm-wrap mb-3">
                        <div className="col-12 col-md-4 fw-bold">
                            <label htmlFor="txtruc" className="form-label">
                                RUC:
                            </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <input
                                id="txtruc"
                                className="form-control"
                                type="text"
                                placeholder="Número de Ruc"
                                aria-label="txtruc"
                                defaultValue={item?.ruc}
                            />
                        </div>
                    </div>
                    <div className="row d-flex flex-sm-wrap mb-3">
                        <div className="col-12 col-md-4 fw-bold">
                            <label htmlFor="txtdireccion" className="form-label">
                                Dirección:
                            </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <input
                                id="txtdireccion"
                                className="form-control"
                                type="text"
                                placeholder="Dirección"
                                aria-label="txtdireccion"
                                defaultValue={item?.direccion}
                            />
                        </div>
                    </div>
                    <div className="row d-flex flex-sm-wrap mb-3">
                        <div className="col-12 col-md-4 fw-bold">
                            <label htmlFor="txttelefono" className="form-label">
                                Teléfono:
                            </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <input
                                id="txttelefono"
                                className="form-control"
                                type="text"
                                placeholder="Dirección"
                                aria-label="txttelefono"
                                defaultValue={item?.telefono}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="row">
                <div className="col-12 d-flex flex-wrap justify-content-center">
                    <Link className="btn btn-secondary me-1 mb-2">Guardar</Link>
                    <Link className="btn btn-danger mx-1 mb-2">Eliminar</Link>
                    <Link className="btn btn-secondary mx-1 mb-2">Imprimir</Link>
                    <Link className="btn btn-warning ms-1 mb-2" to="/main-page/master/proveedores">
                        Volver
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProveedoresMant;
