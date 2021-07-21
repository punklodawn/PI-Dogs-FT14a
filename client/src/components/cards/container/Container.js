import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import { getBreeds, ordering, filterByTemperaments, getTemperaments } from '../../../redux/actions/index';
import { connect, useDispatch } from 'react-redux';

import style from './Container.module.css';

function Container(props) {

  const [selectedTemp, setSelectedTemp] = useState('');
  const [arrayTemps, setArrayTemps] = useState([]);
  const [showNoResult, setShowNoResult] = useState(false);

  //=============PAGINATION=============
  const [numeroPagina, setPagina] = useState(1);
  const grupo = 8;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;
  const current = props.current.slice(conteoInicial, conteoFinal);

  useEffect(() => {
      props.getBreeds()
         // eslint-disable-next-line react-hooks/exhaustive-deps

  },[])

  useEffect(() => {
    props.getTemperaments();
       // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


  //================ORDER================
  const [selectedOrd, setSelectedOrd] = useState('asc');
  const [selectedCat, setSelectedCat] = useState('name');
  const dispatch = useDispatch();

  function handleChange(e) {
    if (e.target.value === 'name' || e.target.value === 'weight') {
      setSelectedCat(e.target.value);
    } else {
      setSelectedOrd(e.target.value);
    }
  }
  function handlesubmit(e) {
    e.preventDefault();
    dispatch(ordering(selectedOrd, selectedCat));
  }


  // const [temperament, setTemperament] = useState();

  // const handleClick = (temp) => {
  //   props.filterByTemperaments(temp);
  //   setPagina(1);

  // };

  const handleClick = (e, empty) => {
    let filtered = [];
    setShowNoResult(false);

    if (arrayTemps.length === 0) {
        dispatch(filterByTemperaments([]));
        return
    }

    if (!empty) {
        current.forEach((b) => {
            let temps = b.temperament?.map(t => t.name); // ["curious", "active"]
            for (let i = 0; i < arrayTemps.length; i++) {
                if (!temps.includes(arrayTemps[i])) {
                    return
                }
            }
            filtered.push(b);
        })

        if (filtered.length === 0) {
            setShowNoResult(true);
        }

    } else {
        setArrayTemps([])
        props.getBreeds()
    }

    dispatch(filterByTemperaments(filtered)); //[{}, {}] --> action a redux
}

  const handleChangeTemp = (e) => {
    setSelectedTemp(e.target.value);

    if (e.target.value) {
        if (!arrayTemps.includes(e.target.value)) {
            setArrayTemps(
                [...arrayTemps, e.target.value] // ["Alert", "Curious"]
            )

            dispatch(filterByTemperaments(e.target.value));
        }
    }

};




  return (
    <div>
      <div className={style.paginationBtns}>
        <button className='button' onClick={() => setPagina(numeroPagina - 1)}>
          Anterior
        </button>
        <button className='button'>{numeroPagina}</button>
        <button className='button' onClick={() => setPagina(numeroPagina + 1)}>
          Siguiente
        </button>
      </div>

      {/* <div id="dietTypes">
        {current.length ? <label>Temmperament: </label> : null}
        {current.length
          ? props.temperaments.map((temp, i) => (
              <button
                className="dietBtn"
                key={`${temp}${i}`}
                onClick={() => handleClick(temp)}
              >
                {temp.toUpperCase()}
              </button>
            ))
          : null}
      </div> */}


<h1>Filter</h1>

<div className='filter-container'>
    <select onChange={handleChangeTemp} name="temperaments" value={selectedTemp}  >
        <option value=''>Select temperaments</option>
        {
           props.temperaments.map((t, index) => (

                <option value={t} key={t + index}>{t}</option>
            ))
        }
    </select>
    <div className='temp-container'>
      <div>
            {
                 arrayTemps.map((t) => (
                  <div key={t}>
                  {t}
                  {/* <button  onClick={() => deleteTemp(t)}><i className="cont"></i>X</button> */}
                  </div>
                ))
                  
            }
        </div>
    </div>
    <button className='filter-button' onClick={(e) => handleClick(e, 'empty')}>Clear filters</button>
</div>


      <form onSubmit={handlesubmit}>
        <h1>Ordering</h1>
        <div>
          <select onChange={handleChange} value={selectedCat} name='order'>
            <option value='name'>Name</option>
            <option value='weight'>Weight</option>
          </select>

          <select onChange={handleChange} name='by' value={selectedOrd}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
          <button type='submit'>order</button>
        </div>
      </form>

      <div className={style.containerCard}>
        {current.map((current, index) => (
          <Card
            key={index}
            id={current.id}
            image={current.image}
            name={current.name}
            temperament={current.temperament}
            temperaments={current.temperaments?.map((obj) => {
              return `${obj.name} ,  `;
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
    breeds: state.current,
    temperaments: state.temperaments,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreeds: () => dispatch(getBreeds()),
    filterByTemperaments: (temp) => dispatch(filterByTemperaments(temp)),
    getTemperaments: () => dispatch(getTemperaments()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
