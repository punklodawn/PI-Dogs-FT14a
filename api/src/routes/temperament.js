const { Router } = require('express');
const router = Router();
const { Temperament } = require('../db');
const axios =require('axios');
const e = require('express');

router.get('/temperament', async (req, res) => {
	try {
        let temperament = await Temperament.findAll();

        if(temperament.length === 0){
            let queryApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=917170fc-bddd-40d3-9e11-1fee60f4a052`)
            let da = queryApi.data;
            
            for (let i = 0; i < da.length; i++) {
                let element = da[i].temperament?.split(", ")
                
                for (let j = 0; j < element?.length; j++) {
                    console.log(element[j]);
                    await Temperament.findOrCreate({attributes: { exclude: ["createdAt", "updatedAt"] },
                     where: { name: element[j] } })
         }
        }
        res.json(temperament);
    }else{
        res.json(temperament);
    }


} catch (error) {
    res.status(500).json(error);
}

});
        // let queryApi = await axios.get(`https://api.thedogapi.com/v1/breeds`)
        // let getTemperaments = queryApi.data.map((obj) =>{
        //     return obj.temperament?.split(',')
        // })
        // console.log(getTemperaments);

        // for(let i = 0 ; i < getTemperaments.length; i++ ){
        //     await Temperament.findOrCreate({ where: { name: JSON.stringify(getTemperaments[i]) } })
        // }

      
	// } catch (error) {
	// 	res.status(500).json(error);
	// }


module.exports = router;