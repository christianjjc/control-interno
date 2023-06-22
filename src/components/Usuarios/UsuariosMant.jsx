import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import { Link, useParams, useNavigate } from "react-router-dom";
import imgTrash from "../../icons/trash3.svg";

const UsuariosMant = () => {
  const modelo = "usuarios";
  const URL_API = `http://localhost:8080/${modelo}/`;
  const [registro, setRegistro] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fnSetRegistro = (valor) => setRegistro(valor);

  const handleSaveRegistro = async () => {
    let verbo = "";
    let registroGuardar = {
      nombre_usuario: document.getElementById("txtnombre").value,
      pass_usuario: document.getElementById("txtpassword").value,
      id_rol: document.getElementById("txtrol").value,
    };
    try {
      if (id === "new") {
        verbo = "POST";
      } else {
        verbo = "PUT";
        registroGuardar = {
          id_usuario: id,
          ...registroGuardar,
        };
      }
      UtilidadesCj.spinnerTF(true);
      const result = await UtilidadesCj.obtenerDatosAxios(URL_API, verbo, registroGuardar);
      if (!result.error) {
        alert("Registro guardado con éxito.");
        if (id === "new") {
          navigate(`/main-page/master/${modelo}/${result?.id_usuario}`);
        }
      } else {
        document.getElementById("txtMensajeError").classList.remove("d-none");
        UtilidadesCj.ocultaMensaje("txtMensajeError");
      }
      UtilidadesCj.spinnerTF(false);
    } catch (error) {
      UtilidadesCj.spinnerTF(false);
      console.error("Error al eliminar", error);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (id != "new") {
      const eliminado = await UtilidadesCj.fnEliminaItem(id, nombre, URL_API, () => {});
      eliminado && navigate(`/main-page/master/${modelo}/`);
    }
  };

  useEffect(() => {
    UtilidadesCj.getDataOne(URL_API, id, fnSetRegistro);
  }, []);

  return (
    <section id="mantRegistro" className="bg-light contenedor-seccion">
      <header className="row my-3">
        <div className="col text-center">
          <h1>{`Mtto. de ${UtilidadesCj.primeraLetaMayus(modelo)}`}</h1>
        </div>
      </header>

      {registro.map((item, index) => (
        <section key={`reg-mant-${item?.id_usuario}-${index}`}>
          <div className="row my-3 px-4">
            <div className="col">
              <div className="row d-flex flex-sm-wrap my-3">
                <div className="col-12 col-md-4 fw-bold">
                  <label htmlFor="txtnombre" className="form-label">
                    Nombre Usuario:
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    id="txtnombre"
                    className="form-control"
                    type="text"
                    placeholder="Nombre de Usuario"
                    aria-label="txtnombre"
                    defaultValue={item?.nombre_usuario}
                  />
                </div>
              </div>

              <div className="row d-flex flex-sm-wrap mb-3">
                <div className="col-12 col-md-4 fw-bold">
                  <label htmlFor="txtpassword" className="form-label">
                    Password:
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    id="txtpassword"
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    aria-label="txtpassword"
                    defaultValue={item?.pass_usuario}
                  />
                </div>
              </div>

              <div className="row d-flex flex-sm-wrap mb-3">
                <div className="col-12 col-md-4 fw-bold">
                  <label htmlFor="txtrol" className="form-label">
                    Rol:
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input id="txtrol" className="form-control" type="text" placeholder="Rol" aria-label="txtrol" defaultValue={item?.id_rol} />
                </div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-12 d-flex flex-wrap justify-content-center">
              <Link className="btn btn-secondary me-1 mb-2" onClick={handleSaveRegistro}>
                Guardar
              </Link>
              <Link
                id={`dp-${item?.id_usuario}`}
                className="btn btn-danger mx-1 mb-2"
                onClick={() => {
                  handleEliminar(`${item?.id_usuario}`, `${item?.nombre_usuario}`);
                }}>
                Eliminar
                <img src={imgTrash} className="img-mant ms-2" alt="Eliminar Proveedor" />
              </Link>
              <Link className="btn btn-secondary mx-1 mb-2">Imprimir</Link>
              <Link className="btn btn-warning ms-1 mb-2" to={`/main-page/master/${modelo}`}>
                Volver
              </Link>
            </div>
          </div>
          <div id="txtMensajeError" className="row justify-content-center d-none">
            <div className="col-12 col-sm-6 text-center alert alert-warning" role="alert" id="txtMensajeError">
              Ups! Hubo un problema al registrarlos datos, por favor verifique que los campos contengan un valor correcto.
            </div>
          </div>
        </section>
      ))}
    </section>
  );
};

export default UsuariosMant;
