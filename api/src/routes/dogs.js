const { Router } = require('express');
const { URL_APIKEY } = process.env;
const router = Router();
const axios = require('axios');
const { Dog, Temperament } = require('../db');

router.get('/dogs', async (req, res) => {
  try {
    let { name } = req.query;
    let queryApi = await axios.get(`${URL_APIKEY}`);
    let queryDB = await Dog.findAll({
      include: { model: Temperament },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    let dogs = queryApi.data.map((obj) => {
      return {
        image: obj.image,
        name: obj.name,
        temperament: obj.temperament,
      };
    });

    let arrayDogs = queryDB.concat(dogs);

    if (!name) {
      res.json(arrayDogs);
    } else {
      let filtred = arrayDogs.filter((obj) =>
        obj.name.toLowerCase().includes(name.toLowerCase())
      );

      let result = filtred.map((obj) => {
        return {
          image: obj.image.url,
          name: obj.name,
          temperament: obj.temperament,
          temperaments: obj.temperaments,
        };
      });

      if (filtred.length === 0) {
        res.json({ message: 'Dog not exist' });
      } else {
        res.json(result);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/dogs/:id', async (req, res) => {
  let { id } = req.params;
  idValid = id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

  if(idValid === null){
    try {
        let queryAPI = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
        console.log(queryAPI.data);
  
        const objeto = {
          image: queryAPI.data.image,
          name: queryAPI.data.name,
          temperament: queryAPI.data.temperament,
          height: queryAPI.data.height,
          weight: queryAPI.data.weight,
          life_span: queryAPI.data.life_span,
        };
  
        if (queryAPI) return res.json(objeto);
      } catch (err) {
        return res.json('ID NOT FOUND');
      }
  }else{
    let queryDB = await Dog.findByPk(id,{
        include: { model: Temperament },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      return res.json(queryDB)
}
});

module.exports = router;
