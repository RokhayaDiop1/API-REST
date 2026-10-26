
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/utilisateur.model');


exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email et mot de passe obligatoires'
      });
    }

    const utilisateurExistant = await Utilisateur.findOne({
      where: { email }
    });

    if (utilisateurExistant) {
      return res.status(409).json({
        message: 'Cet email est déjà utilisé'
      });
    }

    const motDePasseHache = await bcrypt.hash(password, 10);

    const nouvelUtilisateur = await Utilisateur.create({
      email,
      password: motDePasseHache
    });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      utilisateur: {
        id: nouvelUtilisateur.id,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erreur lors de la création du compte'
    });
  }
};



const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email et mot de passe obligatoires'
      });
    }

    const utilisateur = await Utilisateur.findOne({
      where: { email }
    });

    if (!utilisateur) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    const motDePasseValide = await bcrypt.compare(
      password,
      utilisateur.password
    );

    if (!motDePasseValide) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    const token = jwt.sign(
      {
        id: utilisateur.id,
        role: utilisateur.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Connexion réussie',
      token,
      utilisateur: {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erreur lors de la connexion'
    });
  }
};
