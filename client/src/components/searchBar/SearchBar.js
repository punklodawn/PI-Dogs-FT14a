import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBreedsSearch } from '../../redux/actions/index';
import style from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getBreedsSearch(name));
  }

  return (
    <form className={style.SearchButton} onSubmit={(e) => handleSubmit(e)}>

        <input
          className={style.inputSerach}
          type='text'
          value={name}
          onChange={(e) => handleChange(e)}
          required
        ></input>

      <button type='submit' className={style.searchSubmitButton}>
        Search
      </button>
    </form>
  );
}
