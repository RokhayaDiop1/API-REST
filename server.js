
require('dotenv').config();
const Utilisateur = require('./models');
const authRoutes = require('./routes/auth.routes');
const verifierToken = require('./middlewares/auth.middleware');
const tacheRoutes = require('./routes/tache.routes');

const express = require('express');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Mon API fonctionne !'
  });
});


app.get('/api/profil', verifierToken, (req, res) => {
  res.json({
    message: 'Accès autorisé !',
    utilisateur: req.utilisateur
  });
});

app.use('/api/taches', tacheRoutes);

const PORT = process.env.PORT || 5000;
async function demarrerServeur() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à PostgreSQL réussie !');

    await sequelize.sync();
    console.log('Tables synchronisées !');

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur :', error.message);
  }
}


demarrerServeur();

