import { useContext, useEffect, useState } from "react";
import VMainMenu from "../VMainMenu/VMainMenu";
import UserContext from "../../context/user-context";

const MainPage = ({ children }) => {
    const usrCtx = useContext(UserContext);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        const asignaUsuario = () => {
            setUsuario(usrCtx.usuario[0]);
        };
        asignaUsuario();
    }, [usrCtx]);
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row my-3">
                        <div className="col-3">
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasMainMenu"
                                aria-controls="offcanvasMainMenu">
                                Menú Principal
                            </button>
                        </div>
                        <div className="col-6">{`Bienvenido(a): ${usuario ? usuario.nombre_usuario : "anonimo"} `}</div>
                        <div className="col-3">{`Rol: ${usuario ? usuario.nombre_rol : "anonimo"}`} </div>
                    </div>
                    <div className="row h-100 bg-white">
                        <div className="col">{children}</div>
                    </div>
                </div>
            </div>
            <VMainMenu />
        </>
    );
};

export default MainPage;
