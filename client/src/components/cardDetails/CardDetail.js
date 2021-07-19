import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getBreedDetails } from '../../redux/actions/index'
import style from './CardDetail.module.css'

export default function CardDetails(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const {breedDetails} = useSelector((state)=>state)

    useEffect(()=>{
        dispatch(getBreedDetails(id))
    }, [dispatch, id])



    return (
        <div className={style.containerCards}>
            <div className={style.card}>
                <img className={style.image}
                src={breedDetails.image_id}
                src={breedDetails.image}
                alt='img-breed'></img>

                <h1 className={style.name}>{breedDetails.name}</h1>
                <p className={style.p}>
                    <span className={style.span}> height : </span>{breedDetails.height}
                </p>

                <p className={style.p}>
                    <span className={style.span}> weight : </span>{" "}{breedDetails.weight}</p>

                <p className={style.p}>
                    <span className={style.span}> life_span : </span>{""}{breedDetails.life_span}
                </p>

                <p className={style.p}>
                    <span className={style.span}> temperament : </span>{""}{breedDetails.temperament}
                </p>

                <div className={style.temperaments}>
                    <b>temperament: </b>
                    <div className={style.containertemperament}>
                        {breedDetails.temperaments?.length > 0 ?(
                            breedDetails.temperaments.map((temperament, id,index)=>(
                                <div key={index}>
                                    <p className={style.p}>
                                        {id}.{temperament.name}
                                    </p>

                                </div>

                            ))
                        ):(
                            <p className={style.p}> Not Have Temperament</p>
                        )}
                    </div>
                </div>
                <Link to='/dogs'>
                    <button className={style.button} onClick='window.location.refresh=true'>
                        BACK
                    </button>
                </Link>

                <Link to='/recipe/addbreed'>
                    <input className={style.button} type='button' value='ADD BREED'>
                    </input>
                </Link>
            </div>
        </div>
    )
}
