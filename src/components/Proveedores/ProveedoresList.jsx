import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import imgTrash from "./trash3.svg";
import imgModify from "./modify-ico.png";
import { Link } from "react-router-dom";
import "./Proveedores.css";

const ProveedoresList = () => {
    const URL_API_PROVEEDORES = "http://localhost:8080/proveedores/";
    const LISTA_MAX_REGS = 20;
    const [listaProveedores, setListaProveedores] = useState([]);
    const [provEliminado, setprovEliminado] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);

    const handleBuscaProveedor = () => {
        const valorBuscado = document.getElementById("txtbuscarproveedor").value;
        getProveedores(valorBuscado);
    };

    const handleEliminarProveedor = (id, rs, event) => {
        !fnEliminaProvedor(id, rs) && event.preventDefault();
    };

    const fnEliminaProvedor = async (id, rs) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al proveedor "${rs.toUpperCase()}"?`);
        if (confirmacion) {
            try {
                UtilidadesCj.spinnerTF(true);
                const data = { id_proveedor: id };
                const result = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES, "delete", data);
                setprovEliminado(result);
                //alert("Proveedor eliminado satisfactoriamente.");
                UtilidadesCj.spinnerTF(false);
                return true;
            } catch (error) {
                UtilidadesCj.spinnerTF(false);
                console.error("Error al eliminar", error);
            }
        } else {
            return false;
        }
    };

    const getProveedores = async (valor) => {
        try {
            UtilidadesCj.spinnerTF(true);
            const arrayTotal = await UtilidadesCj.obtenerDatosAxios(URL_API_PROVEEDORES + "all/", "POST", { valor: valor });
            const cantidadBotones = UtilidadesCj.etiquetasPaginacion(Math.ceil(arrayTotal.length / LISTA_MAX_REGS));
            setPaginas(cantidadBotones);
            const proveedores = await UtilidadesCj.arrayPaginado(arrayTotal, paginaActual, LISTA_MAX_REGS);
            setListaProveedores(proveedores);
            UtilidadesCj.spinnerTF(false);
        } catch (error) {
            UtilidadesCj.spinnerTF(false);
            console.error(error);
        }
    };

    const handleCurrentPage = (num, add = 0) => {
        switch (add) {
            case -1:
                paginaActual > 1 && setPaginaActual(paginaActual - 1);
                break;
            case 1:
                paginaActual < paginas.length && setPaginaActual(paginaActual + 1);
                break;
            default:
                setPaginaActual(num);
                break;
        }
    };

    useEffect(() => {
        handleBuscaProveedor();
    }, [provEliminado, paginaActual]);

    return (
        <>
            <section id="listaProveedores" className="contenedor-seccion">
                <header className="cabecera-form my-3">
                    <div className="row">
                        <div className="col text-center">
                            <h1>Listado de Proveedores</h1>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-lg-6 my-1">
                            <div className="input-group">
                                <input
                                    id="txtbuscarproveedor"
                                    type="text"
                                    className="form-control my-1"
                                    placeholder="Ingrese Razón Social o RUC"
                                    aria-label="Recipient's username"
                                    aria-describedby="btnbuscarproveedor"
                                />
                                <button className="btn btn-primary my-1" type="button" id="btnbuscarproveedor" onClick={handleBuscaProveedor}>
                                    Buscar
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 my-1">
                            <div className="row d-flex justify-content-center">
                                <div className="col-12 col-lg-4 my-1">
                                    <Link className="btn btn-secondary w-100" to={`/main-page/master/proveedores/new`}>
                                        Nuevo
                                    </Link>
                                </div>
                                <div className="col-12 col-lg-4 my-1">
                                    <Link className="btn btn-secondary w-100">Imprimir</Link>
                                </div>
                                <div className="col-12 col-lg-4 my-1">
                                    <Link className="btn btn-warning w-100" to="/main-page/master/">
                                        Volver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="body-form my-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="row border-bottom py-3 my-1">
                                <div className="col-12 col-sm-1 fw-bold text-center">#</div>
                                <div className="col-6 col-sm-3 col-xl-2 fw-bold text-center">Ruc</div>
                                <div className="col-6 col-sm-4 col-xl-2 fw-bold text-center">Razón Social</div>
                                <div className="col-6 col-sm-4 col-xl-3 fw-bold text-center">Dirección</div>
                                <div className="col-6 col-sm-4 col-xl-2 fw-bold text-center">Teléfono</div>
                                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Modificar</div>
                                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Eliminar</div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {listaProveedores.map((item, index) => (
                                        <div className="fila_listado row" key={item?.id_proveedor} id={item?.id_proveedor}>
                                            <div className="col-1 fw-bold  text-center">{index + 1 + (paginaActual - 1) * LISTA_MAX_REGS}</div>
                                            <div className="col-11 col-xl-2">{item?.ruc}</div>
                                            <div className="col-12 col-xl-2 flex-grow-1">{item?.razon_social}</div>
                                            <div className="col-12 col-xl-3 flex-grow-1">{item?.direccion}</div>
                                            <div className="col-12 col-xl-2 text-center">{item?.telefono}</div>
                                            <div className="col-12 col-xl-2">
                                                <div className="row d-flex justify-content-end justify-content-xl-center my-2 my-md-0">
                                                    <div className="col-4 col-sm-2 col-xl-6 text-end">
                                                        <Link
                                                            id={`btnmp-${item?.id_proveedor}`}
                                                            to={`/main-page/master/proveedores/${item?.id_proveedor}`}
                                                            className="btn btn-outline-warning">
                                                            <img src={imgModify} className="img-mant" alt="Modificar Proveedor" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-4 col-sm-2 col-xl-6 text-end">
                                                        <Link
                                                            id={`dp-${item?.id_proveedor}`}
                                                            to="/main-page/master/proveedores"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => {
                                                                handleEliminarProveedor(`${item?.id_proveedor}`, `${item?.razon_social}`);
                                                            }}>
                                                            <img src={imgTrash} className="img-mant" alt="Eliminar Proveedor" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer-form my-3">
                    <div className="row">
                        <nav aria-label="paginacion">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link className="page-link" href="#" aria-label="Previous" onClick={() => handleCurrentPage(0, -1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                {paginas.map((item, index) => (
                                    <li key={`pag-${item.num}`} className="page-item">
                                        <Link
                                            className={`page-link ${paginaActual === index + 1 ? "active" : ""}`}
                                            onClick={() => handleCurrentPage(index + 1)}>
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <Link className="page-link" href="#" aria-label="Next" onClick={() => handleCurrentPage(0, 1)}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </section>
        </>
    );
};

export default ProveedoresList;
