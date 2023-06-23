import { useEffect, useState } from "react";
import UtilidadesCj from "../../utils/utilitarios";

const Combo = ({ id_etiqueta, modelo, nombre_actual, str_Prop_Id, str_Prop_nombre }) => {
  const [array, setArray] = useState([]);
  const [selected, setSelected] = useState(nombre_actual);
  const fnSet = (valor) => setArray(valor);

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    (async () => {
      await UtilidadesCj.getDataenArray(`http://localhost:8080/${modelo}/all`, "", fnSet);
    })();
  }, []);

  return (
    <>
      <select id={id_etiqueta} className="form-select" aria-label="selección" aria-labelledby="al_combo" value={selected} onChange={changeHandler}>
        {array.map((it) => (
          <option id={it[str_Prop_Id]} key={`it-${it[str_Prop_Id]}-${modelo}`} value={it[str_Prop_nombre]}>
            {it[str_Prop_nombre]}
          </option>
        ))}
      </select>
    </>
  );
};

export default Combo;
