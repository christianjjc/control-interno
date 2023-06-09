import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState([]);
  let mensajeError = "";

  const handleLogin = async () => {
    let data = JSON.stringify({
      nombre_usuario: document.getElementById("txtUserName").value,
      pass_usuario: document.getElementById("txtPassword").value,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios
      .request(config)
      .then((response) => {
        setUsuario(response.data);
        //setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const obtenerDatos = () => {};

  useEffect(() => {
    if (usuario.length > 0) {
      navigate("/main-menu");
    } else {
      console.log("no encontrado");
    }
  }, [navigate, usuario]);

  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center mb-4">Ingreso al Sistema</h3>
            <div className="mb-3">
              <label htmlFor="txtUserName" className="form-label">
                Nombre de usuario:
              </label>
              <input type="text" className="form-control" id="txtUserName" placeholder="Ingrese su nombre de usuario" />
            </div>
            <div className="mb-3">
              <label htmlFor="txtPassword" className="form-label">
                Contraseña:
              </label>
              <input type="password" className="form-control" id="txtPassword" placeholder="Ingrese su contraseña" />
            </div>
            <div className="text-center mb-3">
              <a href="#" className="text-decoration-none">
                ¿Olvidaste la contraseña?
              </a>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Ingresar
              </button>
            </div>
            <div className="text-center">{mensajeError}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
