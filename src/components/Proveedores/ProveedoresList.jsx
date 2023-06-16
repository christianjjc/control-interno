import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import imgTrash from "./trash3.svg";
import imgModify from "./modify-ico.png";
import { Link } from "react-router-dom";
import "./ProveedoresList.css";

const ProveedoresList = () => {
    const URL_API_PROVEEDORES = "http://localhost:8080/proveedores/";
    const [listaProveedores, setListaProveedores] = useState([]);

    const getProveedores = async () => {
        try {
            const proveedores = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES, "get");
            setListaProveedores(proveedores);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProveedores();
    }, []);

    return (
        <>
            <section id="listaProveedores">
                <div className="row">
                    <div className="col">
                        <h2>Listado de Proveedores</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ruc</th>
                                    <th scope="col">Razón Social</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProveedores.map((item, index) => (
                                    <tr key={item.id_proveedor} id={item.id_proveedor}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.ruc}</td>
                                        <td>{item.razon_social}</td>
                                        <td>{item.direccion}</td>
                                        <td>{item.telefono}</td>
                                        <td>
                                            <Link id={`btnmp-${item.id_proveedor}`} to={`/main-page/master/proveedores-mant/${item.id_proveedor}`} className="btn btn-outline-warning">
                                                <img src={imgModify} className="img-mant" alt="Modificar Proveedor" />
                                            </Link>
                                        </td>
                                        <td>
                                            <Link id={`dp-${item.id_proveedor}`} to="#" className="btn btn-outline-danger">
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
