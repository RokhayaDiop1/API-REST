
const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token manquant. Connectez-vous.'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.utilisateur = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token invalide ou expiré'
    });
  }
};

module.exports = verifierToken;
