import React from "react";

const Login = () => {
  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center mb-4">Ingreso al Sistema</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="txtUserName" className="form-label">
                  Nombre de usuario:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtUserName"
                  placeholder="Ingrese su nombre de usuario"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtPassword" className="form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="txtPassword"
                  placeholder="Ingrese su contraseña"
                />
              </div>
              <div className="text-center mb-3">
                <a href="#" className="text-decoration-none">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
