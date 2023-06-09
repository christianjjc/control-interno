import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context.js";

const SectionOne = ({ children }) => {
    const navigate = useNavigate();
    const usrCtx = useContext(UserContext);
    useEffect(() => {
        if (usrCtx.usuario.length > 0) {
        } else {
            navigate("/");
        }
    }, [usrCtx]);

    return (
        <>
            <section>{children}</section>
        </>
    );
};

export default SectionOne;
