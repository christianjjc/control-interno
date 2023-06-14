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
                <div className="col-2">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">Menú</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <VMainMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-3">{`Bienvenido(a): ${usuario ? usuario.nombre_usuario : "anonimo"} `}</div>
                        <div className="col-9">{`Rol: ${usuario ? usuario.nombre_rol : "anonimo"}`} </div>
                    </div>
                    <div className="row">
                        <div className="col">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;
