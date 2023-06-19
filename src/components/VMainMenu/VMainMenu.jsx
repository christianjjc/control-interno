import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";

const VMainMenu = () => {
    const usrCtx = useContext(UserContext);
    const [usuario, setUsuario] = useState([]);
    const navigate = useNavigate();

    const cargaMenuVertical = () => {
        try {
            setUsuario(usrCtx.usuario[0]);
            switch (usuario.level) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    document.getElementById("VMenuMaestros").remove();
                    break;
                default:
                    break;
            }
        } catch (error) {
            navigate("/");
            //throw new Error("Error Nuevo", error);
            console.error("error VMainMenu:", error);
        }
    };

    const handleLogOut = () => {
        usrCtx.setUsuario([]);
    };

    useEffect(() => {
        cargaMenuVertical();
    }, [usuario]);

    return (
        <>
            <div
                className="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasMainMenu"
                aria-labelledby="offcanvasExampleLabel"
                data-bs-dismiss="offcanvas">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        Menú Principal
                    </h5>
                </div>
                <div className="offcanvas-body">
                    <div className="dropdown mt-3">
                        <ul id="VMenuMaestros">
                            <li>
                                Maestros
                                <ul>
                                    <li>
                                        <Link className="VMenuLink" to={"/main-page/master/proveedores/"}>
                                            Proveedores
                                        </Link>
                                    </li>
                                    <li>Usuarios</li>
                                    <li>Roles</li>
                                    <li>Almacenes</li>
                                    <li>
                                        Recursos
                                        <ul>
                                            <li>Productos</li>
                                            <li>Categorías</li>
                                            <li>Und. Medida</li>
                                        </ul>
                                    </li>

                                    <li>
                                        Mano de Obra
                                        <ul>
                                            <li>Personal</li>
                                            <li>Categorias</li>
                                            <li>Ocupaciones</li>
                                            <li>SST</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Infraestructura
                                        <ul>
                                            <li>Equipos</li>
                                            <li>Grupos</li>
                                            <li>Tipos</li>
                                            <li>Tratos</li>
                                        </ul>
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                        <ul id="VMenuOperaciones">
                            <li>
                                Operaciones
                                <ul>
                                    <li>PD MO</li>
                                    <li>PD Máquinas</li>
                                    <li>Inventarios</li>
                                </ul>
                            </li>
                            <li>Reportes</li>
                            <li>Calculos</li>
                            <li>
                                <Link
                                    className="VMenuLink"
                                    to="/"
                                    onClick={() => {
                                        handleLogOut();
                                    }}>
                                    Salir
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VMainMenu;
