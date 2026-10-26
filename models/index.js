
const Utilisateur = require('./utilisateur.model');
const Tache = require('./tache.model');

Utilisateur.hasMany(Tache, {
  foreignKey: 'utilisateurId',
  as: 'taches',
  onDelete: 'CASCADE'
});

Tache.belongsTo(Utilisateur, {
  foreignKey: 'utilisateurId',
  as: 'utilisateur'
});

module.exports = {
  Utilisateur,
  Tache
};
