import "./Spinner.css";

const Spinner = ({ children }) => {
    return (
        <>
            {children}
            {/* ESTE ES EL HTML DEL SPINER QUE AGREGAMOS AL HTML  */}
            <div id="divSpinner" className="position-absolute spinner-container align-items-center justify-content-center">
                <div className="sk-circle">
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
                </div>
            </div>
            <div id="divOverlay" className="position-absolute"></div>
            {/* AQUI TERMINA *** */}
        </>
    );
};

export default Spinner;
