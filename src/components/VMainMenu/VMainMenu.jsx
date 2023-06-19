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

    useEffect(() => {
        cargaMenuVertical();
    }, [usuario]);

    return (
        <>
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
                            usrCtx.setUsuario([]);
                        }}>
                        Salir
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default VMainMenu;
