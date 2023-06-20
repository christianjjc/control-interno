import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import imgTrash from "../../icons/trash3.svg";
import imgModify from "../../icons/modify-ico.png";
import { Link } from "react-router-dom";
import "./Roles.css";

const RolesList = () => {
  const URL_API_ROLES = "http://localhost:8080/roles/";
  const LISTA_MAX_REGS = 20;
  const [listaRoles, setListaRoles] = useState([]);
  const [rolEliminado, setrolEliminado] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const fnSetEliminado = (valor) => setrolEliminado(valor);
  const fnSetPaginas = (valor) => setPaginas(valor);
  const fnSetListaRoles = (valor) => setListaRoles(valor);
  const fnSetPaginaActual = (valor) => {
    setPaginaActual(valor);
  };

  const handleBuscaRol = () => {
    const valorBuscado = document.getElementById("txtbuscarrol").value;
    UtilidadesCj.getDataAll(valorBuscado, URL_API_ROLES, LISTA_MAX_REGS, paginaActual, fnSetPaginas, fnSetListaRoles);
  };

  const handleEliminarRol = async (id, nombre, event) => {
    !UtilidadesCj.fnEliminaItem(id, nombre, URL_API_ROLES, fnSetEliminado) && event.preventDefault();
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
    handleBuscaRol();
  }, [rolEliminado, paginaActual]);

  return (
    <>
      <section id="listaRoles" className="contenedor-seccion">
        <header className="cabecera-form my-3">
          <div className="row">
            <div className="col text-center">
              <h1>Listado de Roles</h1>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 col-lg-6 my-1">
              <div className="input-group">
                <input
                  id="txtbuscarrol"
                  type="text"
                  className="form-control my-1"
                  placeholder="Ingrese Nombre de Rol"
                  aria-label="Recipient's username"
                  aria-describedby="btnbuscarrol"
                />
                <button className="btn btn-primary my-1" type="button" id="btnbuscarrol" onClick={handleBuscaRol}>
                  Buscar
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-6 my-1">
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-4 my-1">
                  <Link className="btn btn-secondary w-100" to={`/main-page/master/roles/new`}>
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
                <div className="col-6 col-sm-3 col-xl-2 fw-bold text-center">Nombre</div>
                <div className="col-6 col-sm-4 col-xl-6 fw-bold text-center">Descripción</div>
                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Level</div>
                {/* <div className="col-6 col-sm-4 col-xl-2 fw-bold text-center">Teléfono</div> */}
                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Modificar</div>
                <div className="col-6 col-sm-4 col-xl-1 fw-bold text-center">Eliminar</div>
              </div>
              <div className="row">
                <div className="col-12">
                  {listaRoles.map((item, index) => (
                    <div className="fila_listado row" key={item?.id_rol} id={item?.id_rol}>
                      <div className="col-1 fw-bold  text-center">{index + 1 + (paginaActual - 1) * LISTA_MAX_REGS}</div>
                      <div className="col-11 col-xl-2">{item?.nombre_rol}</div>
                      <div className="col-12 col-xl-6 flex-grow-1">{item?.desc_rol}</div>
                      <div className="col-4 col-xl-1 flex-grow-1">{item?.level}</div>
                      {/* <div className="col-12 col-xl-2 text-center">{item?.telefono}</div> */}
                      <div className="col-8 col-xl-2">
                        <div className="row d-flex justify-content-end justify-content-xl-center my-2 my-md-0">
                          <div className="col-4 col-sm-2 col-xl-6 text-end">
                            <Link id={`btnmr-${item?.id_rol}`} to={`/main-page/master/roles/${item?.id_rol}`} className="btn btn-outline-warning">
                              <img src={imgModify} className="img-mant" alt="Modificar Proveedor" />
                            </Link>
                          </div>
                          <div className="col-4 col-sm-2 col-xl-6 text-end">
                            <Link
                              id={`btndr-${item?.id_rol}`}
                              to="/main-page/master/roles"
                              className="btn btn-outline-danger"
                              onClick={() => {
                                handleEliminarRol(`${item?.id_rol}`, `${item?.nombre_rol}`);
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
