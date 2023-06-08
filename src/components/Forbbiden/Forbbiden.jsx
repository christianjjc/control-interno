import React from "react";
import "./Forbbiden.css";
import { Link } from "react-router-dom";

const Forbbiden = () => {
  return (
    <>
      <div className="container-forbbiden">
        <div className="forbidden-card">
          <h1>403 Forbidden</h1>
          <p>No tienes permiso para acceder a este recurso.</p>
          <Link to={"/"} className="btn btn-primary">
            Volver
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forbbiden;
