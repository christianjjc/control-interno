import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";
import { Link, useParams, useNavigate } from "react-router-dom";
import imgTrash from "../../icons/trash3.svg";

const ProveedoresMant = () => {
  const modelo = "proveedores";
  const URL_API = `http://localhost:8080/${modelo}/`;
  const [registro, setRegistro] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fnSetRegistro = (valor) => setRegistro(valor);

  const handleSaveRegistro = async () => {
    let verbo = "";

    let registroGuardar = {
      ruc: document.getElementById("txtruc").value,
      razon_social: document.getElementById("txtrazonsocial").value,
      direccion: document.getElementById("txtdireccion").value,
      telefono: document.getElementById("txttelefono").value,
      que_vende: document.getElementById("txtque_vende").value,
    };

    try {
      if (id === "new") {
        verbo = "POST";
      } else {
        verbo = "PUT";
        registroGuardar = {
          id_proveedor: id,
          ...registroGuardar,
        };
      }
      UtilidadesCj.spinnerTF(true);
      const result = await UtilidadesCj.obtenerDatosAxios(URL_API, verbo, registroGuardar);
      if (!result.error) {
        alert("Registro guardado con éxito.");
        if (id === "new") {
          navigate(`/main-page/master/${modelo}/${result?.id_proveedor}`);
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
        <section key={`reg-mant-${item?.id_proveedor}-${index}`}>
          <div className="row my-3 px-4">
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
                  <input id="txtruc" className="form-control" type="text" placeholder="Número de Ruc" aria-label="txtruc" defaultValue={item?.ruc} />
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

          <div className="row my-3">
            <div className="col-12 d-flex flex-wrap justify-content-center">
              <Link className="btn btn-secondary me-1 mb-2" onClick={handleSaveRegistro}>
                Guardar
              </Link>
              <Link
                id={`dp-${item?.id_proveedor}`}
                className="btn btn-danger mx-1 mb-2"
                onClick={() => {
                  handleEliminar(`${item?.id_proveedor}`, `${item?.razon_social}`);
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

export default ProveedoresMant;
