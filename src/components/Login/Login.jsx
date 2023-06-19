import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UtilidadesCj from "../../utils/utilitarios.js";
import UserContext from "../../context/user-context.js";

const Login = () => {
    const navigate = useNavigate();
    const usrCtx = useContext(UserContext);

    const handleLogin = async () => {
        try {
            let data = {
                nombre_usuario: document.getElementById("txtUserName").value,
                pass_usuario: document.getElementById("txtPassword").value,
            };
            UtilidadesCj.spinnerTF(true);
            const result = await UtilidadesCj.obtenerDatosAxios("http://localhost:8080/", "post", data);
            if (result.length > 0) {
                usrCtx.setUsuario(result);
            } else {
                document.getElementById("txtMensajeError").classList.remove("d-none");
                ocultaMensaje();
            }
            UtilidadesCj.spinnerTF(false);
        } catch (error) {
            UtilidadesCj.spinnerTF(false);
            throw new Error("Error:" + error);
        }
    };

    const ocultaMensaje = () => {
        setTimeout(() => {
            document.getElementById("txtMensajeError").classList.add("d-none");
        }, 5 * 1000);
    };

    useEffect(() => {
        if (usrCtx.usuario.length > 0) {
            navigate("/main-page/master");
        }
    }, [navigate, usrCtx]);

    return (
        <>
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
                        <Link className="text-decoration-none">¿Olvidaste la contraseña?</Link>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Ingresar
                        </button>
                    </div>
                    <div className="alert alert-warning d-none my-2" role="alert" id="txtMensajeError">
                        Los datos ingresados no son correctos
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
