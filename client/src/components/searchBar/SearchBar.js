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
          placeholder="SEARCH"
          onChange={(e) => handleChange(e)}
          required
        ></input>

        <label for="name" class={style.label}>Search Name</label>

    </form>
  );
}
