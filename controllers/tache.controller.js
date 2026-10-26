
const { Tache } = require('../models');

// CREATE : créer une tâche
exports.creerTache = async (req, res) => {
  try {
    const { titre, description } = req.body;

    if (!titre || !titre.trim()) {
      return res.status(400).json({
        message: 'Le titre est obligatoire'
      });
    }

    const tache = await Tache.create({
      titre: titre.trim(),
      description,
      utilisateurId: req.utilisateur.id
    });

    return res.status(201).json({
      message: 'Tâche créée avec succès',
      tache
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur lors de la création de la tâche'
    });
  }
};

// READ : récupérer les tâches de l'utilisateur connecté
exports.listerTaches = async (req, res) => {
  try {
    const taches = await Tache.findAll({
      where: {
        utilisateurId: req.utilisateur.id
      },
      order: [['id', 'DESC']]
    });

    return res.status(200).json(taches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur lors de la récupération des tâches'
    });
  }
};

// READ : récupérer une tâche précise
exports.obtenirTache = async (req, res) => {
  try {
    const tache = await Tache.findOne({
      where: {
        id: req.params.id,
        utilisateurId: req.utilisateur.id
      }
    });

    if (!tache) {
      return res.status(404).json({
        message: 'Tâche introuvable'
      });
    }

    return res.status(200).json(tache);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur lors de la récupération de la tâche'
    });
  }
};

// UPDATE : modifier une tâche
exports.modifierTache = async (req, res) => {
  try {
    const tache = await Tache.findOne({
      where: {
        id: req.params.id,
        utilisateurId: req.utilisateur.id
      }
    });

    if (!tache) {
      return res.status(404).json({
        message: 'Tâche introuvable'
      });
    }

    const { titre, description, terminee } = req.body;

    if (
      titre !== undefined &&
      (typeof titre !== 'string' || !titre.trim())
    ) {
      return res.status(400).json({
        message: 'Le titre doit être une chaîne non vide'
      });
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== 'string'
    ) {
      return res.status(400).json({
        message: 'La description doit être une chaîne de caractères'
      });
    }

    if (terminee !== undefined && typeof terminee !== 'boolean') {
      return res.status(400).json({
        message: 'terminee doit être un booléen'
      });
    }

    const modifications = {};

    if (titre !== undefined) modifications.titre = titre.trim();
    if (description !== undefined) modifications.description = description;
    if (terminee !== undefined) modifications.terminee = terminee;

    await tache.update(modifications);

    return res.status(200).json({
      message: 'Tâche modifiée avec succès',
      tache
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur lors de la modification de la tâche'
    });
  }
};

// DELETE : supprimer une tâche
exports.supprimerTache = async (req, res) => {
  try {
    const tache = await Tache.findOne({
      where: {
        id: req.params.id,
        utilisateurId: req.utilisateur.id
      }
    });

    if (!tache) {
      return res.status(404).json({
        message: 'Tâche introuvable'
      });
    }

    await tache.destroy();

    return res.status(200).json({
      message: 'Tâche supprimée avec succès'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur lors de la suppression de la tâche'
    });
  }
};
