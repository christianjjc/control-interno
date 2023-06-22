import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import imgTrash from "../../icons/trash3.svg";
import imgModify from "../../icons/modify-ico.png";
import { Link } from "react-router-dom";
import "./Roles.css";

const RolesList = () => {
  const modelo = "roles";
  const URL_API = `http://localhost:8080/${modelo}/`;
  const LISTA_MAX_REGS = 20;
  const [lista, setLista] = useState([]);
  const [eliminado, setEliminado] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const fnSetEliminado = (valor) => setEliminado(valor);
  const fnSetPaginas = (valor) => setPaginas(valor);
  const fnSetLista = (valor) => setLista(valor);

  const handleBuscar = () => {
    const valorBuscado = document.getElementById("txtbuscar").value;
    UtilidadesCj.getDataAll(valorBuscado, URL_API, LISTA_MAX_REGS, paginaActual, fnSetPaginas, fnSetLista);
  };

  const handleEliminar = async (id, nombre, event) => {
    !UtilidadesCj.fnEliminaItem(id, nombre, URL_API, fnSetEliminado) && event.preventDefault();
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
    handleBuscar();
  }, [eliminado, paginaActual]);

  return (
    <>
      <section id="lista" className="contenedor-seccion">
        <header className="my-3">
          <div className="row">
            <div className="col text-center">
              <h1>{`Listado de ${UtilidadesCj.primeraLetaMayus(modelo)}`}</h1>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 col-lg-6 my-1">
              <div className="input-group">
                <input
                  id="txtbuscar"
                  type="text"
                  className="form-control my-1"
                  placeholder="Ingrese Nombre de Rol"
                  aria-label="Recipient's username"
                  aria-describedby="btnbuscar"
                />
                <button className="btn btn-primary my-1" type="button" id="btnbuscar" onClick={handleBuscar}>
                  Buscar
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-6 my-1">
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-4 my-1">
                  <Link className="btn btn-secondary w-100" to={`/main-page/master/${modelo}/new`}>
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
        <section className="my-3">
          <div className="row">
            <div className="col-12">
              <div className="row border-bottom py-3 my-1">
                <div className="col-12 col-sm-1 fw-bold text-center">#</div>
                <div className="col-6 col-sm-3 col-xl-2 fw-bold text-center">Nombre</div>
                <div className="col-6 col-sm-4 col-xl-6 fw-bold text-center">Descripción</div>
                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Level</div>
                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Modificar</div>
                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Eliminar</div>
              </div>
              <div className="row">
                <div className="col-12">
                  {lista.map((item, index) => (
                    <div className="fila_listado row" key={item?.id_rol} id={item?.id_rol}>
                      <div className="col-1 fw-bold  text-center">{index + 1 + (paginaActual - 1) * LISTA_MAX_REGS}</div>
                      <div className="col-11 col-xl-2">{item?.nombre_rol}</div>
                      <div className="col-12 col-xl-6 flex-grow-1">{item?.desc_rol}</div>
                      <div className="col-4 col-xl-1 flex-grow-1">{item?.level}</div>
                      <div className="col-8 col-xl-2">
                        <div className="row d-flex justify-content-end justify-content-xl-center my-2 my-md-0">
                          <div className="col-4 col-sm-2 col-xl-6 text-end">
                            <Link id={`btnmr-${item?.id_rol}`} to={`/main-page/master/${modelo}/${item?.id_rol}`} className="btn btn-outline-warning">
                              <img src={imgModify} className="img-mant" alt="Modificar" />
                            </Link>
                          </div>
                          <div className="col-4 col-sm-2 col-xl-6 text-end">
                            <Link
                              id={`btndr-${item?.id_rol}`}
                              to={`/main-page/master/${modelo}`}
                              className="btn btn-outline-danger"
                              onClick={() => {
                                handleEliminar(`${item?.id_rol}`, `${item?.nombre_rol}`);
                              }}>
                              <img src={imgTrash} className="img-mant" alt="Eliminar" />
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
                    <Link className={`page-link ${paginaActual === index + 1 ? "active" : ""}`} onClick={() => handleCurrentPage(index + 1)}>
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

export default RolesList;
