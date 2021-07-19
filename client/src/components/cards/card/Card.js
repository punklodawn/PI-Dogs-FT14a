import React from 'react'
import {Link} from 'react-router-dom'
import style from './Card.module.css'

export default function Card ({name, image, temperament, temperaments, id}) {
    return (
        <div className={style.card}>
            <img className={style.image} src={image} alt={` Breeds-${name} `}></img>

            <div className={style.content}>
                <h1 className={style.name}>{name}</h1>
                <h4><u>Temperaments:</u></h4>
                <p className={style.temperament}>{temperament}</p>
                <p className={style.temperament}>{temperaments}</p>

                <Link to={`/dogs/${id}`}>
                    <button className={style.button}>DETAILS</button>    
                </Link>                
            </div>
        </div>
    )
}