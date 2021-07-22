import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import { getBreeds, ordering, filterByTemperaments, getTemperaments, filterByBDAPI } from '../../../redux/actions/index';
import { connect, useDispatch } from 'react-redux';

import style from './Container.module.css';

function Container(props) {

  const [selectedTemp, setSelectedTemp] = useState('');
  const [arrayTemps, setArrayTemps] = useState([]);


  //=============PAGINATION=============

  const [page, setPage] = useState(0);
 
  const next_Page = () => {
    if (props.current.length <= page + 8) {
      setPage(page);
    } else{ 
      setPage(page + 8);
    }
  };
  const prev_Page = () => {
    if (page < 7) {
      setPage(0);
    } else {
      setPage(page - 8);
    }
  };
  const first_Page = () => {
    setPage(0);
  };

  useEffect(() => {
    first_Page();
  }, []);

  const current = props.current.slice(page, page + 8)



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
  const [selectedBDAPI, setSelectedBDAPI] = useState('API');
  const dispatch = useDispatch();

  function handleChange(e) {
    if (e.target.value === 'name' || e.target.value === 'weight') {
      setSelectedCat(e.target.value);
    } else {
      setSelectedOrd(e.target.value);
    }
  }

  function handleChangeBDAPI(e) {
      setSelectedBDAPI(e.target.value);

  }

  function handlesubmit(e) {
    e.preventDefault();
    dispatch(ordering(selectedOrd, selectedCat));
  }
  function handlesubmitBDAPI(e) {
    e.preventDefault();
    if(selectedBDAPI === 'ALL'){
      dispatch(getBreeds())
    }
    dispatch(filterByBDAPI(selectedBDAPI));
  }

  const handleClick = (e, empty) => {
    let filtered = [];

    if (arrayTemps.length === 0) {
        dispatch(filterByTemperaments([]));
        return
    }

    if (!empty) {
      current.forEach((b) => {
            let temps = b.temperament?.map(t => t.name); 
            for (let i = 0; i < arrayTemps.length; i++) {
                if (!temps.includes(arrayTemps[i])) {
                    return
                }
            }
            filtered.push(b);
        })

        if (filtered.length === 0) {
          console.log('no results');
        }

    } else {
        setArrayTemps([])
        props.getBreeds()
    }

    dispatch(filterByTemperaments(filtered)); 
}

  const handleChangeTemp = (e) => {
    setSelectedTemp(e.target.value);

    if (e.target.value) {
        if (!arrayTemps.includes(e.target.value)) {
            setArrayTemps(
                [...arrayTemps, e.target.value] 
            )

            dispatch(filterByTemperaments(e.target.value));
        }
    }

};

return (
    <div>
<h1>Filter</h1>

<div className='filter-container'>
    <select onChange={handleChangeTemp} name="temperaments" value={selectedTemp}  >
        <option value=''>Select temperaments</option>
        {
           props.temperaments?.map((t, index) => (

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


      <form onSubmit={handlesubmitBDAPI}>
        <h1>Ordering Breed BD/API</h1>
        <div>
          <select onChange={handleChangeBDAPI} value={selectedBDAPI} name='filDBAPI'>
          <option value='ALL'>ALL</option>
            <option value='BD'>BD</option>
            <option value='API'>API</option>
            
          </select>

          <button type='submit'>order</button>
        </div>
      </form>

      <div className={style.container}>
        <button className={style.button} onClick={prev_Page}>
          Back
        </button>

        <button className={style.button} onClick={next_Page}>
          Next
        </button>
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
