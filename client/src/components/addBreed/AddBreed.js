import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getHome} from '../../redux/actions/index'
import style from './AddBreed.module.css'

export default function AddRecipe ()  {
    const dispatch = useDispatch()
    // const [temperament, setTemperament] = useState([])

    const [data,setData]= useState([])

    const [input,setInput]= useState({
        name:'',
        height:'',
        weight:'',
        life_span:'',
        image:'',

    })

    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }


    let temperament=[]

    let prueba = (e)=>{

        temperament.push(e.target.value)
        console.log (temperament)
       
        
    }
    async function handleSubmit(e){
        e.preventDefault()

        try{
            
            let {name, height, weight, life_span, image}= input
           
            let body = {name, height, weight, life_span, image, temperament}
            await fetch('http://localhost:3001/dog',{
                method: 'POST',
                headers : {'Content-Type':'application/json'},
                body: JSON.stringify(body),
            })
        }catch(error){
            console.error(error.message)
        }

        setInput({
            name:'',
            height:'',
            weight:'',
            life_span:'',
            image:'',
        })
        alert('Your Breed succesfully')
    }

    const dataJson = async ()=>{
        try{
            const response = await fetch('http://localhost:3001/temperament')
            const jsonData = await response.json()
            setData(jsonData)
        }catch(error){
            console.error(error.message)
        }
    }

    useEffect(()=>{
        dataJson()
    },[])

    function handleClickHome(){
        dispatch(getHome())
    }
    return (
        <form className={style.form} onSubmit={(e)=> handleSubmit(e)}>

            <h1 className={style.tittle}>ADD BREEED</h1>

            {/* <div className={style.containerInput}> */}
            <input className={style.formEntry}
            type='text'
            name='name'
            autoComplete='false'
            placeholder='Breed'
            onChange={handleInputChange}
            value={input.name}
            required
            >
            </input>

            <input className={style.formEntry}
            type='number'
            name='height'
            step='0'
            min='15'
            max='104'
            placeholder='height'
            onChange={handleInputChange}
            value={input.height}
            required
            >
            </input>

            <input className={style.formEntry}
            type='number'
            name='weight'
            step='0'
            min='2'
            max='110'
            placeholder='weight'
            onChange={handleInputChange}
            value={input.weight}
            required
            >
            </input>

            <input className={style.formEntry}
            type='number'
            name='life_span'
            step='0'
            min='1'
            max='20'
            placeholder='life_span'
            onChange={handleInputChange}
            value={input.life_span}
            required
            >
            </input>

            <input className={style.formEntry}
            type='text'
            name='image'
            placeholder='image'
            onChange={handleInputChange}
            value={input.image}
            required
            >
            </input>

            {/* </div> */}

            <label className={style.secondaryTittle}>Select TEMPS: </label>
            <select className={style.formEntry2}
            name='temperament'
            id='temperament'
            multiple
            requires>

            {data.map((d,index) =>{
                return(
                    <option key={index} value={index+1} onClick={prueba}> {d.name}</option>
                )
            }
            )}
            </select>

            <div className={style.buttons}>
                <div>
                    <input className={style.submit} type='submit' value='add breed'></input>
                </div>
                <Link to='/dogs'>
                    <button className={style.submit} onClick={(e)=> handleClickHome(e)}>Back</button>
                </Link>
            </div>
        </form>
    )
}
