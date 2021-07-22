const { Router } = require('express');
const router = Router();
const { Dog } = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/dog', async (req, res) => {
	const { name, height, weight, life_span, image, temperament } = req.body;
	try {
        if (temperament.length === 0) {
            return res.sendStatus(500,"No found temperaments");
        }

        let newBreed = await Dog.create({
            id: uuidv4(),
			name,
			height,
			weight,
			life_span,
			image,
			mine: false,
		});
		await newBreed.addTemperament(temperament);
		res.json(newBreed);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;