const express = require('express');
const UserController = require('../controller/UserController');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const authorizationTrainer = require('../middlewares/authorizationTrainer');
const PokemonController = require('../controller/PokemonController');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: `Welcome to Pokemon World Desu [Arief Rahman Rizaldhi]` })
})

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/google-login', UserController.googleLoginUser);

router.use(authentication);

router.post('/hunt', PokemonController.huntPokemon);
router.post('/shop', PokemonController.shopPokemon);
router.put('/top-up', UserController.topUpCoins);
router.post('/generate-midtrans-token', UserController.generateMidtransToken);
router.get('/pokedex', PokemonController.getMyPokemons);
router.get('/pokedex/:id', authorizationTrainer, PokemonController.getPokemonById);
router.put('/pokedex/:id', authorizationTrainer, PokemonController.updatePokemonById);
router.delete('/pokedex/:id', authorizationTrainer, PokemonController.deletePokemonById);

router.use(errorHandler);

module.exports = router;