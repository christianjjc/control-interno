import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import { Link, useParams, useNavigate } from "react-router-dom";
import imgTrash from "../../icons/trash3.svg";

const RolesMant = () => {
  const URL_API_ROLES = "http://localhost:8080/roles/";
  const [rol, setRol] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fnSetRol = (valor) => setRol(valor);

  const handleSaveRol = async () => {
    let verbo = "";
    const nombre_rol = document.getElementById("txtnombrerol").value;
    const desc_rol = document.getElementById("txtdescrol").value;
    const level = document.getElementById("txtlevel").value;

    let rolGuardar = {
      nombre_rol: nombre_rol,
      desc_rol: desc_rol,
      level: level,
    };

    try {
      if (id === "new") {
        verbo = "POST";
      } else {
        verbo = "PUT";
        rolGuardar = {
          id_rol: id,
          ...rolGuardar,
        };
      }
      UtilidadesCj.spinnerTF(true);
      const result = await UtilidadesCj.obtenerDatosAxios(URL_API_ROLES, verbo, rolGuardar);
      if (!result.error) {
        alert("Registro guardado con éxito.");
        if (id === "new") {
          navigate(`/main-page/master/roles/${result?.id_rol}`);
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

  const handleEliminarRol = async (id, nombre) => {
    if (id != "new") {
      const eliminado = await UtilidadesCj.fnEliminaItem(id, nombre, URL_API_ROLES, () => {});
      eliminado && navigate("/main-page/master/roles/");
    }
  };

  useEffect(() => {
    UtilidadesCj.getDataOne(URL_API_ROLES, id, fnSetRol);
  }, []);

  return (
    <section id="mantRoles" className="bg-light contenedor-seccion">
      <header className="row my-3">
        <div className="col text-center">
          <h1>Mtto. de Roles</h1>
        </div>
      </header>

      {rol.map((item, index) => (
        <section key={`rol-mant-${item?.id_rol}-${index}`}>
          <div className="row my-3 px-4">
            <div className="col">
              <div className="row d-flex flex-sm-wrap my-3">
                <div className="col-12 col-md-4 fw-bold">
                  <label htmlFor="txtnombrerol" className="form-label">
                    Nombre:
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    id="txtnombrerol"
                    className="form-control"
                    type="text"
                    placeholder="Nombre"
                    aria-label="txtnombrerol"
                    defaultValue={item?.nombre_rol}
                  />
                </div>
              </div>
              <div className="row d-flex flex-sm-wrap mb-3">
                <div className="col-12 col-md-4 fw-bold">
                  <label htmlFor="txtdescrol" className="form-label">
                    Descripción:
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    id="txtdescrol"
                    className="form-control"
                    type="text"
                    placeholder="Descripción"
                    aria-label="txtdescrol"
                    defaultValue={item?.desc_rol}
                  />
                </div>
              </div>
              <div className="row d-flex flex-sm-wrap mb-3">
                <div className="col-12 col-md-4 fw-bold">
                  <label htmlFor="txtlevel" className="form-label">
                    Level:
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    id="txtlevel"
                    className="form-control"
                    type="text"
                    placeholder="Nivel de Permisos: 0, 1, 2, 3"
                    aria-label="txtlevel"
                    defaultValue={item?.level}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-12 d-flex flex-wrap justify-content-center">
              <Link className="btn btn-secondary me-1 mb-2" onClick={handleSaveRol}>
                Guardar
              </Link>
              <Link
                id={`dp-${item?.id_rol}`}
                className="btn btn-danger mx-1 mb-2"
                onClick={() => {
                  handleEliminarRol(`${item?.id_rol}`, `${item?.nombre_rol}`);
                }}>
                Eliminar
                <img src={imgTrash} className="img-mant ms-2" alt="Eliminar Rol" />
              </Link>
              <Link className="btn btn-secondary mx-1 mb-2">Imprimir</Link>
              <Link className="btn btn-warning ms-1 mb-2" to="/main-page/master/roles">
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

export default RolesMant;
