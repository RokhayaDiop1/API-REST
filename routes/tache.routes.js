
const express = require('express');
const router = express.Router();

const verifierToken = require('../middlewares/auth.middleware');

const {
  creerTache,
  listerTaches,
  obtenirTache,
  modifierTache,
  supprimerTache
} = require('../controllers/tache.controller');

router.post('/', verifierToken, creerTache);
router.get('/', verifierToken, listerTaches);
router.get('/:id', verifierToken, obtenirTache);
router.put('/:id', verifierToken, modifierTache);
router.delete('/:id', verifierToken, supprimerTache);

module.exports = router;
