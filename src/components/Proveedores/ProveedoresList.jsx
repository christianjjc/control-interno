import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import imgTrash from "./trash3.svg";
import imgModify from "./modify-ico.png";
import { Link } from "react-router-dom";
import "./ProveedoresList.css";

const ProveedoresList = () => {
    const URL_API_PROVEEDORES = "http://localhost:8080/proveedores/";
    const [listaProveedores, setListaProveedores] = useState([]);
    const [provEliminado, setprovEliminado] = useState([]);

    const handleBuscaProveedor = () => {
        const valorBuscado = document.getElementById("txtbuscarproveedor").value;
        getProveedores(valorBuscado);
    };

    const handleEliminarProveedor = (id, rs, event) => {
        !fnEliminaProvedor(id, rs) && event.preventDefault();
    };

    const fnEliminaProvedor = async (id, rs) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al proveedor ${rs}?`);
        if (confirmacion) {
            try {
                const data = { id_proveedor: id };
                const result = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES, "delete", data);
                setprovEliminado(result);
                alert("Proveedor eliminado satisfactoriamente.");
                return true;
            } catch (error) {
                console.error("Error al eliminar", error);
            }
        } else {
            return false;
        }
    };

    const getProveedores = async (valor) => {
        try {
            const proveedores = await UtilidadesCj.obtenerDatosAxios("http://localhost:8080/proveedores/all/", "POST", {
                valor: valor,
            });
            setListaProveedores(proveedores);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleBuscaProveedor();
    }, [provEliminado]);

    return (
        <>
            <section id="listaProveedores">
                <div className="row my-3">
                    <div className="col">
                        <h2>Listado de Proveedores</h2>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-md-4 d-flex flex-wrap justify-content-start">
                        <div className="input-group">
                            <input
                                id="txtbuscarproveedor"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese Razón Social o RUC"
                                aria-label="Recipient's username"
                                aria-describedby="btnbuscarproveedor"
                            />
                            <button className="btn btn-primary" type="button" id="btnbuscarproveedor" onClick={handleBuscaProveedor}>
                                Buscar
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 d-flex flex-wrap justify-content-end">
                        <Link className="btn btn-secondary me-1 mb-2" to={`/main-page/master/proveedores/new`}>
                            Nuevo
                        </Link>
                        <Link className="btn btn-secondary mx-1 mb-2">Imprimir</Link>
                        <Link className="btn btn-warning ms-1 mb-2" to="/main-page/master/">
                            Volver
                        </Link>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ruc</th>
                                    <th scope="col">Razón Social</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Productos</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProveedores.map((item, index) => (
                                    <tr key={item?.id_proveedor} id={item?.id_proveedor}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item?.ruc}</td>
                                        <td>{item?.razon_social}</td>
                                        <td>{item?.direccion}</td>
                                        <td>{item?.telefono}</td>
                                        <td>{item?.que_vende}</td>
                                        <td>
                                            <Link
                                                id={`btnmp-${item?.id_proveedor}`}
                                                to={`/main-page/master/proveedores/${item?.id_proveedor}`}
                                                className="btn btn-outline-warning">
                                                <img src={imgModify} className="img-mant" alt="Modificar Proveedor" />
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                id={`dp-${item?.id_proveedor}`}
                                                to="/main-page/master/proveedores"
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    handleEliminarProveedor(`${item?.id_proveedor}`, `${item?.razon_social}`);
                                                }}>
                                                <img src={imgTrash} className="img-mant" alt="Eliminar Proveedor" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProveedoresList;
