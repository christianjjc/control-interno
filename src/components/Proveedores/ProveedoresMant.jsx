import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import { Link, useParams, useNavigate } from "react-router-dom";
import imgTrash from "./trash3.svg";

const ProveedoresMant = () => {
    const URL_API_PROVEEDORES = "http://localhost:8080/proveedores/";
    const [proveedor, setProveedor] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSaveProveedor = async () => {
        let verbo = "";
        let proveedorGuardar = [];
        const ruc = document.getElementById("txtruc").value;
        const razon_social = document.getElementById("txtrazonsocial").value;
        const direccion = document.getElementById("txtdireccion").value;
        const telefono = document.getElementById("txttelefono").value;
        const que_vende = document.getElementById("txtque_vende").value;
        try {
            if (id === "new") {
                verbo = "post";
                proveedorGuardar = {
                    ruc: ruc,
                    razon_social: razon_social,
                    direccion: direccion,
                    telefono: telefono,
                    que_vende: que_vende,
                };
                const result = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES, verbo, proveedorGuardar);
                if (!result.error) {
                    alert("Registro guardado con éxito.");
                    navigate("/main-page/master/proveedores/");
                } else {
                    document.getElementById("txtMensajeError").classList.remove("d-none");
                    ocultaMensaje();
                }
            } else {
                verbo = "put";
                proveedorGuardar = {
                    id_proveedor: id,
                    ruc: ruc,
                    razon_social: razon_social,
                    direccion: direccion,
                    telefono: telefono,
                    que_vende: que_vende,
                };
                const result = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES, verbo, proveedorGuardar);
                if (!result.error) {
                    alert("Registro guardado con éxito.");
                } else {
                    document.getElementById("txtMensajeError").classList.remove("d-none");
                    ocultaMensaje();
                }
            }
        } catch (error) {
            console.error("Error al eliminar", error);
        }
    };

    const handleEliminarProveedor = async (id, rs) => {
        const eliminado = await fnEliminaProvedor(id, rs);
        eliminado && navigate("/main-page/master/proveedores/");
    };

    const fnEliminaProvedor = async (id, rs) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al proveedor ${rs}?`);
        if (confirmacion) {
            try {
                const data = { id_proveedor: id };
                await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES, "delete", data);
                return true;
            } catch (error) {
                console.error("Error al eliminar", error);
                return false;
            }
        } else {
            return false;
        }
    };

    const getProveedor = async (id) => {
        try {
            if (id === "new") {
                setProveedor([""]);
            } else {
                const result = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES + id, "get");
                setProveedor(result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const ocultaMensaje = () => {
        setTimeout(() => {
            document.getElementById("txtMensajeError").classList.add("d-none");
        }, 5 * 1000);
    };

    useEffect(() => {
        getProveedor(id);
    }, []);

    return (
        <section id="mantProveedores" className="bg-light">
            <div className="row">
                <div className="col">
                    <h2>Maestro de Proveedores</h2>
                </div>
            </div>

            {proveedor.map((item, index) => (
                <div key={`prov-mant-${item?.id_proveedor}-${index}`}>
                    <div className="row px-4">
                        <div className="col">
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
                                        placeholder="Teléfono"
                                        aria-label="txttelefono"
                                        defaultValue={item?.telefono}
                                    />
                                </div>
                            </div>
                            <div className="row d-flex flex-sm-wrap mb-3">
                                <div className="col-12 col-md-4 fw-bold">
                                    <label htmlFor="txtque_vende" className="form-label">
                                        ¿Qué vende?:
                                    </label>
                                </div>
                                <div className="col-12 col-md-8">
                                    <input
                                        id="txtque_vende"
                                        className="form-control"
                                        type="text"
                                        placeholder="que_vende"
                                        aria-label="que_vende"
                                        defaultValue={item?.que_vende}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 d-flex flex-wrap justify-content-center">
                            <Link className="btn btn-secondary me-1 mb-2" onClick={handleSaveProveedor}>
                                Guardar
                            </Link>
                            <Link
                                id={`dp-${item?.id_proveedor}`}
                                className="btn btn-danger mx-1 mb-2"
                                onClick={() => {
                                    handleEliminarProveedor(`${item?.id_proveedor}`, `${item?.razon_social}`);
                                }}>
                                Eliminar
                                <img src={imgTrash} className="img-mant ms-2" alt="Eliminar Proveedor" />
                            </Link>
                            <Link className="btn btn-secondary mx-1 mb-2">Imprimir</Link>
                            <Link className="btn btn-warning ms-1 mb-2" to="/main-page/master/proveedores">
                                Volver
                            </Link>
                        </div>
                    </div>
                    <div id="txtMensajeError" className="row justify-content-center d-none">
                        <div className="col-12 col-sm-6 text-center alert alert-warning" role="alert" id="txtMensajeError">
                            Ups! Hubo un problema al registrarlos datos, por favor verifique que los campos contengan un valor correcto.
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ProveedoresMant;
