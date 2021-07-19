import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { getBreeds } from "../../../redux/actions/index";
import { connect } from "react-redux";
import style from "./Container.module.css";

function Container(props) {
  const [numeroPagina, setPagina] = useState(1);
//   const [loading, setLoading] = useState(false);

  const grupo = 8;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;
  const current = props.current.slice(conteoInicial, conteoFinal);
  console.log(current)

  useEffect(() => {
    props.getBreeds();
  }, []);



  function orderasc() {
    current.sort((a, b) => {
      const aa = a.name.toLowerCase();
      const bb = b.name.toLowerCase();
      setFil("");
      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    });
    console.log(current);
  }
  function orderdesc() {
    current.sort((a, b) => {
      const aa = a.name.toLowerCase();
      const bb = b.name.toLowerCase();
      setFil("");
      if (aa > bb) {
        return -1;
      }
      if (aa < bb) {
        return 1;
      }
      return 0;
    });
    console.log(current);
  }


  const [fil, setFil] = useState("");


  return (
    <div>
      <div className={style.paginationBtns}>
        <button className="button" onClick={() => setPagina(numeroPagina - 1)}>
          Anterior
        </button>
        <button className="button">{numeroPagina}</button>
        <button className="button" onClick={() => setPagina(numeroPagina + 1)}>
          Siguiente
        </button>
      </div>

      <div value="order" className={style.order}>
            <label>
              <h3>Order</h3>
            </label>
            <button onClick={orderasc}>Ascendent</button>
            <button onClick={orderdesc}>Desendent</button>
          </div>

            
      <div className={style.containerCard}>
        {current.map((current, index) => (
          <Card
            key={index}
            id={current.id}
            image={current.image}
            name={current.name}
            temperament={current.temperament}
            temperaments={current.temperaments?.map((obj) => {
              return `${obj.name} ,  `
            })}
          />
        ))}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreeds: () => dispatch(getBreeds()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);

