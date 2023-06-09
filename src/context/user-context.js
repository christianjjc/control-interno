import { createContext, useState } from "react";

const UserContext = createContext({
    usuario: [],
    setUsuario: () => {},
});

export default UserContext;

export const UsuarioContextProvider = ({ children }) => {
    const [usuarioLogged, setUsuarioLogged] = useState([]);
    const setUsuario = (usuario) => {
        setUsuarioLogged(usuario);
    };
    return (
        <UserContext.Provider
            value={{
                usuario: usuarioLogged,
                setUsuario,
            }}>
            {children}
        </UserContext.Provider>
    );
};
