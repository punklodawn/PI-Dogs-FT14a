import React from 'react'
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage () {
    return (
        <div >
            <section className={style.grid}>
            <div className={style.grid_texts}>
                <h2 className={style.grid_title}>
                    PI
                </h2>
                <h2 className={style.grid_title}>
                    DOGS
                </h2>
                <Link className={style.button} to="/dogs">ENTRAR</Link>
            </div>
            
            </section>
           
        </div>
    )
}
